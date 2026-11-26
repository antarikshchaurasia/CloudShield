from datetime import datetime, timezone
from sqlalchemy import (
    Column, Integer, String, Float, Text, Boolean, DateTime, ForeignKey, Index
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base


def utcnow():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="operator")  # 'admin' or 'operator'
    created_at = Column(DateTime, default=utcnow, nullable=False)

    # Relationships
    requested_remediations = relationship("RemediationJob", foreign_keys="RemediationJob.requested_by", back_populates="requester")
    approved_remediations = relationship("RemediationJob", foreign_keys="RemediationJob.approved_by", back_populates="approver")
    audit_logs = relationship("AuditLog", back_populates="actor")
