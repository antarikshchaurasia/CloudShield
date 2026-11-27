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
