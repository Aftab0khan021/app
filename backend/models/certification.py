from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date
from bson import ObjectId

class Certification(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    issuer: str
    date: date
    credential_id: Optional[str] = None
    description: str
    skills: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, date: lambda v: v.isoformat()}

class CertificationCreate(BaseModel):
    title: str
    issuer: str
    date: date
    credential_id: Optional[str] = None
    description: str
    skills: List[str] = []

class CertificationUpdate(BaseModel):
    title: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[date] = None
    credential_id: Optional[str] = None
    description: Optional[str] = None
    skills: Optional[List[str]] = None