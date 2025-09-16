# app/db.py
import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGODB_URI = os.getenv("MONGO_URL")
DB_NAME = os.getenv("MONGODB_DB", "ai_resume_checker")

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
            tls=True,
        )
    return _client

def get_db():
    global _db
    if _db is None:
        _db = get_client()[DB_NAME]
    return _db
