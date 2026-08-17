import { JsonFileStore } from "./jsonFileStore.js";

// Events that exhausted retries (transient) or were permanently rejected
// by the ERP land here instead of vanishing into a log line. Someone --
// a human, or a scheduled replay job -- needs to be able to look at this
// list and decide what to do with each one.
export class DeadLetterQueue {
  constructor(filePath) {
    this.store = new JsonFileStore(filePath, { entries: [] });
  }

  push(entry) {
    const data = this.store.read();
    data.entries.push({ id: `dlq-${Date.now()}-${data.entries.length}`, ...entry });
    this.store.write(data);
  }

  list() {
    return this.store.read().entries;
  }

  remove(id) {
    const data = this.store.read();
    data.entries = data.entries.filter((e) => e.id !== id);
    this.store.write(data);
  }
}
