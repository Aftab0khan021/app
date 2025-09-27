from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database = None

database = Database()

async def get_database():
    return database.database

async def connect_to_mongo():
    """Create database connection"""
    mongo_url = os.environ.get('MONGO_URL')
    database.client = AsyncIOMotorClient(mongo_url)
    database.database = database.client.portfolio_db
    print(f"Connected to MongoDB at {mongo_url}")

async def close_mongo_connection():
    """Close database connection"""
    if database.client:
        database.client.close()
        print("Disconnected from MongoDB")

# Collection helpers
async def get_collection(name: str):
    db = await get_database()
    return db[name]