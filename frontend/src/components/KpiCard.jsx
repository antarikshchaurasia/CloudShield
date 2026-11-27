import React from 'react';

const ACCENT_MAP = {
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

export const KpiCard = ({ title, value, subtitle, trend, icon: Icon, accent = 'cyan' }) => {
  const iconClass = ACCENT_MAP[accent] || ACCENT_MAP.cyan;

  return (
    <div className="cyber-card p-4 sm:p-5 flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${iconClass}`}>
            <Icon size={15} />
          </div>
        )}
      </div>

      <p className="font-heading text-2xl sm:text-3xl font-bold text-white">{value}</p>

      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-400">{subtitle}</span>
        {trend && <span className="text-cyan-400 font-semibold">{trend}</span>}
      </div>
    </div>
  );
};
