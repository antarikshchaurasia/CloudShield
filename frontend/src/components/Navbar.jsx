import React from 'react';
import { useLocation } from 'react-router-dom';

export const getPageTitle = (path) => {
  switch (path) {
    case '/':
      return 'Overview';
    case '/resources':
      return 'Resources';
    case '/monitoring':
      return 'Monitoring & Observability';
    case '/security':
      return 'Security Posture';
    case '/incidents':
      return 'Incidents';
    case '/remediation':
      return 'Remediation & Approvals';
    case '/audit':
      return 'Audit Logs';
    case '/reports':
      return 'Reports & Analytics';
    case '/settings':
      return 'Settings';
    default:
      return 'Overview';
  }
};

export const Navbar = () => {
  const location = useLocation();

  return (
    <header
      style={{
        height: '56px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(20px)',
      }}
      className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6"
    >
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <span className="text-slate-500 hidden sm:inline">Console</span>
        <span className="text-slate-600 hidden sm:inline">/</span>
        <span className="text-slate-400 hidden md:inline">CloudShield Node-01</span>
        <span className="text-slate-600 hidden md:inline">/</span>
        <span className="text-cyan-400 font-semibold">{getPageTitle(location.pathname)}</span>
      </div>
    </header>
  );
};
