from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from database import get_collection
from models.personal import PersonalInfo, PersonalInfoUpdate
from models.project import Project, ProjectCreate, ProjectUpdate
from models.experience import Experience, ExperienceCreate, ExperienceUpdate
from models.skill import Skill, SkillCreate, SkillUpdate
from models.education import Education, EducationCreate, EducationUpdate
from models.certification import Certification, CertificationCreate, CertificationUpdate
from models.blog import BlogPost, BlogPostCreate, BlogPostUpdate
from models.testimonial import Testimonial, TestimonialCreate, TestimonialUpdate
from models.contact import ContactMessage, ContactMessageUpdate
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/api/admin", tags=["admin"])

# ---------- Helpers ----------
def serialize_doc(doc):
    """Convert Mongo _id to str and mirror into id field."""
    if doc and "_id" in doc:
        if isinstance(doc["_id"], ObjectId):
            doc["_id"] = str(doc["_id"])
        if "id" not in doc:
            doc["id"] = doc["_id"]
    return doc

def serialize_docs(docs):
    return [serialize_doc(doc) for doc in docs]

def ensure_oid(id_str: str) -> ObjectId:
    if not ObjectId.is_valid(id_str):
        raise HTTPException(status_code=400, detail="Invalid ID")
    return ObjectId(id_str)

# ---------- Personal Information ----------
@router.put("/personal", response_model=PersonalInfo)
async def update_personal_info(update_data: PersonalInfoUpdate):
    collection = await get_collection("personal_info")
    current = await collection.find_one()
    if not current:
        raise HTTPException(status_code=404, detail="Personal information not found")

    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()

    await collection.update_one({"_id": current["_id"]}, {"$set": update_dict})
    updated = await collection.find_one({"_id": current["_id"]})
    return serialize_doc(updated)

# ---------- Projects ----------
@router.get("/projects", response_model=List[Project])
async def list_projects():
    collection = await get_collection("projects")
    docs = await collection.find().sort("updated_at", -1).to_list(1000)
    return serialize_docs(docs)

@router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    collection = await get_collection("projects")
    project_data = project.dict()
    now = datetime.utcnow()
    project_data["created_at"] = now
    project_data["updated_at"] = now
    result = await collection.insert_one(project_data)
    created = await collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created)

@router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, update_data: ProjectUpdate):
    collection = await get_collection("projects")
    oid = ensure_oid(project_id)
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()

    result = await collection.update_one({"_id": oid}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    updated = await collection.find_one({"_id": oid})
    return serialize_doc(updated)

@router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    collection = await get_collection("projects")
    oid = ensure_oid(project_id)
    result = await collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

# ---------- Experience ----------
@router.post("/experience", response_model=Experience)
async def create_experience(experience: ExperienceCreate):
    collection = await get_collection("experiences")
    data = experience.dict()
    now = datetime.utcnow()
    data["created_at"] = now
    data["updated_at"] = now
    result = await collection.insert_one(data)
    created = await collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created)

@router.put("/experience/{experience_id}", response_model=Experience)
async def update_experience(experience_id: str, update_data: ExperienceUpdate):
    collection = await get_collection("experiences")
    oid = ensure_oid(experience_id)
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()

    result = await collection.update_one({"_id": oid}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Experience not found")

    updated = await collection.find_one({"_id": oid})
    return serialize_doc(updated)

@router.delete("/experience/{experience_id}")
async def delete_experience(experience_id: str):
    collection = await get_collection("experiences")
    oid = ensure_oid(experience_id)
    result = await collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Experience not found")
    return {"message": "Experience deleted successfully"}

# ---------- Skills ----------
@router.post("/skills", response_model=Skill)
async def create_skill(skill: SkillCreate):
    collection = await get_collection("skills")
    data = skill.dict()
    now = datetime.utcnow()
    data["created_at"] = now
    data["updated_at"] = now
    result = await collection.insert_one(data)
    created = await collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created)

@router.put("/skills/{skill_id}", response_model=Skill)
async def update_skill(skill_id: str, update_data: SkillUpdate):
    collection = await get_collection("skills")
    oid = ensure_oid(skill_id)
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()

    result = await collection.update_one({"_id": oid}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")

    updated = await collection.find_one({"_id": oid})
    return serialize_doc(updated)

@router.delete("/skills/{skill_id}")
async def delete_skill(skill_id: str):
    collection = await get_collection("skills")
    oid = ensure_oid(skill_id)
    result = await collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"message": "Skill deleted successfully"}

# ---------- Blog Posts (NEW) ----------
@router.get("/posts", response_model=List[BlogPost])
async def list_posts():
    collection = await get_collection("blog_posts")
    docs = await collection.find().sort("created_at", -1).to_list(1000)
    return serialize_docs(docs)

@router.post("/posts", response_model=BlogPost)
async def create_post(post: BlogPostCreate):
    collection = await get_collection("blog_posts")
    data = post.dict()
    now = datetime.utcnow()
    if not data.get("slug") and data.get("title"):
        data["slug"] = data["title"].lower().replace(" ", "-")
    data["created_at"] = now
    data["updated_at"] = now
    result = await collection.insert_one(data)
    created = await collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created)

@router.put("/posts/{post_id}", response_model=BlogPost)
async def update_post(post_id: str, update_data: BlogPostUpdate):
    collection = await get_collection("blog_posts")
    oid = ensure_oid(post_id)
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    if "title" in update_dict and "slug" not in update_dict:
        update_dict["slug"] = update_dict["title"].lower().replace(" ", "-")
    update_dict["updated_at"] = datetime.utcnow()
    result = await collection.update_one({"_id": oid}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    updated = await collection.find_one({"_id": oid})
    return serialize_doc(updated)

@router.delete("/posts/{post_id}")
async def delete_post(post_id: str):
    collection = await get_collection("blog_posts")
    oid = ensure_oid(post_id)
    result = await collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}

# ---------- Settings (NEW) ----------
@router.get("/settings")
async def get_settings():
    collection = await get_collection("settings")
    doc = await collection.find_one()
    if not doc:
        now = datetime.utcnow()
        seed = {"siteTitle": "Portfolio", "defaultDark": False,
                "created_at": now, "updated_at": now}
        res = await collection.insert_one(seed)
        doc = await collection.find_one({"_id": res.inserted_id})
    return serialize_doc(doc)

@router.put("/settings")
async def update_settings(data: Dict[str, Any]):
    collection = await get_collection("settings")
    current = await collection.find_one()
    payload = {k: v for k, v in data.items() if k in ("siteTitle", "defaultDark")}
    payload["updated_at"] = datetime.utcnow()
    if current:
        await collection.update_one({"_id": current["_id"]}, {"$set": payload})
        doc = await collection.find_one({"_id": current["_id"]})
    else:
        payload["created_at"] = datetime.utcnow()
        res = await collection.insert_one(payload)
        doc = await collection.find_one({"_id": res.inserted_id})
    return serialize_doc(doc)

# ---------- Messages ----------
@router.get("/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    collection = await get_collection("contact_messages")
    messages = await collection.find().sort("created_at", -1).to_list(1000)
    return serialize_docs(messages)

@router.put("/messages/{message_id}")
async def update_message_status(message_id: str, update_data: ContactMessageUpdate):
    collection = await get_collection("contact_messages")
    oid = ensure_oid(message_id)
    update_dict = update_data.dict()
    update_dict["updated_at"] = datetime.utcnow()
    result = await collection.update_one({"_id": oid}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message status updated successfully"}
