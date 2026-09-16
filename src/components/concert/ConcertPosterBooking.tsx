'use client';

import React from 'react';
import { Check, Sparkles, Users } from 'lucide-react';
import { Event, PricingCategory } from '@/types';

interface ConcertPosterBookingProps {
  event: Event;
  selectedCategory: PricingCategory;
  onSelectCategory: (cat: PricingCategory) => void;
}

export default function ConcertPosterBooking({
  event,
  selectedCategory,
  onSelectCategory,
}: ConcertPosterBookingProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2 relative min-h-[320px] md:min-h-[520px] bg-slate-950">
          <img
            src={event.image}
            alt={`Affiche — ${event.title}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4 text-white">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-300 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Affiche officielle
            </span>
            <p className="font-athletic text-lg sm:text-2xl font-black uppercase leading-tight">
              {event.title}
            </p>
            <p className="text-xs text-slate-200 mt-1">
              {event.date} · {event.time} · {event.venueName}
            </p>
          </div>
        </div>

        <div className="md:col-span-3 p-4 sm:p-6 space-y-4">
          <div>
            <h3 className="font-athletic text-lg sm:text-2xl font-black uppercase text-[#243A79] leading-tight">
              Choisissez votre niveau
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              VIP, fosse, pelouse ou gradins — le même show, une expérience différente.
            </p>
          </div>

          <div className="space-y-2.5">
            {event.pricingCategories.map((cat, index) => {
              const selected = selectedCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`w-full text-left rounded-xl border p-3.5 transition flex items-center gap-3 ${
                    selected
                      ? 'border-[#243A79] bg-blue-50/70 ring-2 ring-[#0B94D3]/40'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span
                    className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center text-white font-black text-sm"
                    style={{ backgroundColor: cat.color }}
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-athletic text-sm sm:text-base font-black uppercase text-slate-900 truncate">
                        {cat.name}
                      </span>
                      {selected && <Check className="w-4 h-4 text-[#0B94D3] shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>
                    <p className="text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {cat.availableSeats.toLocaleString()} places libres
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Dès</span>
                    <span className="font-athletic text-lg sm:text-xl font-black text-[#243A79] leading-none">
                      {cat.price.toLocaleString()}
                    </span>
                    <span className="block text-[10px] font-semibold text-slate-500">FCFA</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
