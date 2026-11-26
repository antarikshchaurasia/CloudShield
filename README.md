# CloudShield: Intelligent Cloud Security, Monitoring and Auto-Remediation Platform

> **Capstone Project (5 Members, 1 Month, ₹0 Mandatory Cloud Spend)**  
> *A unified platform for continuous telemetry monitoring, OWASP configuration compliance assessment, fingerprint-based incident triage, and allowlisted auto-remediation with closed-loop verification.*

## 1. System Architecture Overview

```text
[React 18 Dashboard] <──HTTP / REST──> [FastAPI Backend Gateway]
 (Vite, Tailwind, Recharts)              ├── Core Config & Health Probe (/api/health)
                                         ├── SQLAlchemy 2.0 ORM (7 Entities)
                                         └── PostgreSQL 16 / SQLite Fallback
```

## 2. Week 1 Status (Milestone 1 — Backend & Architecture)
- Frozen SRS, functional requirements, and 7 core use cases (`docs/`)
- Relational database schema drafted across 7 entities (`backend/app/models/models.py`)
- FastAPI backend skeleton with `/api/health` and `/api/version` endpoints (`backend/app/main.py`)
- Automatic SQLite fallback for zero-blocker local development (`backend/app/core/database.py`)

## 3. Running the Week 1 Backend Skeleton
```bash
pip install -r backend/requirements.txt
python -m uvicorn backend.app.main:app --port 8000 --reload
```
Verify health check at `http://localhost:8000/api/health` and Swagger docs at `http://localhost:8000/docs`.
