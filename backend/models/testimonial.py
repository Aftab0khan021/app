from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class Testimonial(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    position: str
    company: str
    image: str
    text: str
    rating: int = Field(ge=1, le=5)  # 1-5
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class TestimonialCreate(BaseModel):
    name: str
    position: str
    company: str
    image: str
    text: str
    rating: int = Field(ge=1, le=5)

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    company: Optional[str] = None
    image: Optional[str] = None
    text: Optional[str] = None
    rating: Optional[int] = Field(default=None, ge=1, le=5)