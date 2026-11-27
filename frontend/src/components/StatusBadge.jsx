import React from 'react';

export const StatusBadge = ({ status = 'unknown', label, size = 'sm' }) => {
  const norm = String(status).toLowerCase();

  let colorClasses = 'bg-slate-800/80 text-slate-300 border-slate-700';
  let dotColor = '#94a3b8';

  if (['healthy', 'resolved', 'succeeded', 'success', 'online'].includes(norm)) {
    colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    dotColor = '#10b981';
  }

  const padding = size === 'xs' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium capitalize ${colorClasses} ${padding}`}
    >
      <span className="pulse-dot" style={{ backgroundColor: dotColor }} />
      {label || status}
    </span>
  );
};
