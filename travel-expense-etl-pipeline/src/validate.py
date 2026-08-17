"""Validation gate applied to raw source records before they're transformed.

Bad rows are never allowed to crash the pipeline -- they're collected as
ValidationError entries, logged, and excluded from the load step. This
mirrors how a production integration has to keep moving when one upstream
system sends a malformed record.
"""
import datetime

from .transform import FX_RATES_TO_USD

REQUIRED_FIELDS = {
    "flight": ["booking_id", "trip_id", "employee_id", "fare", "currency", "date"],
    "hotel": ["id", "trip_id", "employee_id", "rate", "currency", "check_in"],
    "card": ["transaction_id", "trip_id", "employee_id", "amount", "currency", "txn_date"],
}

AMOUNT_FIELD = {"flight": "fare", "hotel": "rate", "card": "amount"}
DATE_FIELD = {"flight": "date", "hotel": "check_in", "card": "txn_date"}


class ValidationError:
    def __init__(self, source, record_id, reason):
        self.source = source
        self.record_id = record_id
        self.reason = reason

    def __repr__(self):
        return f"ValidationError(source={self.source!r}, record_id={self.record_id!r}, reason={self.reason!r})"


def _record_id(source, record):
    if source == "flight":
        return record.get("booking_id")
    if source == "hotel":
        return record.get("id")
    return record.get("transaction_id")


def validate_record(source, record):
    """Returns a list of ValidationErrors (empty means the record is clean)."""
    errors = []
    record_id = _record_id(source, record) or "<unknown>"

    for field in REQUIRED_FIELDS[source]:
        if record.get(field) in (None, ""):
            errors.append(ValidationError(source, record_id, f"missing required field '{field}'"))

    if errors:
        # Amount/date/currency checks below assume the fields exist.
        return errors

    amount_raw = record[AMOUNT_FIELD[source]]
    try:
        amount = float(amount_raw)
        if amount <= 0:
            errors.append(ValidationError(source, record_id, f"amount must be positive, got {amount_raw}"))
    except (TypeError, ValueError):
        errors.append(ValidationError(source, record_id, f"amount is not numeric: {amount_raw!r}"))

    currency = record["currency"]
    if currency not in FX_RATES_TO_USD:
        errors.append(ValidationError(source, record_id, f"unsupported currency '{currency}'"))

    date_raw = record[DATE_FIELD[source]]
    try:
        datetime.date.fromisoformat(date_raw)
    except ValueError:
        errors.append(ValidationError(source, record_id, f"date is not ISO format: {date_raw!r}"))

    return errors


def partition(source, records):
    """Splits raw records into (valid, errors)."""
    valid, errors = [], []
    for record in records:
        record_errors = validate_record(source, record)
        if record_errors:
            errors.extend(record_errors)
        else:
            valid.append(record)
    return valid, errors
