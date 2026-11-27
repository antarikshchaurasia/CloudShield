import React, { useCallback, useEffect, useState } from 'react';
import { Activity, AlertTriangle, RotateCw, Server, ShieldCheck } from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { StatusBadge } from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { resourcesApi, systemApi } from '../services/api';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = useCallback(async () => {
    try {
      const [healthData, resourceList] = await Promise.all([
        systemApi.getHealth(),
        resourcesApi.list(),
      ]);
      setHealth(healthData);
      setResources(Array.isArray(resourceList) ? resourceList : []);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const healthyCount = resources.filter((r) => r.status === 'healthy').length;
  const degradedCount = resources.filter((r) => r.status !== 'healthy').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Security Operations Overview
            </h1>
            <StatusBadge
              status={health?.status === 'healthy' ? 'healthy' : 'checking'}
              label={health?.status === 'healthy' ? 'API Operational' : 'Connecting...'}
              size="xs"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Authenticated dashboard layout with live backend resource inventory and KPI summary cards.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="btn-cyber-dark self-start sm:self-auto"
        >
          <RotateCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh Dashboard'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-bold">
            SESSION ACTIVE
          </span>
          <span>
            USER: <strong className="text-slate-200">{user?.email}</strong>
          </span>
          <span className="text-slate-700">/</span>
          <span>
            GATEWAY: <strong className="text-cyan-400">{health?.service || 'CloudShield'} v{health?.version || '1.0.0'}</strong>
          </span>
        </div>
        <span className="text-emerald-400">
          {user?.role === 'admin'
            ? 'Admin Clearance: Resource Write & Approvals Enabled'
            : 'Operator Clearance: Read-Only Inventory Access'}
        </span>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Monitored Resources"
          value={resources.length}
          subtitle="Loaded from GET /api/resources"
          trend="Live DB"
          icon={Server}
          accent="cyan"
          loading={loading}
        />
        <KpiCard
          title="Healthy Endpoints"
          value={healthyCount}
          subtitle={`${healthyCount} of ${resources.length} targets nominal`}
          trend="Nominal"
          icon={Activity}
          accent="emerald"
          loading={loading}
        />
        <KpiCard
          title="Degraded Targets"
          value={degradedCount}
          subtitle="Flagged in initial inventory"
          trend={degradedCount > 0 ? 'Attention' : 'Clear'}
          icon={AlertTriangle}
          accent={degradedCount > 0 ? 'amber' : 'emerald'}
          loading={loading}
        />
        <KpiCard
          title="Active RBAC Role"
          value={(user?.role || 'operator').toUpperCase()}
          subtitle={user?.email || 'Authenticated Session'}
          trend="JWT Verified"
          icon={ShieldCheck}
          accent="indigo"
          loading={loading}
        />
      </section>
      <section className="cyber-card overflow-hidden">
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-heading text-lg font-semibold text-white">
              Registered Infrastructure Resources
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Seeded targets served via JWT-protected GET /api/resources
            </p>
          </div>
          <span className="cyber-badge badge-cyan">{resources.length} TOTAL</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 font-mono text-[11px] uppercase text-slate-400">
                <th className="py-3 px-4">Resource Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Endpoint / Path</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((res) => (
                <tr
                  key={res.id}
                  className="border-b border-slate-800/60 hover:bg-slate-900/40 transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-white">{res.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{res.resource_type}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{res.endpoint_or_path}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={res.status} size="xs" />
                  </td>
                </tr>
              ))}
              {!loading && resources.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 px-4 text-center font-mono text-slate-500">
                    No monitored resources found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="cyber-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-white">
              Week 2 Authentication &amp; Dashboard Complete
            </h3>
            <StatusBadge status="healthy" label="Verified" size="xs" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            JWT Bearer token interception, persistent AuthContext session check, 1-click Admin/Operator
            demo login, and live KPI summary cards are wired to the FastAPI backend.
          </p>
        </div>

        <div className="cyber-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-white">
              Next Milestone: Week 3 SecOps Modules
            </h3>
            <StatusBadge status="planned" label="Week 3" size="xs" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Incident triage workflows, OWASP security findings inspector, and allowlisted remediation
            approval modals will integrate in Week 3 once backend scanner and incident APIs land.
          </p>
        </div>
      </section>
    </div>
  );
};
