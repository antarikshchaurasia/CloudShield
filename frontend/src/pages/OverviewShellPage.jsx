import React from 'react';
import { Layers } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const OverviewShellPage = () => {
  return (
    <div className="space-y-6">
      <div className="cyber-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Layers size={14} />
            <span>WEEK 1 MILESTONE • FRONTEND ARCHITECTURE SHELL</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            CloudShield Command Center
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Base Vite + React 18 SPA shell, Tailwind cyber design system, responsive layout, and
            FastAPI gateway health verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status="scaffolded" label="Week 1 Active" />
        </div>
      </div>
    </div>
  );
};
