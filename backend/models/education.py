from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date
from bson import ObjectId

class Education(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    degree: str
    field: str
    institution: str
    location: str
    start_date: date
    end_date: Optional[date] = None
    current: bool = False
    gpa: Optional[str] = None
    description: str
    achievements: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, date: lambda v: v.isoformat() if v else None}

class EducationCreate(BaseModel):
    degree: str
    field: str
    institution: str
    location: str
    start_date: date
    end_date: Optional[date] = None
    current: bool = False
    gpa: Optional[str] = None
    description: str
    achievements: List[str] = []

class EducationUpdate(BaseModel):
    degree: Optional[str] = None
    field: Optional[str] = None
    institution: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    current: Optional[bool] = None
    gpa: Optional[str] = None
    description: Optional[str] = None
    achievements: Optional[List[str]] = None