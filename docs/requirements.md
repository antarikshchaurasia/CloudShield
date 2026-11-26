# CloudShield: Functional & Non-Functional Requirements Specification

## 1. System Users & Role-Based Access Control (RBAC)
CloudShield enforces strict Role-Based Access Control to prevent privilege escalation:

| Role | Permissions & Operational Boundary |
| :--- | :--- |
| **Administrator (`admin`)** | Full read/write access. Can manage users, trigger configuration scans, request remediation actions, **approve pending remediation jobs**, execute remediation, and inspect immutable audit logs. |
| **Operator (`operator`)** | Operational viewer and requester. Can view live metrics, active incidents, and security findings; acknowledge incidents; and **submit remediation requests**. Operators **cannot approve or execute** remediation jobs. |
| **System/Daemon** | Autonomous background worker. Polls metrics from Prometheus, evaluates thresholds, ingests webhooks, and maintains resource heartbeats. |

---

## 2. Seven Mandatory Functional Use Cases

### UC-1: Secure Authentication and Session Management
- **Description:** Users log in via email and password, receive a digitally signed JWT access token, and establish an authenticated session.
- **Actors:** Administrator, Operator.
- **Pre-conditions:** User account exists in database with bcrypt-hashed credentials.
- **Post-conditions:** Token stored in client memory/cookies; UI updates to show authenticated state and user role badge.

### UC-2: Live Telemetry and Health Monitoring
- **Description:** System continuously ingests CPU utilization, memory allocation, request counts, error rates, and health status from instrumented applications.
- **Actors:** Operator, Administrator, System.
- **Pre-conditions:** Monitored application (`test-app`) is active and exposing `/metrics`.
- **Post-conditions:** Telemetry is stored as time-series metrics snapshots and plotted on live dashboard graphs.

### UC-3: Threshold Breach Alert & Fingerprint-Based Incident Generation
- **Description:** When an operational metric breaches configured thresholds (e.g., CPU > 80% or health endpoint failures), an incident is automatically generated.
- **Actors:** System.
- **Post-conditions:** Incident created with stable fingerprint (`rule_name + resource_id`), severity assigned, and deduplicated against existing open incidents.

### UC-4: Static Cloud Infrastructure Security Scanning
- **Description:** The policy engine parses YAML infrastructure manifests and evaluates 5 OWASP-aligned security rules (`SEC-001` through `SEC-005`).
- **Actors:** Operator, Administrator.
- **Post-conditions:** Violations recorded in `security_findings` with rule ID, severity, offending configuration snippet (evidence), and remediation guidance. Repeat scans automatically resolve fixed items.

### UC-5: Incident Lifecycle & Acknowledgment Management
- **Description:** Operators review active incidents, inspect supporting evidence, and transition state from `open` to `acknowledged`.
- **Actors:** Operator, Administrator.
- **Post-conditions:** Incident updated with acknowledgment timestamp.

### UC-6: Controlled Remediation Request, Approval, & Execution
- **Description:** Operators submit remediation requests for an incident or finding. An Administrator reviews the proposed allowlisted action and approves/executes it.
- **Actors:** Operator (Requester), Administrator (Approver/Executor).
- **Post-conditions:** Worker executes safe allowlisted routine, validates post-execution health/security status, and marks job `succeeded` or `failed`.

