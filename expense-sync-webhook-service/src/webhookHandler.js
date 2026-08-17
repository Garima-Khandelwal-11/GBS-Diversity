import { postToErp } from "./downstreamClient.js";
import { withRetry } from "./retry.js";
import { toErpPayload } from "./transformer.js";
import { validateExpenseEvent } from "./schema.js";

// Orchestrates one inbound event: validate -> dedupe -> transform -> sync,
// with retry-then-dead-letter on failure. Pure function of its
// dependencies so it's easy to unit-test without spinning up HTTP servers.
export function createWebhookHandler({ idempotencyStore, deadLetterQueue, syncLog }) {
  return async function handleExpenseEvent(rawBody) {
    const { valid, errors, data } = validateExpenseEvent(rawBody);
    if (!valid) {
      return { status: 400, body: { error: "validation_failed", errors } };
    }

    if (idempotencyStore.isProcessed(data.event_id)) {
      syncLog.record({ event_id: data.event_id, status: "duplicate_ignored" });
      return { status: 200, body: { status: "duplicate_ignored", event_id: data.event_id } };
    }

    const erpPayload = toErpPayload(data);

    try {
      const { result, attempts } = await withRetry(() => postToErp(erpPayload));
      idempotencyStore.markProcessed(data.event_id);
      syncLog.record({ event_id: data.event_id, status: "synced", attempts });
      return { status: 200, body: { status: "synced", erp_ref: result.erpRef, attempts } };
    } catch (err) {
      const reason = err.permanent ? `rejected by ERP: ${err.message}` : `retries exhausted: ${err.message}`;
      deadLetterQueue.push({ event: data, erpPayload, reason, permanent: Boolean(err.permanent) });
      syncLog.record({ event_id: data.event_id, status: "dead_lettered", reason });
      return { status: 502, body: { status: "dead_lettered", reason } };
    }
  };
}
