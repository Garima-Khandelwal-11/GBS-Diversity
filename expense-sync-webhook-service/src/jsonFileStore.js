import fs from "node:fs";
import path from "node:path";

// Minimal durable list backed by a JSON file, shared by the idempotency
// store and the dead-letter queue. In-memory would lose everything on a
// restart -- which is exactly the class of bug a real integration can't
// afford (replaying a synced event because we forgot we'd already sent it).
export class JsonFileStore {
  constructor(filePath, initialValue) {
    this.filePath = filePath;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    if (!fs.existsSync(filePath)) {
      this._write(initialValue);
    }
  }

  _read() {
    return JSON.parse(fs.readFileSync(this.filePath, "utf8"));
  }

  _write(value) {
    fs.writeFileSync(this.filePath, JSON.stringify(value, null, 2));
  }

  read() {
    return this._read();
  }

  write(value) {
    this._write(value);
  }
}
