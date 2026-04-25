from fastapi import FastAPI

from app.database import engine, Base
from app.routers.rsvp import router as rsvp_router
from app.routers.guests import router as guests_router

app = FastAPI()
Base.metadata.create_all(bind=engine)
app.include_router(rsvp_router)
app.include_router(guests_router)