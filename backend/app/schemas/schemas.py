from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


# Auth Schemas
class UserLogin(BaseModel):
    email: str
    password: str


class UserCreate(BaseModel):
    email: str
    password: str
    role: str = "operator"


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: str
    role: str
    created_at: datetime


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class TokenData(BaseModel):
    email: Optional[str] = None


# Resource Schemas
class ResourceBase(BaseModel):
    name: str
    resource_type: str
    endpoint_or_path: Optional[str] = None
    status: str = "healthy"


class ResourceCreate(ResourceBase):
    pass
