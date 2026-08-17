import http from "node:http";
import path from "node:path";

import { DeadLetterQueue } from "./deadLetterQueue.js";
import { IdempotencyStore } from "./idempotencyStore.js";
import { Router } from "./router.js";
import { SyncLog } from "./syncLog.js";
import { createWebhookHandler } from "./webhookHandler.js";

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(new Error(`invalid JSON body: ${err.message}`));
      }
    });
    req.on("error", reject);
  });
}

export function createApp({ dataDir = "data" } = {}) {
  const idempotencyStore = new IdempotencyStore(path.join(dataDir, "idempotency.json"));
  const deadLetterQueue = new DeadLetterQueue(path.join(dataDir, "dead-letter.json"));
  const syncLog = new SyncLog();
  const handleExpenseEvent = createWebhookHandler({ idempotencyStore, deadLetterQueue, syncLog });

  const router = new Router();

  router.post("/webhooks/expense-events", async (req, params, body) => {
    return handleExpenseEvent(body);
  });

  router.get("/sync/status", async () => {
    return { status: 200, body: syncLog.status() };
  });

  router.get("/sync/dead-letter", async () => {
    return { status: 200, body: { entries: deadLetterQueue.list() } };
  });

  router.post("/sync/dead-letter/:id/replay", async (req, params) => {
    const entries = deadLetterQueue.list();
    const entry = entries.find((e) => e.id === params.id);
    if (!entry) {
      return { status: 404, body: { error: "no such dead-letter entry" } };
    }
    deadLetterQueue.remove(params.id);
    const result = await handleExpenseEvent(entry.event);
    return { status: result.status, body: { replayed: params.id, result: result.body } };
  });

  async function handleRequest(req, res) {
    const url = new URL(req.url, "http://localhost");
    const match = router.match(req.method, url.pathname);

    if (!match) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "not found" }));
      return;
    }

    let body = {};
    if (req.method === "POST") {
      try {
        body = await readJsonBody(req);
      } catch (err) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
    }

    const result = await match.handler(req, match.params, body);
    res.writeHead(result.status, { "content-type": "application/json" });
    res.end(JSON.stringify(result.body));
  }

  const server = http.createServer((req, res) => {
    handleRequest(req, res).catch((err) => {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    });
  });

  return { server, idempotencyStore, deadLetterQueue, syncLog };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.PORT || 4000;
  const { server } = createApp({ dataDir: process.env.DATA_DIR || "data" });
  server.listen(port, () => {
    console.log(`expense-sync-webhook-service listening on :${port}`);
    console.log(`downstream ERP target: ${process.env.DOWNSTREAM_URL || "(not set)"}`);
  });
}
