'use client';

import React from 'react';

const STEPS = [
  { n: 1, short: 'Places', full: 'Choix des places' },
  { n: 2, short: 'Panier', full: 'Panier' },
  { n: 3, short: 'Payer', full: 'Paiement' },
  { n: 4, short: 'QR', full: 'Billet QR' },
] as const;

export default function BookingStepper({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <nav
      className="bg-white px-2 py-2 sm:p-3.5 rounded-lg sm:rounded-xl border border-slate-200 shadow-sm"
      aria-label="Étapes de réservation"
    >
      <ol className="flex items-center justify-between gap-0.5 max-w-2xl mx-auto">
        {STEPS.map((step, i) => {
          const done = step.n < current;
          const active = step.n === current;
          return (
            <li key={step.n} className="flex items-center flex-1 min-w-0 last:flex-none">
              <div
                className={`flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 min-w-0 ${
                  done ? 'text-emerald-600' : active ? 'text-[#0B94D3]' : 'text-slate-400'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded text-[11px] font-black flex items-center justify-center shrink-0 ${
                    done
                      ? 'bg-emerald-600 text-white'
                      : active
                      ? 'bg-[#0B94D3] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {done ? '✓' : step.n}
                </span>
                <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase leading-tight text-center sm:text-left truncate max-w-[52px] sm:max-w-none">
                  <span className="sm:hidden">{step.short}</span>
                  <span className="hidden sm:inline">{step.full}</span>
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 sm:mx-2 min-w-[8px] ${
                    step.n < current ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
