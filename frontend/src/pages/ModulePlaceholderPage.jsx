import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const ModulePlaceholderPage = ({
  title,
  description,
  milestone = 'Week 2–4',
  owner = 'Frontend & Platform Stream',
}) => {
  return (
    <div className="cyber-card p-6 sm:p-8 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
            <Compass size={22} />
          </div>
          <div>
            <p className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              {owner} • {milestone}
            </p>
            <h1 className="font-heading text-2xl font-bold text-white">{title}</h1>
          </div>
        </div>

        <StatusBadge status="planned" label={`Scheduled: ${milestone}`} />
      </div>

      <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">{description}</p>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs font-mono text-slate-500">
          Route verified inside Week 1 responsive AppShell navigation hierarchy.
        </span>
        <Link to="/" className="btn-cyber-dark">
          <ArrowLeft size={14} />
          <span>Back to Overview Shell</span>
        </Link>
      </div>
    </div>
  );
};
