# Data Integration Engineer — Application Portfolio

Prepared for a Navan application (referred by a team member on Navan's travel management system group).

## Positioning

I build the layer where systems actually talk to each other — REST APIs, webhooks, and the data pipelines that keep them in sync. Both projects below were built specifically for this application: one models the batch/reconciliation side of travel & expense data, the other the real-time webhook-sync side — the two patterns a Data Integration Engineer on a travel & expense platform works in day to day.

## Skills

**Integration & APIs**
REST API design, webhooks, idempotency, retry/backoff strategy, third-party API integration, request/response validation, error handling

**Data Pipelines**
ETL (extract/validate/transform/load), schema mapping across systems, currency/unit normalization, data reconciliation, dead-letter handling, batch & real-time processing

**Backend & Data Stores**
Python, Node.js, SQLite/SQL, file-backed and in-memory data stores, service-oriented architecture (decoupled microservices)

**Languages**
Python, JavaScript (ES6+), SQL, JSON, XML

**Tooling & Practice**
Git/GitHub, automated testing (unittest, Node test runner), CLI tooling, environment-based config, technical documentation

**Collaboration**
Translating business rules into validation/reconciliation logic, hackathon delivery, cross-functional teamwork

## Projects

### Travel & Expense Data Integration Pipeline
*Personal project, built for this application · Python*

A batch pipeline that ingests flight bookings (JSON), hotel bookings (XML), and corporate card transactions (CSV) — three systems that never agree on a schema — normalizes them into one warehouse table, and reconciles bookings against card charges to flag what doesn't match.

- Built source-specific extractors for JSON, XML (`xml.etree`), and CSV, each wrapped in a retry-with-exponential-backoff decorator so a transient read failure doesn't kill the run.
- Designed a validation gate that checks required fields, numeric/positive amounts, known currencies, and ISO dates on the *raw* record — bad rows are logged and dropped, never crash the batch.
- Normalized all three schemas into one unified transaction record with currency conversion to USD, then loaded it into SQLite with an idempotent upsert (`INSERT ... ON CONFLICT`) keyed on `(source, record_id)` — safe to re-run.
- Wrote a reconciliation stage that matches card charges to bookings by trip, category, and amount, flagging `CARD_WITHOUT_BOOKING` and `BOOKING_WITHOUT_CHARGE` in both directions.
- 17 unit tests (stdlib `unittest`, zero dependencies) covering currency conversion, per-source normalization, the validation gate, reconciliation matching, and the retry decorator.

**Stack:** Python (stdlib only — `json`, `csv`, `xml.etree`, `sqlite3`) · **Repo:** [`travel-expense-etl-pipeline/`](https://github.com/Garima-Khandelwal-11/GBS-Diversity/tree/claude/navan-labs-portfolio-gkw2fn/travel-expense-etl-pipeline)

### Expense-to-ERP Webhook Sync Service
*Personal project, built for this application · Node.js*

A real-time integration service: receives an "expense approved" webhook, maps it onto a downstream ERP's journal-entry schema, and gets it there reliably even when the ERP is flaky or rejects the payload outright.

- Built a schema-validation layer for the inbound webhook contract, deliberately separate from downstream business rules (an unsupported currency is a *valid* event that the ERP rejects, not a malformed request).
- Implemented a field-mapping/transform layer (amount → cents, category → GL code via a lookup table) matching how travel/expense categories map to accounting codes.
- Wrote retry-with-exponential-backoff that distinguishes transient failures (5xx, worth retrying) from permanent ones (4xx, straight to dead-letter) — the same convention most real integration targets use.
- Built a file-backed idempotency store so a redelivered webhook (the sender times out and retries) never double-posts, plus a dead-letter queue with a replay endpoint for anything that couldn't be synced.
- Shipped a mock ERP server that randomly returns `503`s at a configurable rate and always rejects one currency with `422`, so both failure paths are exercised without a real ERP account.
- 19 tests via Node's built-in test runner, including a full end-to-end suite that spins up the sync service and the mock ERP on ephemeral ports and drives real HTTP requests through synced / duplicate / dead-lettered / replay.

**Stack:** Node.js (core `http`, no framework), built-in `node:test` · **Repo:** [`expense-sync-webhook-service/`](https://github.com/Garima-Khandelwal-11/GBS-Diversity/tree/claude/navan-labs-portfolio-gkw2fn/expense-sync-webhook-service)

---

*Both projects are runnable locally with zero external dependencies — see each project's README for exact commands, sample output, and a "talking points for the interview" section covering the design decisions behind them.*
