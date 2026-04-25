"""
Seed guests from a CSV.

Usage:
    cd backend
    python scripts/seed_guests.py guests.csv

Input CSV (guests.csv):
    name
    Ghulam Abrar
    Yasmin Farhana

Output CSV (guests_with_links.csv):
    name,token,url
    Ghulam Abrar,a3f9k2,https://yasmin-ghulam.com/?to=a3f9k2
    Yasmin Farhana,b4g0l3,https://yasmin-ghulam.com/?to=b4g0l3
    ...
"""

import argparse
import csv
import secrets
import string
import sys
from pathlib import Path

from sqlalchemy.orm import Session

# Allow importing from the parent backend/ directory
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.database import SessionLocal
from app.models import Guest

BASE_URL = "http://localhost:5173"
TOKEN_LENGTH = 6
TOKEN_ALPHABET = string.ascii_lowercase + string.digits

MAX_TOKEN_ATTEMPTS = 10


class TokenCollisionError(Exception):
    """Raised when a unique token cannot be generated within the attempt budget."""


def generate_token(existing_tokens: set[str]) -> str:
    """Generate a token of length TOKEN_LENGTH not present in existing_tokens."""
    for _ in range(MAX_TOKEN_ATTEMPTS):
        token = "".join(secrets.choice(TOKEN_ALPHABET) for _ in range(TOKEN_LENGTH))
        if token not in existing_tokens:
            return token
    raise TokenCollisionError(
        f"Could not generate a unique token after {MAX_TOKEN_ATTEMPTS} attempts"
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Seed guests from a CSV file.")
    parser.add_argument(
        "input_csv",
        type=Path,
        help="Path to the input CSV file containing a 'name' column.",
    )
    return parser.parse_args()


def main(input_file: Path) -> None:
    output_file = input_file.with_name("guests_with_links.csv")

    db: Session = SessionLocal()
    output_rows: list[dict[str, str]] = []

    try:
        existing_guests: dict[str, Guest] = {g.name: g for g in db.query(Guest).all()}
        existing_tokens: set[str] = {g.token for g in existing_guests.values()}

        seen_names: set[str] = set()
        with input_file.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                name = row["name"].strip()
                if not name or name in seen_names:
                    continue
                seen_names.add(name)

                existing = existing_guests.get(name)
                if existing is not None:
                    token = existing.token
                else:
                    token = generate_token(existing_tokens)
                    existing_tokens.add(token)
                    db.add(Guest(token=token, name=name))

                output_rows.append({
                    "name": name,
                    "token": token,
                    "url": f"{BASE_URL}/?to={token}",
                })

        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

    with output_file.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["name", "token", "url"])
        writer.writeheader()
        writer.writerows(output_rows)

    print(f"Seeded {len(output_rows)} guests")
    print(f"Links written to: {output_file}")


if __name__ == "__main__":
    args = parse_args()
    main(args.input_csv)