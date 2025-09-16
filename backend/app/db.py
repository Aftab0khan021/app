# app/db.py
import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv("MONGO_URL")  # keep naming consistent
DB_NAME = os.getenv("DB_NAME", "ai_resume_checker")

_client = None
_db = None

def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        if not MONGO_URL:
            raise RuntimeError("MONGO_URL environment variable is not set")
        _client = AsyncIOMotorClient(
            MONGO_URL,
            serverSelectionTimeoutMS=5000,
            maxPoolSize=10,
            tls=True,  # works for Atlas SRV strings; if you use local Mongo, set tls=False
        )
    return _client

def get_db():
    global _db
    if _db is None:
        _db = get_client()[DB_NAME]
    return _db
