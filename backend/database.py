from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
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
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'portfolio')
    
    # FIX: Added server_api=ServerApi('1') to ensure connection works on Render
    try:
        database.client = AsyncIOMotorClient(mongo_url, server_api=ServerApi('1'))
        database.database = database.client[db_name]
        
        # Verify connection immediately
        await database.client.admin.command('ping')
        print(f"Connected to MongoDB at {mongo_url}, DB: {db_name}")
    except Exception as e:
        print(f"MongoDB Connection Failed: {e}")
        raise e

async def close_mongo_connection():
    """Close database connection"""
    if database.client:
        database.client.close()
        print("Disconnected from MongoDB")

# Collection helpers
async def get_collection(name: str):
    db = await get_database()
    return db[name]