import datetime
from enum import Enum
from sqlalchemy import Column, Enum as SQLEnum, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base

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
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Guest(Base):
    __tablename__ = "guests"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String(6), unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc), nullable=False)