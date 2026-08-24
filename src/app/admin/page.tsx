'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import AdminDashboard from '@/components/AdminDashboard';
import { Lock, KeyRound, ArrowLeft } from 'lucide-react';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  return typeof window !== 'undefined' && sessionStorage.getItem('bayu_admin_auth') === 'true';
}

function getServerSnapshot() {
  return false;
}

export default function AdminPage() {
  const isAuthSession = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isAuthForm, setIsAuthForm] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const isAuthenticated = isAuthSession || isAuthForm;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'bayu2026') {
      setIsAuthForm(true);
      sessionStorage.setItem('bayu_admin_auth', 'true');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthForm(false);
    sessionStorage.removeItem('bayu_admin_auth');
    setPasscode('');
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 selection:bg-white selection:text-black">
      <div className="clean-panel rounded-2xl p-8 max-w-md w-full relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white">
              <Lock className="w-4 h-4 text-zinc-300" />
            </div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              ADMIN AUTHENTICATION
            </span>
          </div>
          <Link
            href="/"
            className="text-xs font-mono text-zinc-500 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2 font-serif">
          Bayu Setiaji Admin
        </h1>
        <p className="text-xs text-zinc-400 font-light mb-6">
          Enter your admin passcode to access project management, photos, and video uploads.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
              ADMIN PASSCODE
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                placeholder="Enter passcode (bayu2026)"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white focus:outline-none focus:border-white text-sm font-mono tracking-widest placeholder:text-zinc-600"
              />
              <KeyRound className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3 pointer-events-none" />
            </div>
            {error && (
              <p className="text-xs text-red-400 mt-2 font-mono">
                Incorrect passcode. Try `bayu2026`
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors mt-2"
          >
            Login to Admin Panel
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 text-center">
          Protected Area • Bayu Setiaji Portfolio Studio
        </div>
      </div>
    </main>
  );
}
