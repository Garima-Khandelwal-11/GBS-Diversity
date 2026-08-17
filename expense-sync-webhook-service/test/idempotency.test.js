import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { IdempotencyStore } from "../src/idempotencyStore.js";

function tmpFile() {
  return path.join(fs.mkdtempSync(path.join(os.tmpdir(), "idem-")), "idempotency.json");
}

test("an event is not processed until marked", () => {
  const store = new IdempotencyStore(tmpFile());
  assert.equal(store.isProcessed("evt-1"), false);
  store.markProcessed("evt-1");
  assert.equal(store.isProcessed("evt-1"), true);
});

test("persists across store instances backed by the same file", () => {
  const file = tmpFile();
  new IdempotencyStore(file).markProcessed("evt-2");
  const reopened = new IdempotencyStore(file);
  assert.equal(reopened.isProcessed("evt-2"), true);
});

test("marking the same event twice does not duplicate entries", () => {
  const file = tmpFile();
  const store = new IdempotencyStore(file);
  store.markProcessed("evt-3");
  store.markProcessed("evt-3");
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  assert.equal(raw.processed.filter((id) => id === "evt-3").length, 1);
});
