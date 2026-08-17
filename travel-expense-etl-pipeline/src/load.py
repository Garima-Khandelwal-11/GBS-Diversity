"""Loads normalized records and reconciliation flags into a SQLite warehouse."""
import datetime
import sqlite3

SCHEMA = """
CREATE TABLE IF NOT EXISTS integrated_transactions (
    source TEXT NOT NULL,
    record_id TEXT NOT NULL,
    trip_id TEXT NOT NULL,
    employee_id TEXT NOT NULL,
    description TEXT,
    category TEXT,
    amount_original REAL,
    currency_original TEXT,
    amount_usd REAL,
    txn_date TEXT,
    loaded_at TEXT NOT NULL,
    PRIMARY KEY (source, record_id)
);

CREATE TABLE IF NOT EXISTS reconciliation_flags (
    trip_id TEXT NOT NULL,
    issue_type TEXT NOT NULL,
    source TEXT NOT NULL,
    record_id TEXT NOT NULL,
    detail TEXT,
    flagged_at TEXT NOT NULL
);
"""


def init_db(conn):
    conn.executescript(SCHEMA)
    conn.commit()


def upsert_transactions(conn, records):
    now = datetime.datetime.utcnow().isoformat()
    conn.executemany(
        """
        INSERT INTO integrated_transactions
            (source, record_id, trip_id, employee_id, description, category,
             amount_original, currency_original, amount_usd, txn_date, loaded_at)
        VALUES (:source, :record_id, :trip_id, :employee_id, :description, :category,
                :amount_original, :currency_original, :amount_usd, :txn_date, :loaded_at)
        ON CONFLICT(source, record_id) DO UPDATE SET
            amount_usd = excluded.amount_usd,
            loaded_at = excluded.loaded_at
        """,
        [{**r, "loaded_at": now} for r in records],
    )
    conn.commit()


def replace_reconciliation_flags(conn, trip_ids, flags):
    now = datetime.datetime.utcnow().isoformat()
    if trip_ids:
        conn.executemany(
            "DELETE FROM reconciliation_flags WHERE trip_id = ?",
            [(t,) for t in trip_ids],
        )
    conn.executemany(
        """
        INSERT INTO reconciliation_flags (trip_id, issue_type, source, record_id, detail, flagged_at)
        VALUES (:trip_id, :issue_type, :source, :record_id, :detail, :flagged_at)
        """,
        [{**f, "flagged_at": now} for f in flags],
    )
    conn.commit()
