from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date
from bson import ObjectId

class Experience(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    company: str
    location: str
    type: str  # full-time, part-time, internship, contract
    start_date: date
    end_date: Optional[date] = None
    current: bool = False
    description: str
    achievements: List[str] = []
    skills: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, date: lambda v: v.isoformat() if v else None}

class ExperienceCreate(BaseModel):
    title: str
    company: str
    location: str
    type: str
    start_date: date
    end_date: Optional[date] = None
    current: bool = False
    description: str
    achievements: List[str] = []
    skills: List[str] = []

class ExperienceUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    type: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    current: Optional[bool] = None
    description: Optional[str] = None
    achievements: Optional[List[str]] = None
    skills: Optional[List[str]] = None