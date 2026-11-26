import logging
from sqlalchemy import create_engine
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

database_url = settings.DATABASE_URL

# Handle SQLite vs Postgres connection args
connect_args = {}
if database_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

try:
    engine = create_engine(database_url, connect_args=connect_args)
    with engine.connect() as conn:
        pass
except Exception as e:
    logger.warning(f"Could not connect to configured DATABASE_URL ({database_url}): {e}. Falling back to SQLite.")
    database_url = "sqlite:///./cloudshield.db"
    engine = create_engine(database_url, connect_args={"check_same_thread": False})
