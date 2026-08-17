"""Normalizes three source schemas into one unified transaction schema.

Unified record:
    source, record_id, trip_id, employee_id, description,
    category, amount_original, currency_original, amount_usd, txn_date
"""

# Fixed demo FX table (USD base). A real pipeline would pull this from a
# rates API/table refreshed daily -- kept static here so transforms and
# reconciliation are deterministic and easy to unit test.
FX_RATES_TO_USD = {
    "USD": 1.0,
    "INR": 0.012,
    "EUR": 1.08,
}


class UnknownCurrencyError(ValueError):
    pass


def to_usd(amount, currency):
    if currency not in FX_RATES_TO_USD:
        raise UnknownCurrencyError(f"no FX rate for currency {currency!r}")
    return round(float(amount) * FX_RATES_TO_USD[currency], 2)


def normalize_flight(record):
    amount = record["fare"]
    currency = record["currency"]
    return {
        "source": "flight",
        "record_id": record["booking_id"],
        "trip_id": record["trip_id"],
        "employee_id": record["employee_id"],
        "description": f"{record['airline']} {record['route']}",
        "category": "Airfare",
        "amount_original": amount,
        "currency_original": currency,
        "amount_usd": to_usd(amount, currency),
        "txn_date": record["date"],
    }


def normalize_hotel(record):
    amount = record["rate"]
    currency = record["currency"]
    return {
        "source": "hotel",
        "record_id": record["id"],
        "trip_id": record["trip_id"],
        "employee_id": record["employee_id"],
        "description": record["hotel_name"],
        "category": "Lodging",
        "amount_original": amount,
        "currency_original": currency,
        "amount_usd": to_usd(amount, currency),
        "txn_date": record["check_in"],
    }


def normalize_card_transaction(record):
    amount = record["amount"]
    currency = record["currency"]
    return {
        "source": "card",
        "record_id": record["transaction_id"],
        "trip_id": record["trip_id"],
        "employee_id": record["employee_id"],
        "description": record["merchant"],
        "category": record["category"],
        "amount_original": amount,
        "currency_original": currency,
        "amount_usd": to_usd(amount, currency),
        "txn_date": record["txn_date"],
    }
