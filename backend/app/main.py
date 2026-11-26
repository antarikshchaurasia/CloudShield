import os
import sys

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
if REPO_ROOT not in sys.path:
    sys.path.insert(0, REPO_ROOT)

from fastapi import FastAPI
from backend.app.core.config import settings

app = FastAPI(
    title="CloudShield API",
    description="Unified Platform for Cloud Monitoring, Security Assessment, and Auto-Remediation",
    version=settings.VERSION,
)
