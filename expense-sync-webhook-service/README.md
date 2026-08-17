# expense-sync-webhook-service

A real-time webhook integration: receive an "expense approved" event from
a travel/expense system, map it onto a downstream accounting system's
schema, and get it there reliably — even when the downstream system is
flaky or rejects the payload outright.

Built as the event-driven counterpart to
[`travel-expense-etl-pipeline`](../travel-expense-etl-pipeline) (which
covers the batch/reconciliation side): this project is the **real-time
sync** pattern a **Data Integration Engineer** needs alongside batch ETL —
webhooks, idempotency, retries, and dead-lettering.

## The problem it models

An expense system fires a webhook every time an expense is approved.
Something downstream (an ERP, a general ledger) needs that as a journal
entry. Three things go wrong in real integrations that this project
handles on purpose:

1. **The webhook gets redelivered.** The sender times out waiting for a
   200 and retries — without dedup, the same expense posts twice.
2. **The downstream system is briefly unavailable.** A 503 should be
   retried with backoff, not treated as a hard failure.
3. **The downstream system permanently rejects a payload** (e.g. a
   currency it doesn't support). Retrying that forever is pointless — it
   needs to be dead-lettered for a human (or a fixed-up replay) to handle.

## Architecture

```
POST /webhooks/expense-events
        │
        ▼
   validate (schema.js) ──400──▶ reject, nothing recorded
        │ valid
        ▼
   idempotency check ──already processed──▶ 200 duplicate_ignored
        │ new
        ▼
   transform (transformer.js: our schema → ERP schema, category → GL code)
        │
        ▼
   POST to ERP, with retry + exponential backoff (retry.js)
        │
   ┌────┴─────────────────┐
   ▼ success               ▼ failure
 mark processed        transient (exhausted retries) or permanent (4xx)
 200 synced                  ▼
                        dead-letter queue + 502 dead_lettered
```

- **`src/schema.js`** — validates the webhook contract (required fields, amount is a positive number). Currency support is deliberately *not* checked here — that's the ERP's business rule, not the webhook's.
- **`src/transformer.js` / `src/glCodeMap.js`** — maps event fields to the ERP's journal-entry shape: dollars → cents, category → GL code, our `event_id` → their `externalRef`.
- **`src/idempotencyStore.js`** — file-backed set of processed `event_id`s, so a redelivered webhook is a no-op.
- **`src/retry.js` / `src/errors.js`** — retries `TransientDownstreamError` with exponential backoff, never retries `PermanentDownstreamError`.
- **`src/deadLetterQueue.js`** — durable record of anything that couldn't be synced, with a reason and whether it was a retry-exhaustion or a permanent rejection.
- **`mock-erp/`** — a standalone server standing in for the real ERP: randomly returns `503` at a configurable `FLAKE_RATE` (transient), and always rejects currency `XXX` with `422` (permanent) — so both failure paths are exercised without needing a real ERP account.

## Running it

```bash
# terminal 1: the mock downstream ERP (30% chance of a transient 503)
FLAKE_RATE=0.3 npm run mock-erp

# terminal 2: the sync service, pointed at it
DOWNSTREAM_URL=http://localhost:4500 npm start

# terminal 3: send it a webhook
curl -X POST localhost:4000/webhooks/expense-events \
  -H 'content-type: application/json' \
  -d '{
    "event_id": "evt-001", "type": "expense.approved",
    "employee_id": "E100", "trip_id": "TRIP-01",
    "amount": 45.50, "currency": "USD",
    "category": "Ground Transport", "timestamp": "2026-07-03T10:00:00Z"
  }'

# check what happened
curl localhost:4000/sync/status
curl localhost:4000/sync/dead-letter
```

To replay a dead-lettered event (e.g. after fixing the downstream issue):

```bash
curl -X POST localhost:4000/sync/dead-letter/<id>/replay
```

## Tests

```bash
npm test
```

19 tests via Node's built-in test runner (no test framework dependency):
schema validation, GL-code mapping and cent rounding, the retry/backoff
decision logic (transient vs. permanent), idempotency persistence, and a
full end-to-end integration suite that spins up the sync service *and*
the mock ERP on ephemeral ports and drives real HTTP requests through the
whole synced / duplicate / dead-lettered / replay lifecycle.

## Talking points for the interview

- **Why idempotency is keyed on the sender's `event_id`, not our own
  hash of the payload** — the sender is the source of truth for "have I
  sent this before"; deriving our own key risks treating a legitimately
  edited-then-resent event as a duplicate.
- **Why transient vs. permanent is a property of the HTTP status code**,
  not a heuristic — 5xx means "try again," 4xx means "this exact request
  will never succeed," and that convention is what most real integration
  targets (Stripe, NetSuite, etc.) follow, so the client can trust it
  instead of guessing.
- **Why the dead-letter queue stores the *original* event, not the ERP
  payload** — replay has to go back through transform in case the mapping
  logic itself was the bug (e.g. a GL code gets added for a category that
  used to fall through to `default`).
- **What's a stub for a production version** — the idempotency store and
  DLQ are JSON files (real version: Redis/DynamoDB for the idempotency
  key, a real queue like SQS with a DLQ redrive policy); there's no auth
  on the webhook endpoint (real version: verify an HMAC signature header,
  the way Stripe/GitHub webhooks do); replay is manual via API call (real
  version: a scheduled job that retries transient dead-letters
  automatically and only surfaces permanent ones to a human).
