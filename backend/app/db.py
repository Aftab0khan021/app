# app/db.py
import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGODB_URI = os.getenv(mongodb+srv://Vercel-Admin-ai-resume-checker:Aft@bkhan0786@ai-resume-checker.i5iftpv.mongodb.net/?retryWrites=true&w=majority&appName=ai-resume-checker)
DB_NAME = os.getenv("MONGODB_DB", "ai_resume_checker")

_client = None
_db = None

def get_client():
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(
            MONGODB_URI,
            serverSelectionTimeoutMS=5000,
            maxPoolSize=10,
            tls=True,  # SRV uses TLS
        )
    return _client

def get_db():
    global _db
    if _db is None:
        _db = get_client()[DB_NAME]
    return _db
