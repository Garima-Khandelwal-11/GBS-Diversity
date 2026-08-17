import unittest

from src.validate import validate_record


class TestValidateCardRecord(unittest.TestCase):
    def test_valid_record_has_no_errors(self):
        record = {
            "transaction_id": "CT-1", "employee_id": "E1", "trip_id": "TRIP-1",
            "merchant": "UBER", "amount": "10", "currency": "USD",
            "txn_date": "2026-07-03", "category": "Ground Transport",
        }
        self.assertEqual(validate_record("card", record), [])

    def test_missing_amount_is_flagged(self):
        record = {
            "transaction_id": "CT-4", "employee_id": "E1", "trip_id": "TRIP-1",
            "merchant": "MARRIOTT", "amount": "", "currency": "USD",
            "txn_date": "2026-07-05", "category": "Lodging",
        }
        errors = validate_record("card", record)
        self.assertEqual(len(errors), 1)
        self.assertIn("missing required field 'amount'", errors[0].reason)

    def test_unsupported_currency_is_flagged(self):
        record = {
            "transaction_id": "CT-6", "employee_id": "E1", "trip_id": "TRIP-1",
            "merchant": "TAXI", "amount": "25", "currency": "XXX",
            "txn_date": "2026-07-08", "category": "Ground Transport",
        }
        errors = validate_record("card", record)
        self.assertTrue(any("unsupported currency" in e.reason for e in errors))

    def test_non_numeric_amount_is_flagged(self):
        record = {
            "transaction_id": "CT-7", "employee_id": "E1", "trip_id": "TRIP-1",
            "merchant": "TAXI", "amount": "abc", "currency": "USD",
            "txn_date": "2026-07-08", "category": "Ground Transport",
        }
        errors = validate_record("card", record)
        self.assertTrue(any("not numeric" in e.reason for e in errors))


if __name__ == "__main__":
    unittest.main()
