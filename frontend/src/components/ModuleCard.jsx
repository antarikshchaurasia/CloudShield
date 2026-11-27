import React from 'react';
import { StatusBadge } from './StatusBadge';

export const ModuleCard = ({ icon: Icon, title, owner, milestone, status = 'planned', description }) => {
  return (
    <div className="cyber-card p-5 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center text-cyan-400">
            {Icon && <Icon size={20} />}
          </div>
          <StatusBadge status={status} size="xs" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-base text-white">{title}</h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>{owner}</span>
        <span className="text-cyan-400">{milestone}</span>
      </div>
    </div>
  );
};
