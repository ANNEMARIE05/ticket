'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, KeyRound, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function MotDePasseOubliePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [phone, setPhone] = useState('+237 6 99 12 34 56');
  const [otp, setOtp] = useState(['5', '9', '1', '2', '0', '3']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 1) setStep(2);
      else if (step === 2) setStep(3);
      else if (step === 3) setStep(4);
    }, 600);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-slate-950 font-sans">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-sm scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#3a0b1c]/90 via-[#1a0826]/85 to-[#111827]/90 mix-blend-multiply" />

      <div className="relative z-10 w-full max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-white">
        
        {/* Stepper indicator */}
        <div className="flex items-center justify-between mb-8 px-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= i
                    ? 'bg-[#FFB020] text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-white/10 text-slate-400'
                }`}
              >
                {step > i ? '✓' : i}
              </div>
              {i < 4 && (
                <div
                  className={`w-8 sm:w-12 h-1 mx-1 rounded ${
                    step > i ? 'bg-[#FFB020]' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Telephone */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-black text-white mb-2">Récupération</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Saisissez le numéro de téléphone associé à votre compte NGTICKET.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Numéro de téléphone</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0B94D3]"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#FFB020] hover:bg-[#e69e1c] text-slate-950 font-extrabold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              {loading ? 'Envoi du code...' : 'Recevoir le code SMS'}
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-black text-white mb-2">Code de validation</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Saisissez le code SMS reçu au <strong className="text-amber-400">{phone}</strong>.
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {otp.map((d, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={d}
                  onChange={(e) => {
                    const next = [...otp];
                    next[idx] = e.target.value;
                    setOtp(next);
                  }}
                  className="w-10 h-12 text-center text-lg font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#0B94D3] outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#FFB020] hover:bg-[#e69e1c] text-slate-950 font-extrabold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              {loading ? 'Vérification...' : 'Continuer'}
            </button>
          </form>
        )}

        {/* Step 3: Nouveau mot de passe */}
        {step === 3 && (
          <form onSubmit={handleNextStep} className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-black text-white mb-2">Nouveau mot de passe</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Choisissez un mot de passe sécurisé à au moins 8 caractères.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="password"
                required
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#0B94D3] outline-none"
              />
              <input
                type="password"
                required
                placeholder="Confirmer le nouveau mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#0B94D3] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#FFB020] hover:bg-[#e69e1c] text-slate-950 font-extrabold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              {loading ? 'Mise à jour...' : 'Sauvegarder le mot de passe'}
            </button>
          </form>
        )}

        {/* Step 4: Succès */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white">Mot de passe réinitialisé !</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Votre compte est désormais sécurisé avec votre nouveau mot de passe.
            </p>
            <Link
              href="/connexion"
              className="inline-flex w-full py-3.5 rounded-2xl bg-[#FFB020] hover:bg-[#e69e1c] text-slate-950 font-extrabold text-sm uppercase tracking-wider justify-center items-center gap-2"
            >
              <span>Se Connecter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
          <Link href="/connexion" className="text-slate-300 hover:text-white">
            Annuler et retourner à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
