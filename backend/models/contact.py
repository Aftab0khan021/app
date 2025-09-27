from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class ContactMessage(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    email: str
    subject: str
    message: str
    status: str = "new"  # new, read, replied
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactMessageUpdate(BaseModel):
    status: str  # new, read, replied