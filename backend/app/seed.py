import os
import sys

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
if REPO_ROOT not in sys.path:
    sys.path.insert(0, REPO_ROOT)

from datetime import datetime, timezone
from sqlalchemy.orm import Session
from backend.app.models.models import User, Resource
from backend.app.core.security import get_password_hash


def seed_database(db: Session):
    # 1. Seed Default Admin
    admin = db.query(User).filter(User.email == "admin@cloudshield.local").first()
    if not admin:
        admin = User(
            email="admin@cloudshield.local",
            password_hash=get_password_hash("Admin@123"),
            role="admin",
            created_at=datetime.now(timezone.utc)
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
