import assert from "node:assert/strict";
import { test } from "node:test";

import { toErpPayload } from "../src/transformer.js";

test("maps a known category to its GL code", () => {
  const erp = toErpPayload({
    event_id: "evt-1", employee_id: "E100", trip_id: "TRIP-01",
    category: "Airfare", amount: 42.5, currency: "USD", timestamp: "2026-07-02T00:00:00Z",
  });
  assert.equal(erp.glCode, "6010");
  assert.equal(erp.amountCents, 4250);
  assert.equal(erp.externalRef, "evt-1");
});

test("falls back to the default GL code for an unknown category", () => {
  const erp = toErpPayload({
    event_id: "evt-2", employee_id: "E100", trip_id: "TRIP-01",
    category: "Conference Fee", amount: 100, currency: "USD", timestamp: "2026-07-02T00:00:00Z",
  });
  assert.equal(erp.glCode, "6099");
});

test("rounds amount to whole cents", () => {
  const erp = toErpPayload({
    event_id: "evt-3", employee_id: "E100", trip_id: "TRIP-01",
    category: "Meals", amount: 12.345, currency: "USD", timestamp: "2026-07-02T00:00:00Z",
  });
  assert.equal(erp.amountCents, 1235);
});
