from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import connect_to_mongo, close_mongo_connection
from routes.public import router as public_router
from routes.admin import router as admin_router
from services.data_seeder import seed_database
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up...")
    await connect_to_mongo()
    await seed_database()
    logger.info("Application started successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down...")
    await close_mongo_connection()
    logger.info("Application shutdown complete")

# Create FastAPI app
app = FastAPI(
    title="Aftab Pathan Portfolio API",
    description="Backend API for Aftab Pathan's portfolio website",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(public_router)
app.include_router(admin_router)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Aftab Pathan Portfolio API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("new_server:app", host="0.0.0.0", port=8001, reload=True)