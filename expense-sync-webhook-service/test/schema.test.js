import assert from "node:assert/strict";
import { test } from "node:test";

import { validateExpenseEvent } from "../src/schema.js";

const validEvent = {
  event_id: "evt-1",
  type: "expense.approved",
  employee_id: "E100",
  trip_id: "TRIP-01",
  amount: 45.5,
  currency: "USD",
  category: "Ground Transport",
  timestamp: "2026-07-03T10:00:00Z",
};

test("accepts a well-formed event", () => {
  const result = validateExpenseEvent(validEvent);
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("rejects a missing required field", () => {
  const { event_id, ...withoutEventId } = validEvent;
  const result = validateExpenseEvent(withoutEventId);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes("event_id")));
});

test("rejects a non-numeric amount", () => {
  const result = validateExpenseEvent({ ...validEvent, amount: "forty-five" });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes("amount")));
});

test("rejects a zero or negative amount", () => {
  const result = validateExpenseEvent({ ...validEvent, amount: 0 });
  assert.equal(result.valid, false);
});

test("does not reject an unsupported currency (that's a downstream concern)", () => {
  const result = validateExpenseEvent({ ...validEvent, currency: "XXX" });
  assert.equal(result.valid, true);
});
