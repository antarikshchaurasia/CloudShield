# CloudShield: Intelligent Cloud Security, Monitoring and Auto-Remediation Platform

> **Capstone Project (5 Members, 1 Month, ₹0 Mandatory Cloud Spend)**  
> *A unified platform for continuous telemetry monitoring, OWASP configuration compliance assessment, fingerprint-based incident triage, and allowlisted auto-remediation with closed-loop verification.*

## 1. System Architecture Overview

```text
[React 18 Dashboard] <──HTTP / JWT──> [FastAPI Backend Gateway]
 (Vite, Tailwind, Recharts)              ├── Auth & RBAC (Bcrypt, HS256 JWT)
                                         ├── Monitored Resources API (/api/resources)
                                         ├── SQLAlchemy 2.0 ORM (7 Entities)
                                         └── PostgreSQL 16 / SQLite Fallback
```

## 2. Week 2 Status (Milestone 2 — Data Layer, JWT Auth & RBAC)
- **Week 1 Foundation:** SRS & architecture docs (`docs/`), 7-entity ORM models (`backend/app/models/models.py`), FastAPI health probe
- **Week 2 Security & Auth:**
  - Bcrypt password hashing & HS256 JWT issuance (`backend/app/core/security.py`)
  - Role-Based Access Control dependencies (`get_current_user`, `require_admin`, `require_operator_or_admin`)
  - Authentication endpoints: `POST /api/auth/login`, `POST /api/auth/token`, `GET /api/auth/me`, `POST /api/auth/register`
  - Monitored Resources API (`GET/POST /api/resources`) with Admin-only creation guard
  - Database seed runner (`backend/app/seed.py`) with `admin@cloudshield.local` & `operator@cloudshield.local`
  - Automated Auth & RBAC Pytest suite (`backend/tests/test_api_rbac.py`)

## 3. Running & Testing Week 2 Backend
```bash
pip install -r backend/requirements.txt
python backend/app/seed.py
python -m uvicorn backend.app.main:app --port 8000 --reload
pytest backend/tests -v
```
