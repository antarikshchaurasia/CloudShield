# CloudShield

> **AI-Powered Cloud Security Posture Management (CSPM) Platform**

CloudShield continuously monitors cloud infrastructure, detects misconfigurations and threats, triages security findings, and automates remediation — giving security teams a single pane of glass over their entire cloud estate.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Team & Responsibilities](#team--responsibilities)
- [Project Milestones](#project-milestones)
- [Frontend (Member 2)](#frontend-member-2)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

| Feature | Detail |
|---|---|
| **Stack** | React 18 + Vite (frontend) · FastAPI + MongoDB (backend) |
| **Auth** | JWT-based, RBAC with `admin` / `operator` / `viewer` roles |
| **Design** | Cyber-dark theme, Tailwind CSS, fully responsive |
| **Deployment** | Docker-compose, GitHub Actions CI/CD |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CloudShield                         │
│                                                         │
│  ┌──────────────┐        ┌──────────────────────────┐  │
│  │   Frontend   │◄──────►│       FastAPI Backend     │  │
│  │  React 18    │  REST  │  JWT · RBAC · MongoDB     │  │
│  │  Vite · TW   │        │  Incidents · Resources    │  │
│  └──────────────┘        └──────────────────────────┘  │
│                                    │                    │
│                           ┌────────▼────────┐          │
│                           │   MongoDB Atlas  │          │
│                           └─────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

---

## Team & Responsibilities

| Member | Role | Primary Deliverables |
|--------|------|----------------------|
| **Member 1** | Backend & API Lead | FastAPI, JWT auth, RBAC, MongoDB models, REST endpoints |
| **Member 2** | Frontend & UI/UX Engineer | React SPA, Tailwind design system, Auth context, Dashboard, Incident triage UI |
| **Member 3** | Cloud Integrations & Scanner | AWS/GCP/Azure SDK connectors, posture scanner, findings engine |
| **Member 4** | Remediation & Automation | Remediation playbooks, approval workflow, audit trail |
| **Member 5** | DevOps & QA | Docker, GitHub Actions CI/CD, Terraform, end-to-end tests |

---

## Project Milestones

### Week 1 — Foundation
- **Backend:** FastAPI skeleton, JWT auth endpoints, MongoDB connection, seed accounts
- **Frontend:** Vite + React 18 SPA shell, Tailwind CSS config, responsive Navbar + Sidebar, route hierarchy, `GET /api/health` health probe on the overview page

### Week 2 — Auth & Core Dashboard
- **Backend:** RBAC middleware, resource CRUD endpoints, OpenAPI docs, test suite
- **Frontend:** Auth Context with JWT persistence, Login screen with 1-click demo buttons, KPI summary cards, main Dashboard with live resource table, ProtectedRoute guards

### Week 3 — Incident Triage & Findings
- **Backend:** Incidents API, security findings engine, remediation request flow
- **Frontend:** Incident Triage view, Security Findings inspector with expandable evidence, Remediation Approval Modal with before/after diff viewer

### Week 4 — Polish & Production Hardening
- **Backend:** Rate limiting, audit log, performance tuning
- **Frontend:** UI polish, animations, dark-mode refinements, mobile-responsive viewports, toast notifications, error boundaries

---

## Frontend (Member 2)

All frontend code lives under `frontend/`.

### Tech Stack

| Library | Purpose |
|---------|---------|
| React 18 | Component framework |
| Vite 5 | Build tool & dev server |
| React Router 6 | Client-side routing |
| Tailwind CSS 3 | Utility-first styling |
| Axios | HTTP client with JWT interceptors |
| Lucide React | Icon set |

### Folder Structure

```
frontend/
├── public/
├── src/
│   ├── components/        # Shared UI components
│   │   ├── AppShell.jsx
│   │   ├── KpiCard.jsx
│   │   ├── ModuleCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatusBadge.jsx
│   ├── context/
│   │   └── AuthContext.jsx  # JWT auth, RBAC flags
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ModulePlaceholderPage.jsx
│   │   └── OverviewShellPage.jsx
│   ├── services/
│   │   ├── api.js           # Axios client + all API calls
│   │   └── healthService.js
│   ├── App.jsx
│   ├── index.css            # Cyber design system (CSS vars + Tailwind)
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.11
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/antarikshchaurasia/CloudShield.git
cd CloudShield
```

### 2. Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
cp ../.env.example .env   # fill in MONGO_URI, JWT_SECRET, etc.
python -m uvicorn app.main:app --port 8000 --reload
```

Seeded demo accounts (created on first startup):

| Email | Password | Role |
|-------|----------|------|
| `admin@cloudshield.local` | `Admin@123` | admin |
| `operator@cloudshield.local` | `Operator@123` | operator |

### 3. Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build      # outputs to frontend/dist/
```

---

## Environment Variables

Copy `frontend/.env.example` and fill in values:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Backend env vars (in `backend/.env`):

```env
MONGO_URI=mongodb://localhost:27017/cloudshield
JWT_SECRET=your-super-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
ENVIRONMENT=development
```

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes with descriptive messages
4. Push to your fork and open a Pull Request against `main`

Please follow the existing code style — ESLint + Prettier for frontend, Black + Ruff for backend.

---

## License

MIT © CloudShield Team 2026
