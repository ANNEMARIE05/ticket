import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail } from 'lucide-react';

export default function ClientFooter() {
  return (
    <footer className="bg-[#0b1224] text-white border-t border-slate-800 pt-8 sm:pt-12 pb-6 sm:pb-8 mt-8 sm:mt-12 font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#243A79] border-2 border-[#0B94D3] rounded-lg flex items-center justify-center text-white font-black font-athletic text-lg sm:text-2xl shadow-md">
                NG
              </div>
              <div className="flex items-baseline">
                <span className="font-athletic text-lg sm:text-2xl font-black text-white tracking-tight">NG</span>
                <span className="font-athletic text-lg sm:text-2xl font-black text-[#0B94D3] tracking-tight">TICKET</span>
                <span className="ml-1 text-[10px] font-black uppercase bg-[#FF4B26] text-white px-1 py-0.2 rounded font-sans">CM</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Plateforme unifiée 100 % cashless pour la billetterie de stade (FECAFOOT) et d’événements culturels au Cameroun. Développé par <strong>NGSER</strong>.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-athletic uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Billets Sécurisés QR Dynamique Certifié
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-athletic text-base font-black uppercase tracking-wider text-[#34B3EC]">Événements</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link href="/catalogue?cat=football" className="hover:text-white transition">Matchs de Football</Link></li>
              <li><Link href="/catalogue?cat=concert" className="hover:text-white transition">Concerts & Shows</Link></li>
              <li><Link href="/catalogue?cat=basketball" className="hover:text-white transition">Basketball</Link></li>
              <li><Link href="/catalogue" className="hover:text-white transition">Tout le programme</Link></li>
            </ul>
          </div>

          {/* Stades & Lieux */}
          <div className="space-y-3">
            <h4 className="font-athletic text-base font-black uppercase tracking-wider text-[#34B3EC]">Stades & Arenas</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><span className="hover:text-white cursor-pointer transition">Stade Ahmadou Ahidjo (42 500 pl.)</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Stade de Japoma (50 000 pl.)</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Stade Roumdé Adjia (Garoua)</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Palais des Sports Yaoundé</span></li>
            </ul>
          </div>

          {/* Contact & Paiements */}
          <div className="space-y-3">
            <h4 className="font-athletic text-base font-black uppercase tracking-wider text-[#34B3EC]">Paiements 100% Mobile</h4>
            <p className="text-[11px] text-slate-400">Règlement instantané sans frais cachés :</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-[11px] font-bold border border-orange-500/30">Orange Money</span>
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded text-[11px] font-bold border border-yellow-500/30">MTN MoMo</span>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[11px] font-bold border border-blue-500/30">3-D Secure</span>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[11px] font-bold border border-blue-500/30">Carte Bancaire</span>
            </div>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+237 2 22 20 22 23</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support-ticket@ngser.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-5 sm:pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-500 gap-3 sm:gap-4 text-center md:text-left">
          <p>© 2026 NGTICKET - Groupe NGSER. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/connexion" className="hover:text-slate-300">Conditions de Vente</Link>
            <Link href="/connexion" className="hover:text-slate-300">Sécurité & Anti-Fraude</Link>
            <Link href="/connexion" className="text-amber-400 hover:underline font-bold font-athletic uppercase">Connexion →</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
