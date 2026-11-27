# CloudShield Frontend — Week 1 Shell

**Owner:** Member 2 (Frontend & UI/UX Engineer)  
**Milestone:** Week 1 — Vite + React 18 SPA Skeleton, Tailwind Design System & Responsive Layout

## Implemented in Week 1
- Vite + React 18 application shell (`vite.config.js` with `/api` proxy to port `8000`)
- Tailwind CSS 3.4 + PostCSS configuration with CloudShield cyber dark design tokens (`src/index.css`)
- Responsive `AppShell` combining sticky `Navbar` and collapsible mobile/desktop `Sidebar`
- React Router v6 navigation hierarchy across all 9 SecOps workspace routes
- Live FastAPI gateway connectivity probe (`GET /api/health` and `GET /api/version`) on `OverviewShellPage`

## Local Verification
```bash
cd frontend
npm install
npm run dev
```

Build check:
```bash
npm run build
```
