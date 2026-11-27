import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  Shield,
  ShieldAlert,
  UserCheck,
  UserPlus,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEMO_ACCOUNTS = [
  {
    label: 'Admin Demo',
    email: 'admin@cloudshield.local',
    password: 'Admin@123',
    role: 'admin',
    summary: 'Full access: manage resources, approve & execute remediations.',
  },
  {
    label: 'Operator Demo',
    email: 'operator@cloudshield.local',
    password: 'Operator@123',
    role: 'operator',
    summary: 'Read telemetry & resources, triage incidents, submit requests.',
  },
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('admin@cloudshield.local');
  const [password, setPassword] = useState('Admin@123');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('operator');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFillDemo = (account) => {
    setActiveTab('login');
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  const handleInstantDemoLogin = async (account) => {
    setActiveTab('login');
    setEmail(account.email);
    setPassword(account.password);
    setError('');
    setLoading(true);
    try {
      await login(account.email, account.password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          'Demo sign-in failed. Ensure FastAPI backend is running on port 8000.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await register(email.trim(), password, role);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || 'Account registration failed.');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 cyber-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <h1 className="font-heading text-2xl font-bold text-white">CloudShield Authentication</h1>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Role-Based Access Control • Seeded Admin &amp; Operator Accounts
                </p>
              </div>

              <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-1 text-xs font-mono">
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

              {activeTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1.5">
                      Operator / Admin Email
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-2.5 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@cloudshield.local"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3 top-2.5 text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-10 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="w-full btn-cyan py-2.5 font-mono">
                    <span>{loading ? 'Authenticating...' : 'Sign In with JWT'}</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5 font-mono text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="engineer@cloudshield.local"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                      RBAC Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="operator">Operator (View &amp; Request Remediation)</option>
                      <option value="admin">Administrator (Full Approval &amp; Resource Control)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="w-full btn-cyan py-2.5 font-bold">
                    <span>{loading ? 'Creating Account...' : 'Create Account & Sign In'}</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
                1-Click Seeded Demo Accounts
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {DEMO_ACCOUNTS.map((account) => (
                  <div
                    key={account.email}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-2.5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                          <UserCheck size={13} />
                          {account.label}
                        </span>
                        <span className="cyber-badge badge-slate text-[10px]">{account.role}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">{account.email}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{account.summary}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleFillDemo(account)}
                        disabled={loading}
                        className="flex-1 btn-cyber-dark justify-center text-[11px]"
                      >
                        <span>Fill Form</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInstantDemoLogin(account)}
                        disabled={loading}
                        className="flex-1 btn-cyan justify-center text-[11px] py-1.5 px-2.5"
                      >
                        <Zap size={12} />
                        <span>1-Click Sign In</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="cyber-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-heading text-sm font-bold text-white">RBAC Access Matrix</span>
                <span className="cyber-badge badge-cyan text-[10px]">WEEK 2 RBAC</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold">Administrator</span>
                    <CheckCircle2 size={14} className="text-emerald-400" />
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Authorized for GET/POST /api/resources, security approvals, and execution gates.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-400 font-bold">Operator</span>
                    <ShieldAlert size={14} className="text-amber-400" />
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Authorized for read-only inventory &amp; telemetry views; receives HTTP 403 on admin routes.
                  </p>
                </div>
              </div>
            </div>

            <div className="cyber-card p-5 space-y-2 text-xs font-mono">
              <p className="text-slate-300 font-semibold">Backend Verification Endpoints</p>
              <ul className="text-slate-400 space-y-1 text-[11px]">
                <li>• POST /api/auth/login (HS256 JWT)</li>
                <li>• POST /api/auth/register (Bcrypt hash)</li>
                <li>• GET /api/auth/me (Session check)</li>
                <li>• GET /api/resources (RBAC protected)</li>
              </ul>
            </div>
          </div>
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
