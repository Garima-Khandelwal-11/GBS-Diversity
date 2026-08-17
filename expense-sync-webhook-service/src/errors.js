// A transient failure (the ERP is briefly unavailable) is worth retrying.
// A permanent failure (the ERP rejected the payload itself) never will
// succeed on retry, so it should go straight to the dead-letter queue.
export class TransientDownstreamError extends Error {
  constructor(message) {
    super(message);
    this.name = "TransientDownstreamError";
  }
}

export class PermanentDownstreamError extends Error {
  constructor(message) {
    super(message);
    this.name = "PermanentDownstreamError";
    this.permanent = true;
  }
}
