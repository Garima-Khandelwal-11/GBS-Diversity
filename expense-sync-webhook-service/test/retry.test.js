import assert from "node:assert/strict";
import { test } from "node:test";

import { PermanentDownstreamError, TransientDownstreamError } from "../src/errors.js";
import { withRetry } from "../src/retry.js";

test("succeeds after transient failures within the retry budget", async () => {
  let calls = 0;
  const { result, attempts } = await withRetry(
    async () => {
      calls += 1;
      if (calls < 3) throw new TransientDownstreamError("temporary");
      return "ok";
    },
    { retries: 3, baseDelayMs: 1 }
  );
  assert.equal(result, "ok");
  assert.equal(attempts, 3);
});

test("gives up after exhausting the retry budget", async () => {
  let calls = 0;
  await assert.rejects(
    () =>
      withRetry(
        async () => {
          calls += 1;
          throw new TransientDownstreamError("still broken");
        },
        { retries: 2, baseDelayMs: 1 }
      ),
    TransientDownstreamError
  );
  assert.equal(calls, 3); // initial attempt + 2 retries
});

test("never retries a permanent error", async () => {
  let calls = 0;
  await assert.rejects(
    () =>
      withRetry(
        async () => {
          calls += 1;
          throw new PermanentDownstreamError("bad payload");
        },
        { retries: 3, baseDelayMs: 1 }
      ),
    PermanentDownstreamError
  );
  assert.equal(calls, 1);
});
