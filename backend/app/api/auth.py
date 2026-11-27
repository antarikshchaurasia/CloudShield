from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.app.core.database import get_db
from backend.app.core.security import verify_password, create_access_token, get_password_hash, get_current_user
from backend.app.models.models import User
from backend.app.schemas.schemas import Token, UserResponse, UserLogin, UserCreate

router = APIRouter(prefix="/api/auth", tags=["Authentication"])
