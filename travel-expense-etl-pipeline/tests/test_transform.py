import unittest

from src.transform import (
    UnknownCurrencyError,
    normalize_card_transaction,
    normalize_flight,
    normalize_hotel,
    to_usd,
)


class TestCurrencyConversion(unittest.TestCase):
    def test_usd_passthrough(self):
        self.assertEqual(to_usd(100, "USD"), 100.0)

    def test_inr_conversion(self):
        self.assertEqual(to_usd(4200, "INR"), 50.4)

    def test_unknown_currency_raises(self):
        with self.assertRaises(UnknownCurrencyError):
            to_usd(10, "XXX")


class TestNormalize(unittest.TestCase):
    def test_normalize_flight(self):
        record = {
            "booking_id": "FL-1", "trip_id": "TRIP-1", "employee_id": "E1",
            "airline": "IndiGo", "route": "DEL-BOM", "date": "2026-07-02",
            "fare": 4200.0, "currency": "INR", "status": "TICKETED",
        }
        result = normalize_flight(record)
        self.assertEqual(result["source"], "flight")
        self.assertEqual(result["category"], "Airfare")
        self.assertEqual(result["amount_usd"], 50.4)
        self.assertEqual(result["trip_id"], "TRIP-1")

    def test_normalize_hotel(self):
        record = {
            "id": "HT-1", "trip_id": "TRIP-1", "employee_id": "E1",
            "hotel_name": "Taj", "check_in": "2026-07-02", "check_out": "2026-07-04",
            "rate": "100", "currency": "USD",
        }
        result = normalize_hotel(record)
        self.assertEqual(result["category"], "Lodging")
        self.assertEqual(result["amount_usd"], 100.0)

    def test_normalize_card_transaction(self):
        record = {
            "transaction_id": "CT-1", "employee_id": "E1", "trip_id": "TRIP-1",
            "merchant": "UBER", "amount": "10", "currency": "USD",
            "txn_date": "2026-07-03", "category": "Ground Transport",
        }
        result = normalize_card_transaction(record)
        self.assertEqual(result["source"], "card")
        self.assertEqual(result["amount_usd"], 10.0)


if __name__ == "__main__":
    unittest.main()
