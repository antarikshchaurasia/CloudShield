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
