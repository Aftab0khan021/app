# app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.db import get_db

app = FastAPI()

# Allow your Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://app-git-main-aftab-pathans-projects-9c06d6e7.vercel.app",
         # optional local (Vite)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    try:
        db = get_db()
        await db.command("ping")
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# simple demo endpoints you can keep or remove
@app.post("/api/v1/user")
async def create_user(payload: dict):
    db = get_db()
    result = await db.users.insert_one(payload)
    return {"inserted_id": str(result.inserted_id)}

@app.get("/api/v1/user")
async def list_users():
    db = get_db()
    out = []
    cursor = db.users.find().limit(50)
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        out.append(doc)
    return {"users": out}
