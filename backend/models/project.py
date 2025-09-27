from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date
from bson import ObjectId

class Project(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    description: str
    short_description: str
    image: str
    images: List[str] = []
    live_url: str
    github_url: str
    technologies: List[str] = []
    features: List[str] = []
    category: str
    status: str = "completed"  # completed, in-progress, planned
    start_date: date
    end_date: date
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, date: lambda v: v.isoformat()}

class ProjectCreate(BaseModel):
    title: str
    description: str
    short_description: str
    image: str
    images: List[str] = []
    live_url: str
    github_url: str
    technologies: List[str] = []
    features: List[str] = []
    category: str
    status: str = "completed"
    start_date: date
    end_date: date

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    image: Optional[str] = None
    images: Optional[List[str]] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    technologies: Optional[List[str]] = None
    features: Optional[List[str]] = None
    category: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None