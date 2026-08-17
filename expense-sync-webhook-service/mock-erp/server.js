import http from "node:http";
import crypto from "node:crypto";

// Stands in for a real accounting/ERP system so the sync service has
// something to integrate with. Two failure modes are simulated on purpose,
// because they need genuinely different handling on the caller's side:
//
//   - FLAKE_RATE fraction of requests get a 503 ("temporarily unavailable")
//     -> transient, worth retrying.
//   - a payload with currency "XXX" gets a 422 ("unsupported currency")
//     -> permanent, retrying would never help.
const FLAKE_RATE = Number(process.env.FLAKE_RATE ?? 0.4);
const UNSUPPORTED_CURRENCIES = new Set(["XXX"]);

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

export function createMockErpServer({ flakeRate = FLAKE_RATE } = {}) {
  const received = [];

  const server = http.createServer(async (req, res) => {
    if (req.method !== "POST" || req.url !== "/erp/journal-entries") {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "not found" }));
      return;
    }

    let payload;
    try {
      payload = await readJsonBody(req);
    } catch {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "invalid JSON" }));
      return;
    }

    if (UNSUPPORTED_CURRENCIES.has(payload.currency)) {
      res.writeHead(422, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: `currency '${payload.currency}' is not supported by this ledger` }));
      return;
    }

    if (Math.random() < flakeRate) {
      res.writeHead(503, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "ERP temporarily unavailable" }));
      return;
    }

    const erpRef = `JE-${crypto.randomUUID().slice(0, 8)}`;
    received.push({ erpRef, payload, receivedAt: new Date().toISOString() });
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ erpRef, status: "posted" }));
  });

  return { server, received };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.MOCK_ERP_PORT || 4500;
  const { server } = createMockErpServer({});
  server.listen(port, () => {
    console.log(`mock ERP listening on :${port} (FLAKE_RATE=${FLAKE_RATE})`);
  });
}
