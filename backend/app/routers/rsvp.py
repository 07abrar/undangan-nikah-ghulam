from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import RSVP
from app.schemas import RSVPRequest, RSVPResponse

router = APIRouter(prefix="/api/rsvp", tags=["rsvp"])

@router.post("/", response_model=RSVPResponse)
def create_rsvp(rsvp: RSVPRequest, db: Session = Depends(get_db)):
    db_rsvp = RSVP(name=rsvp.name, attending=rsvp.attending)
    db.add(db_rsvp)
    db.commit()
    db.refresh(db_rsvp)
    return db_rsvp

@router.get("/", response_model=list[RSVPResponse])
def read_rsvps(db: Session = Depends(get_db)):
    return db.query(RSVP).all()