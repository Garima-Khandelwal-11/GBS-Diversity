import { JsonFileStore } from "./jsonFileStore.js";

// Tracks which event_ids have already been synced downstream. Webhooks get
// redelivered (the sender times out waiting for our 200 and retries) --
// without this, a redelivered "expense approved" event would post to the
// ERP twice.
export class IdempotencyStore {
  constructor(filePath) {
    this.store = new JsonFileStore(filePath, { processed: [] });
  }

  isProcessed(eventId) {
    return this.store.read().processed.includes(eventId);
  }

  markProcessed(eventId) {
    const data = this.store.read();
    if (!data.processed.includes(eventId)) {
      data.processed.push(eventId);
      this.store.write(data);
    }
  }
}
