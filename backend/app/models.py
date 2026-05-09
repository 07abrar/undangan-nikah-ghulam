import datetime
from enum import Enum
from sqlalchemy import Column, Enum as SQLEnum, Integer, String, DateTime

from app.database import Base

WIB = datetime.timezone(datetime.timedelta(hours=7))


class AttendingChoice(str, Enum):
    HADIR = "hadir"
    TIDAK_HADIR = "tidak_hadir"
    MUNGKIN = "mungkin"


class RSVP(Base):
    __tablename__ = "rsvps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    attending = Column(SQLEnum(AttendingChoice), nullable=True)
    message = Column(String, nullable=True)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.datetime.now(WIB)
    )


class Guest(Base):
    __tablename__ = "guests"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String(6), unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(
        DateTime, default=lambda: datetime.datetime.now(WIB), nullable=False
    )
