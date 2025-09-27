from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class BlogPost(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    slug: str
    excerpt: str
    content: str
    image: str
    tags: List[str] = []
    published_at: Optional[datetime] = None
    read_time: str
    featured: bool = False
    status: str = "draft"  # draft, published, archived
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    image: str
    tags: List[str] = []
    read_time: str
    featured: bool = False
    status: str = "draft"

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = None
    tags: Optional[List[str]] = None
    read_time: Optional[str] = None
    featured: Optional[bool] = None
    status: Optional[str] = None