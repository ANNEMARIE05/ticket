'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useApp();
  const nextPath = searchParams.get('next') || '/compte';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Indiquez votre numéro ou e-mail, puis votre mot de passe.');
      return;
    }
    if (failedAttempts >= 5 && !captchaChecked) {
      setError('Cochez la vérification anti-robot après 5 échecs.');
      return;
    }
    setLoading(true);
    setError('');

    const delay = Math.min(600 + failedAttempts * 400, 2600);
    setTimeout(() => {
      const ok = password.length >= 6;
      if (!ok) {
        setFailedAttempts((n) => n + 1);
        setLoading(false);
        setError('Identifiants incorrects. Temporisation progressive activée.');
        return;
      }
      login(identifier);
      setLoading(false);
      setFailedAttempts(0);
      router.push(nextPath.startsWith('/') ? nextPath : '/compte');
    }, delay);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-slate-950 overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-sm scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#3a0b1c]/90 via-[#1a0826]/85 to-[#111827]/90 mix-blend-multiply" />

      <div className="relative z-10 w-full max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl text-white">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#243A79] to-[#0B94D3] flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              NG
            </div>
            <div className="text-left">
              <span className="text-lg font-black tracking-tight leading-none block">
                NG<span className="text-[#38BDF8]">TICKET</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Matchs & concerts
              </span>
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Bon retour</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
            Connectez-vous pour réserver vos places et retrouver vos e-billets.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-100 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Téléphone ou e-mail</label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="+237 6 00 00 00 00"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFB020]/70"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Mot de passe</label>
              <Link href="/mot-de-passe-oublie" className="text-[11px] font-medium text-amber-300 hover:text-amber-200">
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-3 pr-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFB020]/70"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition"
                aria-label="Afficher ou masquer le mot de passe"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-amber-400 focus:ring-0"
            />
            Rester connecté 24 h sur le web
          </label>

          {failedAttempts >= 5 && (
            <label className="flex items-center gap-2 cursor-pointer text-xs text-amber-200 bg-amber-500/10 border border-amber-400/30 rounded-xl px-3 py-2">
              <input
                type="checkbox"
                checked={captchaChecked}
                onChange={(e) => setCaptchaChecked(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-amber-400 focus:ring-0"
              />
              Je ne suis pas un robot (Captcha après 5 échecs)
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-3.5 px-6 rounded-2xl bg-[#FFB020] hover:bg-[#e69e1c] text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-slate-300">
          <p>
            Pas encore de compte ?{' '}
            <Link href="/inscription" className="font-bold text-amber-400 hover:text-amber-300 underline">
              Créer un compte
            </Link>
          </p>
          <Link href="/" className="inline-block mt-3 text-slate-400 hover:text-white transition">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <LoginContent />
    </Suspense>
  );
}
