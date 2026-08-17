"""Cross-source reconciliation: does every card charge have a matching
booking, and does every booking have a matching charge?

This is the part of the pipeline that turns three independently-correct
datasets into one useful signal: which trips have a booking with no card
charge (possibly unpaid or booked outside the corporate card), and which
card charges have no booking behind them (need a receipt / manual review).
"""
from collections import defaultdict

AMOUNT_TOLERANCE_USD = 0.01


def _fetch_by_trip(conn):
    rows = conn.execute(
        "SELECT source, record_id, trip_id, category, amount_usd FROM integrated_transactions"
    ).fetchall()
    by_trip = defaultdict(list)
    for source, record_id, trip_id, category, amount_usd in rows:
        by_trip[trip_id].append(
            {"source": source, "record_id": record_id, "category": category, "amount_usd": amount_usd}
        )
    return by_trip


def reconcile(conn):
    by_trip = _fetch_by_trip(conn)
    flags = []

    for trip_id, records in by_trip.items():
        bookings = [r for r in records if r["source"] in ("flight", "hotel")]
        card_txns = [r for r in records if r["source"] == "card"]

        matched_booking_ids = set()
        matched_card_ids = set()

        for card in card_txns:
            match = next(
                (
                    b
                    for b in bookings
                    if b["record_id"] not in matched_booking_ids
                    and b["category"] == card["category"]
                    and abs(b["amount_usd"] - card["amount_usd"]) <= AMOUNT_TOLERANCE_USD
                ),
                None,
            )
            if match:
                matched_booking_ids.add(match["record_id"])
                matched_card_ids.add(card["record_id"])

        for card in card_txns:
            if card["record_id"] not in matched_card_ids:
                flags.append(
                    {
                        "trip_id": trip_id,
                        "issue_type": "CARD_WITHOUT_BOOKING",
                        "source": "card",
                        "record_id": card["record_id"],
                        "detail": f"{card['category']} charge of ${card['amount_usd']:.2f} has no matching booking",
                    }
                )

        for booking in bookings:
            if booking["record_id"] not in matched_booking_ids:
                flags.append(
                    {
                        "trip_id": trip_id,
                        "issue_type": "BOOKING_WITHOUT_CHARGE",
                        "source": booking["source"],
                        "record_id": booking["record_id"],
                        "detail": f"{booking['category']} booking of ${booking['amount_usd']:.2f} has no matching card charge",
                    }
                )

    return flags
