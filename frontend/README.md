# CloudShield Frontend — Week 2 (Auth, RBAC & KPI Dashboard)

**Owner:** Member 2 (Frontend & UI/UX Engineer)  
**Milestone:** Week 2 — Auth Context, Login Screen with 1-Click Demo Buttons & Main Dashboard with KPI Summary Cards

## Implemented in Week 2
- **Centralized Axios Gateway (`src/services/api.js`):** Automatic `Bearer` JWT injection and global `401` session cleanup/redirect to `/login`.
- **Auth Context (`src/context/AuthContext.jsx`):** Persistent JWT login, registration, logout, startup `/api/auth/me` verification, and `isAdmin` / `isOperator` RBAC flags.
- **Login & Registration Screen (`src/pages/LoginPage.jsx`):** Sign-in and registration forms plus 1-click demo buttons for seeded `admin@cloudshield.local` and `operator@cloudshield.local` accounts.
- **Main Dashboard & KPI Cards (`src/pages/DashboardPage.jsx`, `src/components/KpiCard.jsx`):** Authenticated overview displaying live `GET /api/health` and `GET /api/resources` KPI summary cards, RBAC session strip, and registered resource inventory.
- **Protected Routing (`src/components/ProtectedRoute.jsx`):** Guards workspace routes and shows authenticated user/role and Sign Out controls in `Navbar` and `Sidebar`.

## Local Verification
Start the Week 2 FastAPI backend first:
```bash
python -m uvicorn backend.app.main:app --port 8000 --reload
```

Then start the Vite frontend:
```bash
cd frontend
npm install
npm run dev
```

Production build check:
```bash
npm run build
```
