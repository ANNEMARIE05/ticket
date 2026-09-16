'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

function VerificationOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const { login } = useApp();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setSuccess(true);
      login(phone || email, { name, email, phone });
      setTimeout(() => {
        router.push('/compte');
      }, 1000);
    }, 800);
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

      <div className="relative z-10 w-full max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-white text-center">
        
        <div className="w-16 h-16 rounded-2xl bg-[#0B94D3]/20 border border-[#0B94D3]/40 flex items-center justify-center mx-auto mb-5 text-[#0B94D3]">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-black text-white mb-2">Vérifiez votre numéro</h1>
        <p className="text-xs sm:text-sm text-slate-300 mb-2">
          Un code secret à 6 chiffres a été envoyé par SMS au :
        </p>
        <p className="font-bold text-amber-400 text-sm tracking-wider mb-6">
          {phone}
        </p>

        {/* 6 OTP Inputs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputsRef.current[idx] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-black text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B94D3] focus:border-[#0B94D3] transition"
            />
          ))}
        </div>

        {/* Countdown */}
        <div className="text-xs text-slate-400 mb-6 flex items-center justify-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          {timer > 0 ? (
            <span>Renvoyer le code dans <strong className="text-white font-bold">{timer}s</strong></span>
          ) : (
            <button
              onClick={() => setTimer(60)}
              className="text-amber-400 font-bold hover:underline"
            >
              Renvoyer le code maintenant
            </button>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleVerify}
          disabled={isVerifying || success}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#FFB020] hover:bg-[#e69e1c] text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : success ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-800" />
              <span>Numéro Vérifié !</span>
            </>
          ) : (
            <>
              <span>Valider le code OTP</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
          <Link href="/connexion" className="text-slate-300 hover:text-white">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerificationOTPPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Chargement...</div>}>
      <VerificationOTPContent />
    </Suspense>
  );
}
