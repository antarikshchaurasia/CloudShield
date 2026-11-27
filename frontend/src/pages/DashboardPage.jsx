import React, { useState } from 'react';
import { Activity, AlertTriangle, RotateCw, Server, ShieldCheck } from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
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

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Monitored Resources"
          value="0"
          subtitle="Syncing from /api/resources"
          trend="Week 2 Live"
          icon={Server}
          accent="cyan"
        />
        <KpiCard
          title="Healthy Endpoints"
          value="0"
          subtitle="Verified active targets"
          trend="100% Target"
          icon={Activity}
          accent="emerald"
        />
        <KpiCard
          title="Degraded Targets"
          value="0"
          subtitle="Requires Week 3 scan/triage"
          trend="Policy Watch"
          icon={AlertTriangle}
          accent="amber"
        />
        <KpiCard
          title="RBAC Posture"
          value="JWT"
          subtitle="Authenticated session active"
          trend="HS256"
          icon={ShieldCheck}
          accent="indigo"
        />
      </section>
    </div>
  );
};
