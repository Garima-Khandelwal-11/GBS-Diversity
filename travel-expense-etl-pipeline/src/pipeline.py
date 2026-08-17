"""Orchestrates extract -> validate -> transform -> load -> reconcile.

Each source is treated as an unreliable upstream: extraction is wrapped in
a retry-with-backoff decorator so a transient read failure (a flaky API,
a partial file write) doesn't take down the whole run.
"""
import functools
import logging
import sqlite3
import time

from . import extract, load, reconcile, validate
from .transform import normalize_card_transaction, normalize_flight, normalize_hotel

logger = logging.getLogger("etl_pipeline")


class TransientExtractError(Exception):
    """Raised by a source read that should be retried."""


def with_retry(retries=3, base_delay_seconds=0.2):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            attempt = 0
            while True:
                try:
                    return fn(*args, **kwargs)
                except TransientExtractError as exc:
                    attempt += 1
                    if attempt > retries:
                        logger.error("giving up on %s after %d attempts: %s", fn.__name__, attempt, exc)
                        raise
                    delay = base_delay_seconds * (2 ** (attempt - 1))
                    logger.warning(
                        "%s failed (attempt %d/%d): %s -- retrying in %.2fs",
                        fn.__name__, attempt, retries, exc, delay,
                    )
                    time.sleep(delay)
        return wrapper
    return decorator


@with_retry()
def _extract_flights(path):
    return extract.extract_flights(path)


@with_retry()
def _extract_hotels(path):
    return extract.extract_hotels(path)


@with_retry()
def _extract_card_transactions(path):
    return extract.extract_card_transactions(path)


def _process_source(source, raw_records, normalize_fn):
    valid_raw, errors = validate.partition(source, raw_records)
    for err in errors:
        logger.warning("dropping invalid %s record %s: %s", err.source, err.record_id, err.reason)
    normalized = [normalize_fn(r) for r in valid_raw]
    return normalized, errors


def run_pipeline(flights_path, hotels_path, card_txns_path, db_path):
    flights_raw = _extract_flights(flights_path)
    hotels_raw = _extract_hotels(hotels_path)
    card_txns_raw = _extract_card_transactions(card_txns_path)

    flights, flight_errors = _process_source("flight", flights_raw, normalize_flight)
    hotels, hotel_errors = _process_source("hotel", hotels_raw, normalize_hotel)
    card_txns, card_errors = _process_source("card", card_txns_raw, normalize_card_transaction)

    all_records = flights + hotels + card_txns
    all_errors = flight_errors + hotel_errors + card_errors

    conn = sqlite3.connect(db_path)
    try:
        load.init_db(conn)
        load.upsert_transactions(conn, all_records)

        flags = reconcile.reconcile(conn)
        trip_ids = {r["trip_id"] for r in all_records}
        load.replace_reconciliation_flags(conn, trip_ids, flags)
    finally:
        conn.close()

    summary = {
        "records_loaded": len(all_records),
        "records_rejected": len(all_errors),
        "reconciliation_flags": len(flags),
        "errors": all_errors,
        "flags": flags,
    }
    logger.info(
        "pipeline run complete: %d loaded, %d rejected, %d reconciliation flags",
        summary["records_loaded"], summary["records_rejected"], summary["reconciliation_flags"],
    )
    return summary
