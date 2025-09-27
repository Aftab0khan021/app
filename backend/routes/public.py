from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from database import get_collection
from models.personal import PersonalInfo
from models.project import Project
from models.experience import Experience
from models.skill import Skill, SkillsGrouped
from models.education import Education
from models.certification import Certification
from models.blog import BlogPost
from models.testimonial import Testimonial
from models.contact import ContactMessage, ContactMessageCreate
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/api", tags=["public"])

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

def serialize_docs(docs):
    return [serialize_doc(doc) for doc in docs]

# Personal Information
@router.get("/personal", response_model=PersonalInfo)
async def get_personal_info():
    collection = await get_collection("personal_info")
    personal = await collection.find_one()
    if not personal:
        raise HTTPException(status_code=404, detail="Personal information not found")
    return serialize_doc(personal)

# Projects
@router.get("/projects", response_model=List[Project])
async def get_projects():
    collection = await get_collection("projects")
    projects = await collection.find().sort("created_at", -1).to_list(100)
    return serialize_docs(projects)

@router.get("/projects/{project_id}", response_model=Project)
async def get_project_by_id(project_id: str):
    collection = await get_collection("projects")
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    project = await collection.find_one({"_id": ObjectId(project_id)})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return serialize_doc(project)

@router.get("/projects/featured", response_model=List[Project])
async def get_featured_projects():
    collection = await get_collection("projects")
    projects = await collection.find({"status": "completed"}).sort("created_at", -1).limit(6).to_list(6)
    return serialize_docs(projects)

# Experience
@router.get("/experience", response_model=List[Experience])
async def get_experience():
    collection = await get_collection("experiences")
    experiences = await collection.find().sort("start_date", -1).to_list(100)
    return serialize_docs(experiences)

# Skills
@router.get("/skills")
async def get_skills():
    collection = await get_collection("skills")
    skills = await collection.find().to_list(1000)
    
    # Group skills by category
    technical_skills = {}
    soft_skills = ["Problem Solving", "Team Collaboration", "Critical Thinking", "Communication", "Leadership", "Agile Development"]
    
    for skill in skills:
        category = skill["category"]
        if category not in technical_skills:
            technical_skills[category] = []
        technical_skills[category].append({
            "name": skill["name"],
            "level": skill["level"]
        })
    
    return {
        "technical": technical_skills,
        "soft": soft_skills
    }

# Education
@router.get("/education", response_model=List[Education])
async def get_education():
    collection = await get_collection("education")
    education = await collection.find().sort("start_date", -1).to_list(100)
    return serialize_docs(education)

# Certifications
@router.get("/certifications", response_model=List[Certification])
async def get_certifications():
    collection = await get_collection("certifications")
    certifications = await collection.find().sort("date", -1).to_list(100)
    return serialize_docs(certifications)

# Blog
@router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(limit: Optional[int] = 50):
    collection = await get_collection("blog_posts")
    posts = await collection.find({"status": "published"}).sort("published_at", -1).limit(limit).to_list(limit)
    return serialize_docs(posts)

@router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post_by_slug(slug: str):
    collection = await get_collection("blog_posts")
    post = await collection.find_one({"slug": slug, "status": "published"})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return serialize_doc(post)

@router.get("/blog/featured", response_model=List[BlogPost])
async def get_featured_blog_posts():
    collection = await get_collection("blog_posts")
    posts = await collection.find({"featured": True, "status": "published"}).sort("published_at", -1).limit(10).to_list(10)
    return serialize_docs(posts)

# Testimonials
@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    collection = await get_collection("testimonials")
    testimonials = await collection.find().sort("created_at", -1).to_list(100)
    return serialize_docs(testimonials)

# Contact
@router.post("/contact")
async def submit_contact_message(message: ContactMessageCreate):
    collection = await get_collection("contact_messages")
    
    message_data = message.dict()
    message_data["status"] = "new"
    message_data["created_at"] = datetime.utcnow()
    message_data["updated_at"] = datetime.utcnow()
    
    result = await collection.insert_one(message_data)
    
    return {
        "message": "Contact message submitted successfully",
        "id": str(result.inserted_id)
    }