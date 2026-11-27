import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const DashboardPage = () => {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Security Operations Overview
            </h1>
            <StatusBadge status="healthy" label="Week 2 Dashboard" size="xs" />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Authenticated dashboard layout with live backend resource inventory and KPI summary cards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRefreshing((prev) => !prev)}
          className="btn-cyber-dark self-start sm:self-auto"
        >
          <RotateCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span>Refresh Dashboard</span>
        </button>
      </div>
    </div>
  );
};
