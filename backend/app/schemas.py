from datetime import datetime
from pydantic import BaseModel


from app.models import AttendingChoice

class WishRequest(BaseModel):
    name: str
    message: str

class WishResponse(WishRequest):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class RSVPRequest(BaseModel):
    name: str
    attending: AttendingChoice

class RSVPResponse(RSVPRequest):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
