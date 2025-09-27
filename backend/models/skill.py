from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class Skill(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    category: str  # Programming Languages, Web Technologies, etc.
    name: str
    level: int = Field(ge=0, le=100)  # 0-100
    years_experience: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class SkillCreate(BaseModel):
    category: str
    name: str
    level: int = Field(ge=0, le=100)
    years_experience: Optional[float] = None

class SkillUpdate(BaseModel):
    category: Optional[str] = None
    name: Optional[str] = None
    level: Optional[int] = Field(default=None, ge=0, le=100)
    years_experience: Optional[float] = None

class SkillsGrouped(BaseModel):
    technical: dict  # Category -> List of skills
    soft: list  # List of soft skill names