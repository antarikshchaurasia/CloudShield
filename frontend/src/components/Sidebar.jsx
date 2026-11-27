import React from 'react';
import { Shield } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside
      style={{
        width: '240px',
        borderRight: '1px solid var(--border-subtle)',
        background: 'var(--bg-sidebar)',
      }}
      className="flex flex-col justify-between p-4 min-h-[calc(100vh-56px)]"
    >
      <div>
        <div className="flex items-center gap-2.5 px-2 py-2 mb-6 border-b border-slate-800/80 pb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/30">
            <Shield size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base text-white tracking-tight">CloudShield</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold">
                v1.0
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">SecOps Command Shell</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
