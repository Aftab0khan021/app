from fastapi import APIRouter, HTTPException, Depends
from typing import List
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

# Helper functions
def serialize_doc(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

def serialize_docs(docs):
    return [serialize_doc(doc) for doc in docs]

# Personal Information Admin
@router.put("/personal", response_model=PersonalInfo)
async def update_personal_info(update_data: PersonalInfoUpdate):
    collection = await get_collection("personal_info")
    
    # Get current personal info
    current = await collection.find_one()
    if not current:
        raise HTTPException(status_code=404, detail="Personal information not found")
    
    # Update fields
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    await collection.update_one(
        {"_id": current["_id"]},
        {"$set": update_dict}
    )
    
    updated = await collection.find_one({"_id": current["_id"]})
    return serialize_doc(updated)

# Projects Admin
@router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    collection = await get_collection("projects")
    
    project_data = project.dict()
    project_data["created_at"] = datetime.utcnow()
    project_data["updated_at"] = datetime.utcnow()
    
    result = await collection.insert_one(project_data)
    created_project = await collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created_project)

@router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, update_data: ProjectUpdate):
    collection = await get_collection("projects")
    
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    result = await collection.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    updated_project = await collection.find_one({"_id": ObjectId(project_id)})
    return serialize_doc(updated_project)

@router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    collection = await get_collection("projects")
    
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    result = await collection.delete_one({"_id": ObjectId(project_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return {"message": "Project deleted successfully"}

# Experience Admin
@router.post("/experience", response_model=Experience)
async def create_experience(experience: ExperienceCreate):
    collection = await get_collection("experiences")
    
    experience_data = experience.dict()
    experience_data["created_at"] = datetime.utcnow()
    experience_data["updated_at"] = datetime.utcnow()
    
    result = await collection.insert_one(experience_data)
    created_experience = await collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created_experience)

@router.put("/experience/{experience_id}", response_model=Experience)
async def update_experience(experience_id: str, update_data: ExperienceUpdate):
    collection = await get_collection("experiences")
    
    if not ObjectId.is_valid(experience_id):
        raise HTTPException(status_code=400, detail="Invalid experience ID")
    
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    result = await collection.update_one(
        {"_id": ObjectId(experience_id)},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    updated_experience = await collection.find_one({"_id": ObjectId(experience_id)})
    return serialize_doc(updated_experience)

@router.delete("/experience/{experience_id}")
async def delete_experience(experience_id: str):
    collection = await get_collection("experiences")
    
    if not ObjectId.is_valid(experience_id):
        raise HTTPException(status_code=400, detail="Invalid experience ID")
    
    result = await collection.delete_one({"_id": ObjectId(experience_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    return {"message": "Experience deleted successfully"}

# Skills Admin
@router.post("/skills", response_model=Skill)
async def create_skill(skill: SkillCreate):
    collection = await get_collection("skills")
    
    skill_data = skill.dict()
    skill_data["created_at"] = datetime.utcnow()
    skill_data["updated_at"] = datetime.utcnow()
    
    result = await collection.insert_one(skill_data)
    created_skill = await collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created_skill)

@router.put("/skills/{skill_id}", response_model=Skill)
async def update_skill(skill_id: str, update_data: SkillUpdate):
    collection = await get_collection("skills")
    
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID")
    
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    result = await collection.update_one(
        {"_id": ObjectId(skill_id)},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    updated_skill = await collection.find_one({"_id": ObjectId(skill_id)})
    return serialize_doc(updated_skill)

@router.delete("/skills/{skill_id}")
async def delete_skill(skill_id: str):
    collection = await get_collection("skills")
    
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID")
    
    result = await collection.delete_one({"_id": ObjectId(skill_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    return {"message": "Skill deleted successfully"}

# Contact Messages Admin
@router.get("/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    collection = await get_collection("contact_messages")
    messages = await collection.find().sort("created_at", -1).to_list(1000)
    return serialize_docs(messages)

@router.put("/messages/{message_id}")
async def update_message_status(message_id: str, update_data: ContactMessageUpdate):
    collection = await get_collection("contact_messages")
    
    if not ObjectId.is_valid(message_id):
        raise HTTPException(status_code=400, detail="Invalid message ID")
    
    update_dict = update_data.dict()
    update_dict["updated_at"] = datetime.utcnow()
    
    result = await collection.update_one(
        {"_id": ObjectId(message_id)},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"message": "Message status updated successfully"}