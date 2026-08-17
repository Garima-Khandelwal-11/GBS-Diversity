import { PermanentDownstreamError, TransientDownstreamError } from "./errors.js";

// Talks to the downstream ERP's journal-entry endpoint. 5xx is treated as
// transient (worth retrying) and 4xx as permanent (the payload itself is
// bad, retrying won't help) -- the same status-code convention most real
// integration targets use.
export async function postToErp(payload, { baseUrl = process.env.DOWNSTREAM_URL } = {}) {
  if (!baseUrl) {
    throw new Error("DOWNSTREAM_URL is not configured");
  }

  let response;
  try {
    response = await fetch(`${baseUrl}/erp/journal-entries`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (networkErr) {
    throw new TransientDownstreamError(`network error calling ERP: ${networkErr.message}`);
  }

  if (response.status >= 500) {
    throw new TransientDownstreamError(`ERP returned ${response.status}`);
  }

  if (response.status >= 400) {
    const body = await response.json().catch(() => ({}));
    throw new PermanentDownstreamError(body.error || `ERP rejected payload with ${response.status}`);
  }

  return response.json();
}
