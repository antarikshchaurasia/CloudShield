# CloudShield: Architecture, Use Cases & Data Flow Specifications

## 1. System Architecture Diagram

```mermaid
graph TB
    subgraph ClientLayer ["Client & Presentation Tier"]
        UI["React 18 Dashboard<br/>(Vite, Tailwind, Recharts)"]
    end

    subgraph APILayer ["Backend Application Tier (FastAPI)"]
        API["FastAPI Gateway"]
        AuthSvc["Auth & RBAC Service<br/>(JWT + Bcrypt)"]
        MonSvc["Monitoring & Alert Ingestion"]
        SecSvc["Security Policy Engine<br/>(YAML Parser)"]
        RemSvc["Controlled Remediation Worker<br/>(Allowlist Registry)"]
        AuditSvc["Audit Logging Service"]
    end

    subgraph DataLayer ["Persistence Tier"]
        DB[(PostgreSQL 16 / SQLite<br/>Users, Resources, Findings,<br/>Incidents, Remediations, Audit)]
    end

    subgraph MonitoringLayer ["Telemetry & Test Infrastructure"]
        Prom["Prometheus Server<br/>(Scraping & Alert Rules)"]
        TestApp["Monitored Test Application<br/>(/health, /metrics, /simulate)"]
        ConfigFile["Target Infrastructure Config<br/>(target_infrastructure.yaml)"]
    end

    UI -->|HTTP / REST API + JWT| API
    API --> AuthSvc
    API --> MonSvc
    API --> SecSvc
    API --> RemSvc
    API --> AuditSvc

    AuthSvc --> DB
    MonSvc --> DB
    SecSvc --> DB
    RemSvc --> DB
    AuditSvc --> DB

    Prom -->|Scrapes /metrics| TestApp
    MonSvc -->|Scrapes & Ingests| Prom
    MonSvc -->|Heartbeats & Telemetry| TestApp
    SecSvc -->|Evaluates Policies| ConfigFile
    RemSvc -->|Safe Recovery Call| TestApp
    RemSvc -->|Safe Key Patch| ConfigFile
```

---

## 2. Use Case Diagram

```mermaid
flowchart LR
    Operator["User: Operator"]
    Admin["User: Administrator"]
    SystemWorker["System Worker / Daemon"]

    subgraph CloudShieldPlatform ["CloudShield Platform Boundary"]
        UC1(["UC-1: Authenticate & Refresh Session"])
        UC2(["UC-2: View Live Telemetry & Resources"])
        UC3(["UC-3: Ingest Metric Alerts & Deduplicate"])
        UC4(["UC-4: Trigger Configuration Security Scan"])
        UC5(["UC-5: Acknowledge & Triage Incidents"])
        UC6A(["UC-6a: Submit Remediation Request"])
        UC6B(["UC-6b: Approve & Execute Remediation"])
        UC7(["UC-7: Review Immutable Audit Logs"])
    end

    Operator --> UC1
    Operator --> UC2
    Operator --> UC4
    Operator --> UC5
    Operator --> UC6A

    Admin --> UC1
    Admin --> UC2
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6A
