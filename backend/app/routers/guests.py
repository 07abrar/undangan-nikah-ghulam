from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Guest
from app.schemas import GuestResponse

router = APIRouter(prefix="/api/guests", tags=["guests"])


@router.get("/{token}", response_model=GuestResponse)
def get_guest(token: str, db: Session = Depends(get_db)):
    guest = db.query(Guest).filter(Guest.token == token).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")
    return guest