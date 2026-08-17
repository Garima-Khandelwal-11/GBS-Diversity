"""Source-system extractors.

Each source system speaks a different format, which is the norm when
integrating travel bookings (flight GDS export), hotel systems (XML feed),
and corporate card processors (CSV statement). Extractors only read and
parse -- they never interpret business meaning, that's transform.py's job.
"""
import csv
import json
import xml.etree.ElementTree as ET


def extract_flights(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def extract_hotels(path):
    tree = ET.parse(path)
    root = tree.getroot()
    bookings = []
    for booking in root.findall("booking"):
        bookings.append({child.tag: child.text for child in booking})
    return bookings


def extract_card_transactions(path):
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))
