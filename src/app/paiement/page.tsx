'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientNavbar from '@/components/layout/ClientNavbar';
import ClientFooter from '@/components/layout/ClientFooter';
import BookingStepper from '@/components/layout/BookingStepper';
import { useApp } from '@/context/AppContext';
import AuthGuard from '@/components/auth/AuthGuard';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Lock, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function PaiementPage() {
  const router = useRouter();
  const { cartTotal, cartFees, clearCart, user } = useApp();
  const grandTotal = (cartTotal > 0 ? cartTotal : 0) + (cartFees > 0 ? cartFees : 0);

  const [paymentMethod, setPaymentMethod] = useState<'orange_money' | 'mtn_momo' | 'card'>('orange_money');
  const [phonePayment, setPhonePayment] = useState(user.phone);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push('/confirmation');
    }, 1200);
  };

  return (
    <AuthGuard>
    <div className="min-h-screen flex flex-col bg-[#F3F5F9] font-sans">
      <ClientNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 w-full space-y-3 sm:space-y-6">
        
        <BookingStepper current={3} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6">
          
          {/* Main Payment Section */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-lg sm:rounded-xl p-3.5 sm:p-6 border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
              
              <div>
                <h2 className="font-athletic text-base sm:text-2xl font-black uppercase text-[#243A79]">
                  Moyen de paiement
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Tous les paiements sont certifiés et immédiatement validés par la passerelle sécurisée NGSER.
                </p>
              </div>

              {/* Payment Tabs / Radio Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                
                {/* Orange Money */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('orange_money')}
                  className={`p-3 rounded-lg border text-left transition flex flex-col justify-between h-24 ${
                    paymentMethod === 'orange_money'
                      ? 'border-[#FF7900] bg-orange-50/50 ring-2 ring-[#FF7900]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="w-6 h-6 rounded-md bg-[#FF7900] text-white flex items-center justify-center font-athletic font-black text-xs">
                      OM
                    </span>
                    {paymentMethod === 'orange_money' && (
                      <CheckCircle2 className="w-4 h-4 text-[#FF7900]" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-athletic text-sm font-black uppercase text-slate-900 leading-tight">Orange Money</h4>
                    <span className="text-[10px] text-slate-500 font-medium">Cameroun · Push USSD</span>
                  </div>
                </button>

                {/* MTN MoMo */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mtn_momo')}
                  className={`p-3 rounded-lg border text-left transition flex flex-col justify-between h-24 ${
                    paymentMethod === 'mtn_momo'
                      ? 'border-[#FFCC00] bg-amber-50/50 ring-2 ring-[#FFCC00]/40'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="w-6 h-6 rounded-md bg-[#FFCC00] text-slate-900 flex items-center justify-center font-athletic font-black text-xs">
                      MTN
                    </span>
                    {paymentMethod === 'mtn_momo' && (
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-athletic text-sm font-black uppercase text-slate-900 leading-tight">MTN MoMo</h4>
                    <span className="text-[10px] text-slate-500 font-medium">Cameroun · PIN 90s</span>
                  </div>
                </button>

                {/* Carte Bancaire */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left transition flex flex-col justify-between h-24 ${
                    paymentMethod === 'card'
                      ? 'border-[#243A79] bg-blue-50/50 ring-2 ring-[#243A79]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="w-6 h-6 rounded-md bg-[#243A79] text-white flex items-center justify-center font-athletic font-black text-xs">
                      <CreditCard className="w-3.5 h-3.5" />
                    </span>
                    {paymentMethod === 'card' && (
                      <CheckCircle2 className="w-4 h-4 text-[#243A79]" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-athletic text-sm font-black uppercase text-slate-900 leading-tight">Carte Bancaire</h4>
                    <span className="text-[10px] text-slate-500 font-medium">Visa / MC · 3-D Secure</span>
                  </div>
                </button>

              </div>

              {/* Form details based on selection */}
              <form onSubmit={handlePay} className="space-y-4 pt-2">
                
                {paymentMethod !== 'card' ? (
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#0B94D3]" />
                      <span className="font-athletic text-sm font-black uppercase text-[#243A79]">
                        Validation sur votre Téléphone Mobile
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="font-athletic text-xs font-black uppercase text-slate-700">
                        Numéro de compte {paymentMethod === 'orange_money' ? 'Orange Money' : 'MTN MoMo'}
                      </label>
                      <input
                        type="tel"
                        value={phonePayment}
                        onChange={(e) => setPhonePayment(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0B94D3]"
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 leading-normal">
                      Un push USSD / API opérateur vous demandera de confirmer par code PIN en moins de 90 secondes. Double journalisation (ID interne + référence opérateur).
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#243A79]" />
                      <span className="font-athletic text-sm font-black uppercase text-[#243A79]">
                        Carte Visa / Mastercard · 3-D Secure
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="font-athletic text-xs font-black uppercase text-slate-700">Numéro de Carte</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0B94D3]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-athletic text-xs font-black uppercase text-slate-700">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/AA"
                          required
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0B94D3]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-athletic text-xs font-black uppercase text-slate-700">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={3}
                          required
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0B94D3]"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Vous serez redirigé vers l’authentification 3-D Secure de votre banque. Traçabilité : ID interne + référence bancaire.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-lg bg-[#FF4B26] hover:bg-[#e03d1a] text-white font-athletic text-xl font-black uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Connexion Opérateur & Débit Sécurisé...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirmer et Payer {grandTotal.toLocaleString()} FCFA</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

          {/* Order Summary on Right */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4 sticky top-28">
              <h3 className="font-athletic text-xl font-black uppercase text-[#243A79]">
                Détail Règlement
              </h3>

              <div className="space-y-2 text-xs border-b border-slate-100 pb-3">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Montant de la commande</span>
                  <span className="font-bold text-slate-900">{grandTotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Opérateur sélectionné</span>
                  <span className="font-bold text-[#FF4B26] uppercase font-athletic text-sm">
                    {paymentMethod === 'orange_money' ? 'Orange Money CM' : paymentMethod === 'mtn_momo' ? 'MTN Mobile Money' : 'Carte 3-D Secure'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Génération e-billet</span>
                  <span className="font-bold text-emerald-600 uppercase font-athletic text-xs">Immédiate</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-[11px] text-emerald-800 font-medium leading-tight">
                  Conformité PCI-DSS. Authentification 3-D Secure hébergée par la banque partenaire NGSER.
                </span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <ClientFooter />
    </div>
    </AuthGuard>
  );
}
