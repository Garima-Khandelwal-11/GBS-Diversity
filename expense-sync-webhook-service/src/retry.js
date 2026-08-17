import { PermanentDownstreamError } from "./errors.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retries `fn` with exponential backoff, but never retries an error marked
// `.permanent` -- that's the whole point of distinguishing transient vs.
// permanent downstream failures. Returns { result, attempts }.
export async function withRetry(fn, { retries = 3, baseDelayMs = 200 } = {}) {
  let attempt = 0;
  while (true) {
    attempt += 1;
    try {
      const result = await fn();
      return { result, attempts: attempt };
    } catch (err) {
      if (err instanceof PermanentDownstreamError || err.permanent) {
        throw err;
      }
      if (attempt > retries) {
        throw err;
      }
      const delay = baseDelayMs * 2 ** (attempt - 1);
      await sleep(delay);
    }
  }
}
