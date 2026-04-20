from enum import Enum
from sqlalchemy import Column, Enum as SQLEnum, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base

class AttendingChoice(str, Enum):
    HADIR = "hadir"
    TIDAK_HADIR = "tidak_hadir"
    MUNGKIN = "mungkin"

class Wish(Base):
    __tablename__ = "wishes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RSVP(Base):
    __tablename__ = "rsvps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    attending = Column(SQLEnum(AttendingChoice), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())