from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Wish
from app.schemas import WishRequest, WishResponse

router = APIRouter(prefix="/api/wishes", tags=["wishes"])

@router.post("/", response_model=WishResponse)
def create_wish(wish: WishRequest, db: Session = Depends(get_db)):
    db_wish = Wish(name=wish.name, message=wish.message)
    db.add(db_wish)
    db.commit()
    db.refresh(db_wish)
    return db_wish

@router.get("/", response_model=list[WishResponse])
def read_wishes(db: Session = Depends(get_db)):
    return db.query(Wish).all()