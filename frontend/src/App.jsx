import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { OverviewShellPage } from './pages/OverviewShellPage';
import { ModulePlaceholderPage } from './pages/ModulePlaceholderPage';

export const App = () => {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<OverviewShellPage />} />
          <Route
            path="/resources"
            element={
              <ModulePlaceholderPage
                title="Monitored Resources"
                milestone="Week 2"
                owner="Member 2 • UI/UX"
                description="Cloud infrastructure resource inventory table, endpoint health status links, and Admin registration drawer."
              />
            }
          />
          <Route
            path="/monitoring"
            element={
              <ModulePlaceholderPage
                title="Telemetry Monitoring"
                milestone="Week 2–3"
                owner="Member 2 & Member 4"
                description="Live CPU, memory, and request latency Recharts time-series streams scraped from Prometheus."
              />
            }
          />
          <Route
            path="/security"
            element={
              <ModulePlaceholderPage
                title="Security Posture"
                milestone="Week 3"
                owner="Member 2 & Member 3"
                description="OWASP Cloud Top 10 YAML policy scanner findings (SEC-001 through SEC-005) with forensic evidence inspection."
              />
            }
          />
          <Route
            path="/incidents"
            element={
              <ModulePlaceholderPage
                title="Incidents & Triage"
                milestone="Week 3"
                owner="Member 2 & Member 4"
                description="Fingerprint-deduplicated incident timeline, acknowledgement actions, and remediation trigger modal."
              />
            }
          />
          <Route
            path="/remediation"
            element={
              <ModulePlaceholderPage
                title="Remediation & Approvals"
                milestone="Week 3"
                owner="Member 2 & Member 5"
                description="Admin approval queue for allowlisted auto-remediation jobs with before/after configuration diff viewers."
              />
            }
          />
          <Route
            path="/audit"
            element={
              <ModulePlaceholderPage
                title="Audit Logs"
                milestone="Week 3"
                owner="Member 1 & Member 2"
                description="Tamper-evident hash-chained audit trail recording all operator and administrator security events."
              />
            }
          />
          <Route
            path="/reports"
            element={
              <ModulePlaceholderPage
                title="Evaluation Reports"
                milestone="Week 4"
                owner="Member 2 & Member 4"
                description="Empirical MTTD, deduplication ratio, and compliance improvement summaries for academic defense."
              />
            }
          />
          <Route
            path="/settings"
            element={
              <ModulePlaceholderPage
                title="Workspace Settings"
                milestone="Week 4"
                owner="Member 2 • UI/UX"
                description="Theme preferences, API gateway configuration, and operator profile settings."
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </Router>
  );
};

export default App;
