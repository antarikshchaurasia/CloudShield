import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

export const Navbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const location = useLocation();
  const displayName = user?.email?.split('@')[0] || 'Operator';

  return (
    <header
      style={{
        height: '56px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(20px)',
      }}
      className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 sm:px-6"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 border border-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-500 hidden sm:inline">Console</span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-slate-400 hidden md:inline">CloudShield Node-01</span>
          <span className="text-slate-600 hidden md:inline">/</span>
          <span className="text-cyan-400 font-semibold">{getPageTitle(location.pathname)}</span>
        </div>
      </div>

      <div className="hidden md:block flex-1 max-w-md mx-4">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            readOnly
            placeholder="Global filter available in Week 3+..."
            aria-label="Global search preview"
            className="w-full bg-slate-900/80 border border-slate-700/60 rounded-lg pl-9 pr-8 py-1.5 text-xs text-slate-400 placeholder-slate-500 focus:outline-none font-mono cursor-not-allowed"
          />
          <span className="absolute right-3 top-2 text-[10px] text-slate-500 font-mono border border-slate-700 px-1 rounded">
            /
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-xs font-mono">
          <span className="pulse-emerald" />
          <span className="text-slate-300 font-semibold text-[11px] tracking-wider">LOCAL LAB</span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-1 ring-cyan-500/40">
            {displayName[0]?.toUpperCase() || 'U'}
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-semibold text-slate-200 leading-tight capitalize">
              {displayName}
            </p>
            <p className="text-[10px] font-mono text-cyan-400 leading-tight uppercase font-semibold">
              {user?.role || 'operator'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
