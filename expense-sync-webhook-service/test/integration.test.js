import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";

import { createMockErpServer } from "../mock-erp/server.js";
import { createApp } from "../src/server.js";

let mockErp, app, baseUrl, dataDir;

before(async () => {
  dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "expense-sync-"));

  mockErp = createMockErpServer({ flakeRate: 0 }); // deterministic for the test
  await new Promise((resolve) => mockErp.server.listen(0, resolve));
  const erpPort = mockErp.server.address().port;
  process.env.DOWNSTREAM_URL = `http://127.0.0.1:${erpPort}`;

  app = createApp({ dataDir });
  await new Promise((resolve) => app.server.listen(0, resolve));
  const appPort = app.server.address().port;
  baseUrl = `http://127.0.0.1:${appPort}`;
});

after(async () => {
  await new Promise((resolve) => app.server.close(resolve));
  await new Promise((resolve) => mockErp.server.close(resolve));
});

function postEvent(body) {
  return fetch(`${baseUrl}/webhooks/expense-events`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("a valid event is synced to the ERP", async () => {
  const res = await postEvent({
    event_id: "evt-sync-1", type: "expense.approved", employee_id: "E100",
    trip_id: "TRIP-01", amount: 45.5, currency: "USD", category: "Ground Transport",
    timestamp: "2026-07-03T10:00:00Z",
  });
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.status, "synced");
  assert.ok(body.erp_ref.startsWith("JE-"));
  assert.equal(mockErp.received.length, 1);
});

test("redelivering the same event_id is a no-op", async () => {
  const first = await postEvent({
    event_id: "evt-sync-2", type: "expense.approved", employee_id: "E100",
    trip_id: "TRIP-01", amount: 10, currency: "USD", category: "Meals",
    timestamp: "2026-07-03T10:00:00Z",
  });
  await first.json();

  const receivedBefore = mockErp.received.length;

  const second = await postEvent({
    event_id: "evt-sync-2", type: "expense.approved", employee_id: "E100",
    trip_id: "TRIP-01", amount: 10, currency: "USD", category: "Meals",
    timestamp: "2026-07-03T10:00:00Z",
  });
  const body = await second.json();

  assert.equal(second.status, 200);
  assert.equal(body.status, "duplicate_ignored");
  assert.equal(mockErp.received.length, receivedBefore); // nothing new posted to the ERP
});

test("an ERP-rejected currency is dead-lettered, not retried forever", async () => {
  const res = await postEvent({
    event_id: "evt-sync-3", type: "expense.approved", employee_id: "E100",
    trip_id: "TRIP-01", amount: 25, currency: "XXX", category: "Ground Transport",
    timestamp: "2026-07-03T10:00:00Z",
  });
  const body = await res.json();
  assert.equal(res.status, 502);
  assert.equal(body.status, "dead_lettered");

  const dlqRes = await fetch(`${baseUrl}/sync/dead-letter`);
  const dlq = await dlqRes.json();
  const entry = dlq.entries.find((e) => e.event.event_id === "evt-sync-3");
  assert.ok(entry, "dead-lettered event should be listed");
  assert.ok(entry.permanent, "an ERP rejection should be marked permanent, not a retry timeout");
});

test("replaying a dead-letter entry after fixing the payload succeeds", async () => {
  await postEvent({
    event_id: "evt-sync-4", type: "expense.approved", employee_id: "E100",
    trip_id: "TRIP-01", amount: 25, currency: "XXX", category: "Ground Transport",
    timestamp: "2026-07-03T10:00:00Z",
  });

  const dlqRes = await fetch(`${baseUrl}/sync/dead-letter`);
  const dlq = await dlqRes.json();
  const entry = dlq.entries.find((e) => e.event.event_id === "evt-sync-4");

  // Replay: since the mock ERP still rejects "XXX", this exercises the
  // replay path landing back in the dead-letter queue as a *new* entry.
  const replayRes = await fetch(`${baseUrl}/sync/dead-letter/${entry.id}/replay`, { method: "POST" });
  const replayBody = await replayRes.json();
  assert.equal(replayRes.status, 502);

  const afterReplay = await (await fetch(`${baseUrl}/sync/dead-letter`)).json();
  assert.equal(afterReplay.entries.some((e) => e.id === entry.id), false, "old entry should be removed");
  assert.equal(
    afterReplay.entries.filter((e) => e.event.event_id === "evt-sync-4").length,
    1,
    "failed replay re-queues as a fresh entry"
  );
});

test("/sync/status reflects synced and dead-lettered counts", async () => {
  const status = await (await fetch(`${baseUrl}/sync/status`)).json();
  assert.ok(status.counts.synced >= 1);
  assert.ok(status.counts.dead_lettered >= 1);
  assert.ok(Array.isArray(status.recent));
});
