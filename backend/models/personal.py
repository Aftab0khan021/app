from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class PersonalInfo(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    title: str
    location: str
    email: str
    phone: str
    linkedin: str
    github: Optional[str] = None
    bio: str
    avatar: str
    resume: str
    status: str = "available"  # available, busy, unavailable
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class PersonalInfoUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    location: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None
    resume: Optional[str] = None
    status: Optional[str] = None