// Validates an inbound expense-event webhook payload before it's trusted
// anywhere downstream. Keeps validation declarative so new required fields
// are a one-line change, not a rewrite of the handler.

const REQUIRED_FIELDS = [
  "event_id",
  "type",
  "employee_id",
  "trip_id",
  "amount",
  "currency",
  "category",
  "timestamp",
];

// Currency support is a downstream (ERP) business rule, not a webhook
// contract rule -- an unsupported currency is a *valid* event that the
// ERP will permanently reject. See mock-erp/server.js and downstreamClient.js.
export function validateExpenseEvent(payload) {
  const errors = [];

  if (payload === null || typeof payload !== "object") {
    return { valid: false, errors: ["payload must be a JSON object"], data: null };
  }

  for (const field of REQUIRED_FIELDS) {
    if (payload[field] === undefined || payload[field] === null || payload[field] === "") {
      errors.push(`missing required field '${field}'`);
    }
  }

  if (payload.amount !== undefined && (typeof payload.amount !== "number" || payload.amount <= 0)) {
    errors.push(`'amount' must be a positive number, got ${JSON.stringify(payload.amount)}`);
  }

  if (errors.length > 0) {
    return { valid: false, errors, data: null };
  }

  return { valid: true, errors: [], data: payload };
}
