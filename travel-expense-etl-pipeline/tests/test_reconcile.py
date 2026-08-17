import sqlite3
import unittest

from src.load import init_db, upsert_transactions
from src.reconcile import reconcile


def _record(source, record_id, trip_id, category, amount_usd):
    return {
        "source": source, "record_id": record_id, "trip_id": trip_id,
        "employee_id": "E1", "description": "test", "category": category,
        "amount_original": amount_usd, "currency_original": "USD",
        "amount_usd": amount_usd, "txn_date": "2026-07-01",
    }


class TestReconcile(unittest.TestCase):
    def setUp(self):
        self.conn = sqlite3.connect(":memory:")
        init_db(self.conn)

    def test_matched_booking_and_charge_produce_no_flags(self):
        upsert_transactions(self.conn, [
            _record("flight", "FL-1", "TRIP-1", "Airfare", 100.0),
            _record("card", "CT-1", "TRIP-1", "Airfare", 100.0),
        ])
        flags = reconcile(self.conn)
        self.assertEqual(flags, [])

    def test_card_charge_without_booking_is_flagged(self):
        upsert_transactions(self.conn, [
            _record("card", "CT-1", "TRIP-1", "Ground Transport", 15.0),
        ])
        flags = reconcile(self.conn)
        self.assertEqual(len(flags), 1)
        self.assertEqual(flags[0]["issue_type"], "CARD_WITHOUT_BOOKING")

    def test_booking_without_charge_is_flagged(self):
        upsert_transactions(self.conn, [
            _record("hotel", "HT-1", "TRIP-1", "Lodging", 200.0),
        ])
        flags = reconcile(self.conn)
        self.assertEqual(len(flags), 1)
        self.assertEqual(flags[0]["issue_type"], "BOOKING_WITHOUT_CHARGE")

    def test_amount_mismatch_beyond_tolerance_is_flagged_both_ways(self):
        upsert_transactions(self.conn, [
            _record("flight", "FL-1", "TRIP-1", "Airfare", 100.0),
            _record("card", "CT-1", "TRIP-1", "Airfare", 250.0),
        ])
        flags = reconcile(self.conn)
        issue_types = {f["issue_type"] for f in flags}
        self.assertEqual(issue_types, {"CARD_WITHOUT_BOOKING", "BOOKING_WITHOUT_CHARGE"})


if __name__ == "__main__":
    unittest.main()
