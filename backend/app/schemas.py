from datetime import datetime
from pydantic import BaseModel


from app.models import AttendingChoice

class RSVPRequest(BaseModel):
    name: str
    attending: AttendingChoice | None = None
    message: str | None = None

class RSVPResponse(RSVPRequest):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
