import React, { useState } from 'react';
import { KeyRound, Lock, Shield, UserPlus } from 'lucide-react';

export const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Shield size={16} />
          </div>
          <span className="font-heading font-bold text-sm tracking-tight text-white">
            CLOUDSHIELD <span className="text-slate-400 font-mono text-xs">v2.0</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="pulse-emerald" />
          <span>JWT AUTH GATEWAY</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl cyber-card p-6 sm:p-8 space-y-5">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">CloudShield Authentication</h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Role-Based Access Control • Admin &amp; Operator Workspaces
            </p>
          </div>

          <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-1 text-xs font-mono max-w-sm">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound size={13} />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus size={13} />
              <span>Register</span>
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs font-mono">
              {error}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/80 px-6 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>CloudShield SecOps Gateway</span>
        <span className="flex items-center gap-1.5 text-slate-400">
          <Lock size={12} className="text-emerald-400" />
          HS256 JWT + Bcrypt Auth
        </span>
      </footer>
    </div>
  );
};
