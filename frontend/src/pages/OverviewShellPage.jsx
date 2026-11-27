import React, { useCallback, useEffect, useState } from 'react';
import { Layers, RefreshCw, ServerCog } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { fetchBackendHealth, fetchBackendVersion } from '../services/healthService';

export const OverviewShellPage = () => {
  const [healthState, setHealthState] = useState({
    loading: true,
    ok: false,
    data: null,
    version: null,
    latencyMs: null,
    error: null,
  });

  const checkGateway = useCallback(async () => {
    setHealthState((prev) => ({ ...prev, loading: true }));
    const [healthRes, versionRes] = await Promise.all([
      fetchBackendHealth(),
      fetchBackendVersion(),
    ]);
    setHealthState({
      loading: false,
      ok: healthRes.ok,
      data: healthRes.data,
      version: versionRes.data,
      latencyMs: healthRes.latencyMs,
      error: healthRes.error,
    });
  }, []);

  useEffect(() => {
    checkGateway();
  }, [checkGateway]);

  const badgeStatus = healthState.loading
    ? 'checking'
    : healthState.ok
      ? 'healthy'
      : 'offline';

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
          <StatusBadge status={badgeStatus} label={healthState.ok ? 'API Connected' : undefined} />
        </div>
      </div>

      <div className="cyber-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
              <ServerCog size={20} />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-white">
                FastAPI Gateway Health Probe
              </h2>
              <p className="text-xs font-mono text-slate-400">GET /api/health &amp; GET /api/version</p>
            </div>
          </div>

          <button
            type="button"
            onClick={checkGateway}
            disabled={healthState.loading}
            className="btn-cyan self-start sm:self-auto"
          >
            <RefreshCw size={14} className={healthState.loading ? 'animate-spin' : ''} />
            <span>{healthState.loading ? 'Probing...' : 'Re-check Gateway'}</span>
          </button>
        </div>

        {healthState.ok && healthState.data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <p className="text-slate-500 uppercase text-[10px]">Status</p>
              <p className="text-emerald-400 font-semibold mt-1">{healthState.data.status}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <p className="text-slate-500 uppercase text-[10px]">Service</p>
              <p className="text-slate-200 font-semibold mt-1">{healthState.data.service}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <p className="text-slate-500 uppercase text-[10px]">Version / Env</p>
              <p className="text-cyan-400 font-semibold mt-1">
                v{healthState.version?.version || healthState.data.version} ({healthState.data.environment})
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <p className="text-slate-500 uppercase text-[10px]">Probe Latency</p>
              <p className="text-slate-200 font-semibold mt-1">{healthState.latencyMs} ms</p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 text-xs font-mono space-y-2">
            <p className="text-amber-300">
              {healthState.loading
                ? 'Checking local FastAPI backend at /api/health...'
                : `Backend offline (${healthState.error}). Start the API server to verify live connectivity:`}
            </p>
            {!healthState.loading && (
              <code className="block text-cyan-300 bg-slate-950/90 border border-slate-800 rounded px-3 py-2">
                python -m uvicorn backend.app.main:app --port 8000 --reload
              </code>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
