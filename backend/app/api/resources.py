from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from backend.app.core.database import get_db
from backend.app.core.security import get_current_user, require_admin
from backend.app.models.models import Resource, User
from backend.app.schemas.schemas import ResourceResponse, ResourceCreate

router = APIRouter(prefix="/api/resources", tags=["Monitored Resources"])
