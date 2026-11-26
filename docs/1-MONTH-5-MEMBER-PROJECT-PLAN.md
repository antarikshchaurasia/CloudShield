# CloudShield: 5-Member Team Division & 1-Month Implementation Roadmap
**B.Tech / Capstone Project Milestone Execution Plan**

---

## 1. Team Composition & Role Distribution (5 Members)

| Member | Role Title | Core Technical Domain | Primary Project Modules |
| :--- | :--- | :--- | :--- |
| **Member 1** (Team Lead) | Backend & Database Architect | FastAPI, SQLAlchemy 2.0, PostgreSQL/SQLite, Alembic | Database schema (7 entities), CRUD services, API Gateway routing, JWT auth, database seeding (seed.py). |
| **Member 2** | Frontend & UI/UX Engineer | React 18, Vite, Tailwind CSS, Recharts, Lucide Icons | Responsive SPA layout, Dashboard KPI analytics, Telemetry charts, Incident triage & Remediation modals. |
| **Member 3** | Cloud Security & Policy Specialist | PyYAML, Python Security Analysis, OWASP Compliance | Security Policy engine (policies.yaml), OWASP checks (SEC-001..005), config diffing & automated patch resolution. |
| **Member 4** | Telemetry Monitoring & Simulation Lead | Prometheus, Python \prometheus-client\, Microservices | Instrumented \	est-app\ (port 8001), Prometheus scraper & alert rules, fingerprint-based incident deduplication. |
| **Member 5** | DevOps, Remediation & QA Lead | Docker Compose, Pytest, GitHub Actions, Security | Allowlisted remediation worker (\ctions.py\), closed-loop verification, multi-container orchestration, 14 test cases. |

---

## 2. Four-Week Organic Implementation Roadmap

### Week 1: Requirements, System Architecture & Project Skeleton (TOMORROW'S REVIEW)
- **Shared Goal**: Establish problem statement, finalize 5-service architecture, freeze data schemas, and deploy base running skeleton.
- **Member 1**: Initialized FastAPI backend skeleton, defined initial health check endpoint (\GET /api/health\), drafted SQLAlchemy schema for 7 entities.
- **Member 2**: Initialized Vite + React 18 frontend shell, configured Tailwind CSS, created base responsive layout and navigation sidebar.
- **Member 3**: Researched OWASP Top 10 for Cloud and CIS benchmarks; drafted YAML schema for \policies.yaml\ and identified 5 key misconfigurations.
- **Member 4**: Created standalone FastAPI \	est-app\ stub (port 8001) with initial \/metrics\ endpoint; drafted Prometheus configuration.
- **Member 5**: Configured git repository with branch protection rules, drafted initial \compose.yaml\ and container networking specifications.

### Week 2: Core Data Layer, Authentication & Telemetry Ingestion
- **Member 1**: Implemented JWT cryptographic token signing, bcrypt password hashing, and Role-Based Access Control (\dmin\ vs \operator\).
- **Member 2**: Built Auth Context, login screen with 1-click demo buttons, and main dashboard layout with KPI summary cards.
- **Member 3**: Built the YAML parser engine and implemented first two security checks: \SEC-001\ (Unrestricted S3) and \SEC-002\ (Default Admin Credentials).
- **Member 4**: Configured Prometheus server to scrape \	est-app\ at 5s intervals; created failure injection endpoints (\/fail/cpu\, \/fail/memory\).
- **Member 5**: Dockerized frontend, backend, and test-app; set up automated Pytest test runner with SQLite in-memory fallback.

### Week 3: Security Policy Engine, Incidents & Controlled Auto-Remediation
- **Member 1**: Completed REST routes for incidents, findings, and audit trails; implemented database transaction rollback and foreign key cascades.
- **Member 2**: Developed Incident Triage view, Security Findings inspector, and Remediation Approval Modal with before/after diff viewers.
- **Member 3**: Completed remaining checks (\SEC-003\ Encryption-at-Rest, \SEC-004\ Open Security Groups, \SEC-005\ Backup Retention) and auto-resolve diff logic.
- **Member 4**: Built fingerprint-based incident deduplication engine in backend to prevent alert fatigue during sustained telemetry anomalies.
- **Member 5**: Implemented allowlisted remediation registry (\ACTION_REGISTRY\), operator request submission, admin approval gate, and post-action verification.

### Week 4: System Integration, Empirical Benchmarking & Academic Defense Preparation
- **Member 1**: Optimized database queries, ensured seamless fallback between PostgreSQL 16 and SQLite, and validated zero-leak session handling.
- **Member 2**: Polished UI with smooth animations, dark mode theme consistency, responsive mobile viewports, and toast notifications.
- **Member 3**: Tested edge cases in YAML scanner (malformed files, missing fields), ensuring graceful error reporting without server crashes.
- **Member 4**: Conducted performance evaluation experiments (\
un_evaluation.py\), measuring Mean Time to Detect (MTTD) and Deduplication Ratio.
- **Member 5**: Validated all 14 Pytest test cases, configured GitHub Actions CI workflow, and prepared Docker Compose single-command boot.

---

## 3. Tomorrow's Week 1 Review Defense Kit

### Presentation Agenda (10-15 Minutes Total)
1. **Project Title & Problem Statement** (Member 1 - 2 mins)
2. **System Architecture & Technology Choices** (Member 2 - 2 mins)
3. **Security & Monitoring Innovation Highlights** (Member 3 & Member 4 - 3 mins)
4. **DevOps & Verification Safety Model** (Member 5 - 2 mins)
5. **Live Working Proof-of-Concept Demo** (Team - 3 mins)
6. **Q&A with Panel** (3 mins)

### Individual 1-Minute Speaking Scripts for Tomorrow

#### Member 1 (Lead & Backend):
> "Respected panel, our project is CloudShield: an Intelligent Cloud Security, Monitoring, and Auto-Remediation Platform. In Week 1, my primary responsibility was establishing the system architecture and data foundation. I designed the 7-entity relational schema covering users, monitored resources, security findings, incidents, and audit trails. I also set up the FastAPI service skeleton with asynchronous endpoints and health verification."

#### Member 2 (Frontend):
> "I am leading the Frontend and User Experience stream. For Week 1, I initialized our Single Page Application using React 18, Vite, and Tailwind CSS. I established our design system, component hierarchy, and responsive layout including the executive dashboard shell, navigation routing, and authentication flow. Our goal is to present complex telemetry and security posture intuitively to operators."

#### Member 3 (Security Policy):
> "My focus is on the Cloud Security and Compliance Engine. In Week 1, I conducted a threat modeling exercise based on OWASP Top 10 for Cloud and CIS benchmarks. I drafted the declarative YAML policy schema and formulated the 5 critical cloud misconfiguration rules we will detect, spanning open S3 buckets, privilege exposures, and missing encryption."

#### Member 4 (Telemetry Monitoring):
> "I oversee telemetry monitoring and fault simulation. In Week 1, I designed the architecture for our lightweight, instrumented microservice using Python and Prometheus client libraries. I formulated the Prometheus scrape pipeline and defined the initial alert threshold specifications to capture CPU, memory, and latency anomalies in real time."

#### Member 5 (DevOps & Remediation):
> "I am responsible for DevOps, containerization, and safe auto-remediation. In Week 1, I configured our version control branching workflow, created the Docker Compose orchestration blueprint for our 5 microservices, and designed the safety architecture for our allowlisted remediation engine to strictly prevent arbitrary code execution."
