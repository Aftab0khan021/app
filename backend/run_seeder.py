import asyncio
from services.data_seeder import seed_database
from database import connect_to_mongo, close_mongo_connection

async def main():
    print("🌱 Starting database seeding...")
    await connect_to_mongo()
    await seed_database()
    await close_mongo_connection()
    print("✅ Database seeding completed!")

if __name__ == "__main__":
    asyncio.run(main())