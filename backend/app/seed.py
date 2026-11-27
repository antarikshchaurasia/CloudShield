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

    # 2. Seed Default Operator
    operator = db.query(User).filter(User.email == "operator@cloudshield.local").first()
    if not operator:
        operator = User(
            email="operator@cloudshield.local",
            password_hash=get_password_hash("Operator@123"),
            role="operator",
            created_at=datetime.now(timezone.utc)
        )
        db.add(operator)
        db.commit()
        db.refresh(operator)

    # 3. Seed Initial Resources
    res_app = db.query(Resource).filter(Resource.name == "test-app-service").first()
    if not res_app:
        res_app = Resource(
            name="test-app-service",
            resource_type="application",
            endpoint_or_path="http://localhost:8001",
            status="healthy",
            last_seen=datetime.now(timezone.utc)
        )
        db.add(res_app)
        db.commit()
        db.refresh(res_app)

    res_cfg = db.query(Resource).filter(Resource.name == "target-cloud-config").first()
    if not res_cfg:
        res_cfg = Resource(
            name="target-cloud-config",
            resource_type="storage_config",
            endpoint_or_path="security-rules/samples/target_infrastructure.yaml",
            status="degraded",
            last_seen=datetime.now(timezone.utc)
        )
        db.add(res_cfg)
        db.commit()
        db.refresh(res_cfg)


if __name__ == "__main__":
    from backend.app.core.database import SessionLocal, init_db
    init_db()
    session = SessionLocal()
    seed_database(session)
    session.close()
    print("Database seeding completed successfully.")
