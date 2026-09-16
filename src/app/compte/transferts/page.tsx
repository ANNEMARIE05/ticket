'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ClientNavbar from '@/components/layout/ClientNavbar';
import ClientFooter from '@/components/layout/ClientFooter';
import { useApp } from '@/context/AppContext';
import AuthGuard from '@/components/auth/AuthGuard';
import {
  Share2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Phone,
  User,
} from 'lucide-react';

function TransfertsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedTicketId = searchParams.get('ticketId');
  const { tickets, transferTicket, beneficiaries } = useApp();

  const activeTickets = tickets.filter((t) => t.status === 'active');
  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    preselectedTicketId || (activeTickets[0]?.id ?? '')
  );
  const [recipientName, setRecipientName] = useState('Mballa Paul');
  const [recipientPhone, setRecipientPhone] = useState('+237 6 77 55 12 34');
  const [confirmedWarning, setConfirmedWarning] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [successTransfer, setSuccessTransfer] = useState(false);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !recipientName || !recipientPhone || !confirmedWarning) return;

    setIsTransferring(true);
    setTimeout(() => {
      transferTicket(selectedTicketId, recipientName, recipientPhone);
      setIsTransferring(false);
      setSuccessTransfer(true);
      setTimeout(() => {
        router.push('/compte');
      }, 1500);
    }, 1000);
  };

  return (
    <AuthGuard>
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ClientNavbar />

      <main className="flex-1 max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10 w-full">
        <div className="bg-white rounded-xl sm:rounded-3xl p-3.5 sm:p-10 border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-[#0B94D3] flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-black text-[#243A79]">Transférer un billet</h1>
              <p className="text-xs text-slate-500">
                Offrez ou transférez de manière sécurisée votre place à un ami ou membre de votre famille.
              </p>
            </div>
          </div>

          {activeTickets.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl">
              <p className="font-semibold text-sm">Vous n'avez aucun billet actif à transférer.</p>
              <Link href="/catalogue" className="mt-3 inline-block text-xs font-bold text-[#0B94D3] hover:underline">
                Acheter des billets
              </Link>
            </div>
          ) : (
            <form onSubmit={handleTransfer} className="space-y-6">
              
              {/* Select Ticket */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Sélectionner le billet à céder</label>
                <select
                  value={selectedTicketId}
                  onChange={(e) => setSelectedTicketId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B94D3]"
                >
                  {activeTickets.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.ticketNumber} • {t.eventTitle} ({t.categoryName} - {t.seat})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preview selected ticket */}
              {selectedTicket && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{selectedTicket.eventTitle}</span>
                    <span className="text-[#0B94D3]">{selectedTicket.price.toLocaleString()} FCFA</span>
                  </div>
                  <p className="text-slate-500">{selectedTicket.eventDate} • {selectedTicket.venueName}</p>
                  <p className="text-slate-500">{selectedTicket.gate} - {selectedTicket.seat}</p>
                </div>
              )}

              {beneficiaries.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Carnet de bénéficiaires</label>
                  <div className="flex flex-wrap gap-2">
                    {beneficiaries.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setRecipientName(b.name);
                          setRecipientPhone(b.phone);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#0B94D3]"
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nom & Prénom du destinataire</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Ex: Mballa Paul"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B94D3]"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Numéro de téléphone du destinataire</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      placeholder="+237 6 00 00 00 00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B94D3]"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>
              </div>

              {/* Warning Notice */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Avertissement important de sécurité :</p>
                  <p>
                    Dès confirmation, l’ancien QR est <strong>invalidé immédiatement</strong> et un nouveau QR nominatif est généré pour le destinataire. Maximum 1 transfert par billet. Les transferts payants sont interdits. Possible jusqu’au début de l’événement.
                  </p>
                </div>
              </div>

              {/* Checkbox confirmation */}
              <label className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={confirmedWarning}
                  onChange={(e) => setConfirmedWarning(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0B94D3] focus:ring-0"
                />
                <span>Je confirme vouloir transférer définitivement ce billet à cette personne.</span>
              </label>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isTransferring || !confirmedWarning || successTransfer}
                className="w-full py-4 px-6 rounded-2xl bg-[#FFB020] hover:bg-[#e69e1c] disabled:opacity-50 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
              >
                {isTransferring ? (
                  <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : successTransfer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                    <span>Billet Transféré avec Succès !</span>
                  </>
                ) : (
                  <>
                    <span>Valider le Transfert</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </main>

      <ClientFooter />
    </div>
    </AuthGuard>
  );
}

export default function TransfertsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600">Chargement...</div>}>
      <TransfertsContent />
    </Suspense>
  );
}
