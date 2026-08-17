import { glCodeFor } from "./glCodeMap.js";

// Maps an inbound expense event onto the ERP's journal-entry shape. This
// is the field-mapping layer every integration needs once you have two
// systems that model the same fact differently (dollars vs. cents,
// category vs. GL code, our event_id vs. their externalRef).
export function toErpPayload(event) {
  return {
    externalRef: event.event_id,
    employeeRef: event.employee_id,
    tripRef: event.trip_id,
    glCode: glCodeFor(event.category),
    amountCents: Math.round(event.amount * 100),
    currency: event.currency,
    memo: `${event.category} - trip ${event.trip_id}`,
    postedAt: event.timestamp,
  };
}
