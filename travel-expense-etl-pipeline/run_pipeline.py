#!/usr/bin/env python3
"""CLI entrypoint: extract flight/hotel/card-transaction feeds, normalize
them into one schema, load into SQLite, and reconcile bookings vs charges.

    python run_pipeline.py
    python run_pipeline.py --data-dir data --db-path warehouse.db
"""
import argparse
import logging
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from src.pipeline import run_pipeline  # noqa: E402


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data-dir", default="data", help="directory containing the source feeds")
    parser.add_argument("--db-path", default="warehouse.db", help="path to the SQLite warehouse file")
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(asctime)s %(levelname)-7s %(name)s: %(message)s",
    )

    summary = run_pipeline(
        flights_path=os.path.join(args.data_dir, "flights.json"),
        hotels_path=os.path.join(args.data_dir, "hotels.xml"),
        card_txns_path=os.path.join(args.data_dir, "card_transactions.csv"),
        db_path=args.db_path,
    )

    print(f"\nLoaded {summary['records_loaded']} transactions into {args.db_path}")
    print(f"Rejected {summary['records_rejected']} invalid source records")
    if summary["errors"]:
        for err in summary["errors"]:
            print(f"  - [{err.source}] {err.record_id}: {err.reason}")

    print(f"\nReconciliation flags: {summary['reconciliation_flags']}")
    for flag in summary["flags"]:
        print(f"  - [{flag['issue_type']}] trip {flag['trip_id']} ({flag['source']}/{flag['record_id']}): {flag['detail']}")


if __name__ == "__main__":
    main()
