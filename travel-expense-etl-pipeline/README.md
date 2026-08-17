# travel-expense-etl-pipeline

A batch data-integration pipeline that pulls travel bookings and corporate
card spend from three systems that don't agree on a format, reconciles
them against each other, and lands one clean, queryable dataset.

Built to practice the exact shape of problem a **Data Integration Engineer**
on a travel & expense platform deals with day to day: normalize disparate
source schemas, enforce data quality before anything gets loaded, and
reconcile a booking system against a payments system so finance can trust
the numbers.

## The problem it models

A company's travel spend shows up in three unrelated systems:

| Source | Format | Example |
|---|---|---|
| Flight bookings (GDS export) | JSON | `data/flights.json` |
| Hotel bookings | XML | `data/hotels.xml` |
| Corporate card transactions | CSV | `data/card_transactions.csv` |

None of them share a schema, a currency, or a record ID scheme. This
pipeline turns all three into one `integrated_transactions` table, then
flags the mismatches that matter: a card charge with no booking behind it
(needs a receipt), and a booking with no card charge (unpaid, or paid
outside the corporate card).

## Architecture

```
flights.json ─┐
hotels.xml   ─┼─▶ extract ─▶ validate ─▶ transform ─▶ load (SQLite) ─▶ reconcile ─▶ flags
card_txns.csv─┘        │            │
                        │            └─ normalizes 3 schemas + FX to one schema
                        └─ bad rows are logged and dropped, never crash the run
```

- **`src/extract.py`** — one reader per source format (`json`, `xml.etree`, `csv`). Extraction calls are wrapped in a retry-with-exponential-backoff decorator (`src/pipeline.py::with_retry`) so a transient read failure doesn't take the whole run down.
- **`src/validate.py`** — a validation gate on the *raw* record: required fields present, amount numeric and positive, currency supported, date is ISO-8601. Invalid rows are collected as `ValidationError`s and excluded, not fatal.
- **`src/transform.py`** — maps each source's fields into one unified schema and normalizes every amount to USD off a fixed FX table.
- **`src/load.py`** — idempotent upsert into SQLite (`INSERT ... ON CONFLICT DO UPDATE`), keyed on `(source, record_id)` — re-running the pipeline on the same data is a no-op, not a duplicate.
- **`src/reconcile.py`** — groups the loaded rows by `trip_id` and matches card charges to bookings by category + amount (within a cent), flagging anything left over.

## Running it

```bash
python run_pipeline.py                       # uses data/ and writes warehouse.db
python run_pipeline.py --verbose              # see retry/validation logging
python run_pipeline.py --db-path /tmp/out.db  # write elsewhere
```

Sample output against the seeded `data/` fixtures:

```
Loaded 9 transactions into warehouse.db
Rejected 2 invalid source records
  - [card] CT-3004: missing required field 'amount'
  - [card] CT-3006: unsupported currency 'XXX'

Reconciliation flags: 3
  - [CARD_WITHOUT_BOOKING] trip TRIP-01 (card/CT-3003): Ground Transport charge of $5.40 has no matching booking
  - [BOOKING_WITHOUT_CHARGE] trip TRIP-02 (flight/FL-1002): Airfare booking of $380.00 has no matching card charge
  - [BOOKING_WITHOUT_CHARGE] trip TRIP-03 (hotel/HT-2002): Lodging booking of $156.60 has no matching card charge
```

(`CT-3004` and `CT-3006` are deliberately broken fixtures — a blank amount
and an unsupported currency — so the validation gate has something to
catch on a normal run, no `--verbose` needed.)

## Tests

```bash
python -m unittest discover tests -v
```

Covers: FX conversion, per-source normalization, the validation gate
(missing fields, bad amounts, unsupported currencies), reconciliation
matching in both directions, and the retry decorator (succeeds after N
transient failures, gives up after the retry budget, never retries a
non-transient error).

## Talking points for the interview

- **Why validate before transform, not after** — normalizing a malformed
  amount would either throw mid-batch or silently produce garbage. Gating
  on the raw record means one bad upstream row degrades gracefully instead
  of failing the batch.
- **Why upsert on `(source, record_id)`** — pipelines get re-run: on retry
  after a partial failure, on backfill, on schedule. Keying the load on the
  source's natural ID makes every run idempotent instead of appending
  duplicates.
- **Why reconciliation is a separate stage, not part of load** — load is
  "did the data land." Reconciliation is a business rule about two
  *independently correct* datasets disagreeing, and it needs the full
  picture of a trip in the warehouse before it can run, so it belongs
  after load, not fused into it.
- **What's still a stub for a real system** — the FX table is static
  (real version: pull from a rates API/table on a schedule); reconciliation
  match tolerance is a flat epsilon (real version: business-defined
  tolerance per category, maybe fuzzy merchant-name matching); retries are
  local sleep/backoff (real version: a queue with dead-lettering, same
  pattern as the companion webhook-sync project).
