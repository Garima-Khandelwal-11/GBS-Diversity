// In-memory ring buffer of recent sync attempts, for the /sync/status
// dashboard endpoint. This is observational only (not durable) -- the
// dead-letter queue is the durable record of what needs attention.
const MAX_ENTRIES = 50;

export class SyncLog {
  constructor() {
    this.entries = [];
    this.counts = { synced: 0, duplicate_ignored: 0, dead_lettered: 0 };
  }

  record(entry) {
    this.entries.unshift({ at: new Date().toISOString(), ...entry });
    if (this.entries.length > MAX_ENTRIES) {
      this.entries.pop();
    }
    if (this.counts[entry.status] !== undefined) {
      this.counts[entry.status] += 1;
    }
  }

  status() {
    return { counts: { ...this.counts }, recent: this.entries.slice(0, 20) };
  }
}
