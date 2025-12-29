from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from typing import Optional
import os
from pathlib import Path
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database = None

database = Database()

async def get_database():
    return database.database

async def get_collection(name: str):
    db = await get_database()
    return db[name]

async def connect_to_mongo():
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'portfolio')
    
    try:
        # FIX: Added server_api=ServerApi('1') which is required for stable connections to modern Atlas clusters
        database.client = AsyncIOMotorClient(mongo_url, server_api=ServerApi('1'))
        database.database = database.client[db_name]
        
        # FIX: Verify the connection immediately with a ping
        # This ensures we catch auth errors here, rather than later in the seeder
        await database.client.admin.command('ping')
        logger.info(f"Successfully connected to MongoDB. Database: {db_name}")
        
    except Exception as e:
        logger.error(f"MongoDB Connection Error: {str(e)}")
        # If this fails with 'bad auth', it means the MONGO_URL in Render is incorrect.
        # Please double-check your password in the Render Dashboard Environment Variables.
        raise e

async def close_mongo_connection():
    """Close database connection"""
    if database.client:
        database.client.close()
        logger.info("Disconnected from MongoDB")