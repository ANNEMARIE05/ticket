'use client';

import React from 'react';
import Link from 'next/link';
import ClientNavbar from '@/components/layout/ClientNavbar';
import ClientFooter from '@/components/layout/ClientFooter';
import BookingStepper from '@/components/layout/BookingStepper';
import { 
  CheckCircle2, 
  Download, 
  Share2, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  ShieldCheck,
  Smartphone,
  Ticket
} from 'lucide-react';

export default function ConfirmationPage() {
  const ticketCode = 'EVT-2026-AHID-8849-10';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${ticketCode}-SIGNED-NGSER`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F5F9] font-sans">
      <ClientNavbar />

      <main className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 w-full space-y-3 sm:space-y-6">
        
        <BookingStepper current={4} />

        {/* Success Banner */}
        <div className="bg-emerald-600 text-white rounded-lg sm:rounded-xl p-3.5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <span className="font-athletic text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-100">
                Paiement Validé • Réf : TX-NGT-89410
              </span>
              <h1 className="font-athletic text-lg sm:text-3xl font-black uppercase tracking-wide leading-tight">
                Commande confirmée
              </h1>
              <p className="text-xs text-emerald-50">
                Un SMS avec le QR dynamique signé a été envoyé au <strong className="text-white">+237 6 99 12 34 56</strong>.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="py-2.5 px-4 rounded-lg bg-white text-emerald-800 font-athletic text-sm font-black uppercase hover:bg-emerald-50 transition flex items-center gap-2 shadow"
            >
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <Link
              href="/compte/transferts"
              className="py-2.5 px-4 rounded-lg bg-emerald-900/40 text-white font-athletic text-sm font-black uppercase hover:bg-emerald-900/60 transition flex items-center gap-2 border border-emerald-400/30"
            >
              <Share2 className="w-4 h-4" />
              <span>Transférer</span>
            </Link>
          </div>
        </div>

        {/* Realistic Physical e-Ticket */}
        <div className="relative bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden max-w-2xl mx-auto">
          
          {/* Ticket Header */}
          <div className="bg-[#243A79] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#FF4B26] flex items-center justify-center font-athletic text-lg font-black text-white">
                NG
              </div>
              <div>
                <span className="font-athletic text-xs font-black uppercase tracking-widest text-[#0B94D3] block">
                  BILLET OFFICIEL DE MATCH
                </span>
                <span className="font-athletic text-base font-black uppercase tracking-wider">
                  NGTICKET STADIUM ACCESS
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-athletic text-xs font-bold uppercase text-slate-300 block">Jauge Tribune</span>
              <span className="px-2 py-0.5 rounded bg-[#FF4B26] text-white font-athletic text-xs font-black uppercase">
                Tribune Honneur Ouest
              </span>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Match Information */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="font-athletic text-xs font-black uppercase text-[#0B94D3]">
                  ÉLIMINATOIRES COUPE DU MONDE • FECAFOOT
                </span>
                <h2 className="font-athletic text-3xl sm:text-4xl font-black uppercase text-[#243A79] tracking-tight leading-none mt-1">
                  Cameroun <span className="text-[#FF4B26]">vs</span> Nigéria
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#0B94D3] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Date & Heure</span>
                    <strong className="text-slate-800 font-athletic text-sm uppercase">14 Oct 2026 • 20h00</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#FF4B26] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Stade</span>
                    <strong className="text-slate-800 font-athletic text-sm uppercase">Ahidjo (Yaoundé)</strong>
                  </div>
                </div>
              </div>

              {/* Seating Details */}
              <div className="grid grid-cols-4 gap-2 text-center bg-slate-900 text-white p-3 rounded-xl font-athletic">
                <div className="border-r border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">PORTE</span>
                  <span className="text-xl font-black text-amber-400">P-04</span>
                </div>
                <div className="border-r border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">BLOC</span>
                  <span className="text-xl font-black text-white">B-12</span>
                </div>
                <div className="border-r border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">RANG</span>
                  <span className="text-xl font-black text-white">R-06</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">SIÈGE</span>
                  <span className="text-xl font-black text-emerald-400">S-42</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Titulaire : <strong className="text-slate-800">Nguemo Jean-Philippe</strong></span>
                <span>Prix : <strong className="text-slate-800 font-athletic text-base">25.000 FCFA</strong></span>
              </div>
            </div>

            {/* QR Code & Barcode */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm mb-2">
                <img
                  src={qrUrl}
                  alt="QR Code Billet Officiel"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <span className="font-mono text-[10px] font-bold text-slate-500 tracking-widest block">
                {ticketCode}
              </span>
              <span className="text-[9px] text-emerald-700 font-bold uppercase mt-1 px-2 py-0.5 bg-emerald-100 rounded-full">
                Prêt pour le Tourniquet
              </span>
            </div>

          </div>

          {/* Ticket Footer Security Ribbon */}
          <div className="bg-slate-100 px-6 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Billet infalsifiable crypté avec clé HMAC NGSER
            </span>
            <span>Présentez la luminosité à 100% au tourniquet</span>
          </div>

        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => alert('Ajout du billet nominatif à Apple Wallet')}
            className="h-11 px-4 rounded-xl bg-black text-white text-xs font-bold"
          >
            Ajouter à Apple Wallet
          </button>
          <button
            type="button"
            onClick={() => alert('Ajout du billet nominatif à Google Wallet')}
            className="h-11 px-4 rounded-xl bg-[#243A79] text-white text-xs font-bold"
          >
            Ajouter à Google Wallet
          </button>
          <span className="text-[11px] text-slate-500 w-full text-center">
            QR dynamique signé · identifiant {ticketCode} · PDF A4 & SMS également disponibles
          </span>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/compte"
            className="w-full sm:w-auto py-3 px-6 rounded-lg bg-[#243A79] hover:bg-[#1A2B59] text-white font-athletic text-base font-black uppercase tracking-wider transition text-center shadow"
          >
            Voir mes billets dans mon espace client
          </Link>
          <Link
            href="/catalogue"
            className="w-full sm:w-auto py-3 px-6 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-athletic text-base font-black uppercase tracking-wider transition text-center"
          >
            Retourner au calendrier des matchs
          </Link>
        </div>

      </main>

      <ClientFooter />
    </div>
  );
}
