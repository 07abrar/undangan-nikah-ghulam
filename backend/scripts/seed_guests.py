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

import csv
import secrets
import string
import sys
from pathlib import Path

# Allow importing from the parent backend/ directory
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.database import SessionLocal
from app.models import Guest

BASE_URL = "http://localhost:5173"
TOKEN_LENGTH = 6
TOKEN_ALPHABET = string.ascii_lowercase + string.digits


def generate_token(db, max_attempts: int = 10) -> str:
    """Generate a unique 6-char token. Retries on the collision."""
    for _ in range(max_attempts):
        token = "".join(secrets.choice(TOKEN_ALPHABET) for _ in range(TOKEN_LENGTH))
        if not db.query(Guest).filter(Guest.token == token).first():
            return token
    raise RuntimeError("Could not generate a unique token after multiple attempts")


def main(input_path: str):
    input_file = Path(input_path)
    output_file = input_file.with_name("guests_with_links.csv")

    db = SessionLocal()
    rows_out = []

    try:
        with input_file.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                name = row["name"].strip()
                if not name:
                    continue

                token = generate_token(db)
                guest = Guest(token=token, name=name)
                db.add(guest)
                db.flush()  # token uniqueness is checked before next iteration

                rows_out.append({
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
        writer.writerows(rows_out)

    print(f"Seeded {len(rows_out)} guests")
    print(f"Links written to: {output_file}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scripts/seed_guests.py <input.csv>")
        sys.exit(1)
    main(sys.argv[1])