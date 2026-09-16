'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ClientNavbar from '@/components/layout/ClientNavbar';
import ClientFooter from '@/components/layout/ClientFooter';
import BookingStepper from '@/components/layout/BookingStepper';
import { useApp } from '@/context/AppContext';
import { 
  ShoppingBag, 
  Trash2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Phone, 
  Ticket
} from 'lucide-react';

export default function PanierPage() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart, cartTotal, cartFees, cartCountdown, user } = useApp();
  const [holderMode, setHolderMode] = useState<'self' | 'other'>('self');
  const [beneficiaryName, setBeneficiaryName] = useState(user.name);
  const [beneficiaryPhone, setBeneficiaryPhone] = useState(user.phone);

  const goCheckout = () => {
    if (!user.isLoggedIn) {
      router.push('/connexion?next=/paiement');
      return;
    }
    router.push('/paiement');
  };

  const minutes = Math.floor(cartCountdown / 60);
  const seconds = cartCountdown % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const grandTotal = cartTotal + cartFees;

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F5F9] font-sans">
      <ClientNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 w-full space-y-3 sm:space-y-6 pb-24 lg:pb-6">
        
        <BookingStepper current={2} />

        {/* 10-Minute Countdown Banner */}
        {cart.length > 0 && (
          <div className="bg-[#0b1224] text-white border border-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center justify-between gap-2 shadow-md">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#FF4B26] flex items-center justify-center text-white shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-athletic text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-400">
                  Réservation garantie
                </p>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium truncate">Places bloquées pendant :</p>
              </div>
            </div>
            <div className="font-athletic text-lg sm:text-3xl font-black bg-slate-900 border border-slate-700 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg tracking-widest text-amber-400 shrink-0">
              {timeFormatted}
            </div>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-10 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-4 sm:my-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-athletic text-lg sm:text-2xl font-black uppercase text-[#243A79]">Votre panier est vide</h2>
              <p className="text-xs text-slate-500 mt-1">
                Explorez nos matchs de gala et grands concerts pour choisir vos places.
              </p>
            </div>
            <Link
              href="/catalogue"
              className="inline-block py-3 px-6 rounded-lg bg-[#243A79] hover:bg-[#1A2B59] text-white font-athletic text-base font-black uppercase tracking-wider transition"
            >
              Consulter le calendrier
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Cart Items & Beneficiary */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="bg-white rounded-lg sm:rounded-xl p-3.5 sm:p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 gap-2">
                  <h2 className="font-athletic text-sm sm:text-xl font-black uppercase text-[#243A79]">
                    Places ({cart.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="font-athletic text-xs font-bold uppercase text-rose-500 hover:underline"
                  >
                    Vider le panier
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.categoryId}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200 gap-3"
                  >
                    <div>
                      <span className="font-athletic text-xs font-black uppercase text-[#0B94D3]">
                        {item.eventDate} • {item.venueName}
                      </span>
                      <h4 className="font-athletic text-sm sm:text-xl font-black uppercase text-[#243A79] leading-tight">
                        {item.eventTitle}
                      </h4>
                      <p className="text-xs text-slate-600 font-semibold mt-0.5">
                        {item.categoryName} — <strong className="text-slate-900">Quantité : {item.quantity} place(s)</strong>
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <div className="text-right">
                        <span className="font-athletic text-lg sm:text-2xl font-black text-[#243A79] leading-none block">
                          {(item.price * item.quantity).toLocaleString()} <span className="text-xs font-sans font-bold">F</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.price.toLocaleString()} F / billet
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.categoryId)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded hover:bg-white transition"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Beneficiary Form — nomination obligatoire (CDC Module 4) */}
              <div className="bg-white rounded-lg sm:rounded-xl p-3.5 sm:p-5 border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-athletic text-sm sm:text-lg font-black uppercase text-[#243A79]">
                  Nomination des porteurs
                </h3>
                <p className="text-xs text-slate-500">
                  Chaque billet est nominatif. Désignez le bénéficiaire : vous-même ou un tiers.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHolderMode('self');
                      setBeneficiaryName(user.name);
                      setBeneficiaryPhone(user.phone);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                      holderMode === 'self'
                        ? 'bg-[#243A79] text-white border-[#243A79]'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    Moi-même
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHolderMode('other');
                      setBeneficiaryName('');
                      setBeneficiaryPhone('+237 6 ');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                      holderMode === 'other'
                        ? 'bg-[#243A79] text-white border-[#243A79]'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    Un proche (tiers)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="font-athletic text-xs font-black uppercase text-slate-700">Nom & Prénom</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={beneficiaryName}
                        onChange={(e) => setBeneficiaryName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0B94D3]"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-athletic text-xs font-black uppercase text-slate-700">Téléphone (SMS e-billet)</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={beneficiaryPhone}
                        onChange={(e) => setBeneficiaryPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0B94D3]"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Checkout Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-lg sm:rounded-xl p-3.5 sm:p-5 border border-slate-200 shadow-sm space-y-4 lg:sticky lg:top-28">
                <h3 className="font-athletic text-sm sm:text-xl font-black uppercase text-[#243A79]">
                  Récapitulatif
                </h3>

                <div className="space-y-2 text-xs border-b border-slate-100 pb-3">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Sous-total places</span>
                    <span className="font-bold text-slate-900">{cartTotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Frais de service (2%)</span>
                    <span className="font-bold text-slate-900">{cartFees.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Délivrance SMS & QR</span>
                    <span className="font-bold text-emerald-600">OFFERT</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-athletic text-base font-bold uppercase text-slate-700">Total Net</span>
                  <span className="font-athletic text-xl sm:text-3xl font-black text-[#243A79] leading-none">
                    {grandTotal.toLocaleString()} <span className="text-xs font-sans font-bold text-slate-500">FCFA</span>
                  </span>
                </div>

                <button
                  onClick={goCheckout}
                  className="hidden sm:flex w-full py-3.5 px-4 rounded-lg bg-[#FF4B26] hover:bg-[#e03d1a] active:scale-95 text-white font-athletic text-xl font-black uppercase tracking-wider transition shadow-lg items-center justify-center gap-2"
                >
                  <span>Passer au Paiement Sécurisé</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-tight">
                    Transactions protégées par la passerelle de paiement certifiée NGSER.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      {cart.length > 0 && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-3 shadow-[0_-6px_20px_rgba(15,23,42,0.08)]">
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">Total</p>
            <p className="text-base font-black text-[#243A79] leading-none">{grandTotal.toLocaleString()} F</p>
          </div>
          <button
            onClick={goCheckout}
            className="h-11 px-4 rounded-md bg-[#FF4B26] text-white text-sm font-black uppercase flex items-center gap-1.5"
          >
            Payer
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <ClientFooter />
    </div>
  );
}
