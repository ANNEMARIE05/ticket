'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ClientNavbar from '@/components/layout/ClientNavbar';
import ClientFooter from '@/components/layout/ClientFooter';
import { useApp } from '@/context/AppContext';
import { 
  Ticket as TicketIcon, 
  ShoppingBag, 
  Share2, 
  User, 
  Download, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  QrCode,
  LogOut,
  Pencil,
  Check
} from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

type CompteTab = 'billets' | 'commandes' | 'profil';

export default function ComptePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, tickets, orders, logout, updateProfile, beneficiaries } = useApp();
  const [activeTab, setActiveTab] = useState<CompteTab>('billets');
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [ticketFilter, setTicketFilter] = useState<'active' | 'used' | 'expired' | 'transferred'>('active');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'profil' || tab === 'commandes' || tab === 'billets') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    setForm({ name: user.name, phone: user.phone, email: user.email });
  }, [user.name, user.phone, user.email]);

  const startEdit = () => {
    setForm({ name: user.name, phone: user.phone, email: user.email });
    setFormError('');
    setSaved(false);
    setEditing(true);
  };

  const cancelEdit = () => {
    setForm({ name: user.name, phone: user.phone, email: user.email });
    setFormError('');
    setEditing(false);
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    if (!name) {
      setFormError('Le nom complet est obligatoire.');
      return;
    }
    if (!phone && !email) {
      setFormError('Indiquez au moins un téléphone ou un e-mail.');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('L’adresse e-mail n’est pas valide.');
      return;
    }
    setFormError('');
    setSaving(true);
    setTimeout(() => {
      updateProfile({ name, phone, email });
      setSaving(false);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  const filteredTickets = tickets.filter((t) => t.status === ticketFilter);

  return (
    <AuthGuard>
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ClientNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
        
        {/* User Profile Header Card */}
        <div className="bg-white rounded-xl sm:rounded-3xl p-3.5 sm:p-8 border border-slate-200 shadow-sm mb-4 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover ring-4 ring-blue-50 shadow-md shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-2xl font-black text-[#243A79]">{user.name}</h1>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Compte Vérifié
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{user.phone} • {user.email}</p>
              <p className="text-xs text-slate-400 mt-2">Membre NGTICKET depuis Janvier 2026</p>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setLogoutOpen(true)}
              className="flex-1 sm:flex-none justify-center py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition flex items-center gap-1.5 border border-slate-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
            <Link
              href="/compte/transferts"
              className="flex-1 sm:flex-none justify-center py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0B94D3] font-bold text-xs transition flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Transférer</span>
            </Link>
            <Link
              href="/catalogue"
              className="flex-1 sm:flex-none justify-center py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-[#243A79] hover:bg-[#1A2B59] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Acheter</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-4 sm:mb-6 gap-3 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('billets')}
            className={`pb-3 text-sm font-bold transition relative ${
              activeTab === 'billets'
                ? 'text-[#0B94D3] border-b-2 border-[#0B94D3]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="whitespace-nowrap">Billets ({tickets.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('commandes')}
            className={`pb-3 text-sm font-bold transition relative ${
              activeTab === 'commandes'
                ? 'text-[#0B94D3] border-b-2 border-[#0B94D3]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="whitespace-nowrap">Commandes ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profil')}
            className={`pb-3 text-sm font-bold transition relative whitespace-nowrap ${
              activeTab === 'profil'
                ? 'text-[#0B94D3] border-b-2 border-[#0B94D3]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ⚙️ Paramètres du Profil
          </button>
        </div>

        {/* Tab 1: Billets */}
        {activeTab === 'billets' && (
          <div className="space-y-6">
            
            {/* Filter pills for tickets */}
            <div className="flex gap-2 flex-wrap">
              {([
                { id: 'active', label: 'Actifs' },
                { id: 'used', label: 'Utilisés' },
                { id: 'expired', label: 'Expirés' },
                { id: 'transferred', label: 'Transférés' },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTicketFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    ticketFilter === tab.id
                      ? 'bg-[#243A79] text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Ticket Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
                        {tkt.ticketNumber}
                      </span>
                      <span
                        className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full ${
                          tkt.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : tkt.status === 'transferred'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tkt.status === 'active' ? '● Valide' : tkt.status === 'transferred' ? 'Transféré' : tkt.status === 'expired' ? 'Expiré' : 'Utilisé'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#243A79]">{tkt.eventTitle}</h3>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 my-4 bg-slate-50 p-3 rounded-2xl">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Date & Heure</span>
                        <span className="font-semibold text-slate-800">{tkt.eventDate} • {tkt.eventTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Lieu</span>
                        <span className="font-semibold text-slate-800">{tkt.venueName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Catégorie</span>
                        <span className="font-semibold text-[#0B94D3]">{tkt.categoryName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Porte & Siège</span>
                        <span className="font-semibold text-slate-800">{tkt.gate} - {tkt.seat}</span>
                      </div>
                    </div>

                    {tkt.status === 'transferred' && tkt.transferredTo && (
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 mb-2">
                        Billet transféré à : <strong>{tkt.transferredTo.name}</strong> ({tkt.transferredTo.phone}) le {tkt.transferredTo.date}
                      </div>
                    )}
                  </div>

                  {/* QR Code section & footer */}
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={tkt.qrCodeUrl}
                        alt="QR Code"
                        className="w-12 h-12 rounded-lg bg-white p-1 border border-slate-200"
                      />
                      <span className="text-xs text-slate-500 font-semibold">Présentez à la borne</span>
                    </div>

                    <div className="flex gap-2">
                      {tkt.status === 'active' && (tkt.transferCount ?? 0) < 1 && (
                        <Link
                          href={`/compte/transferts?ticketId=${tkt.id}`}
                          className="py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                        >
                          Transférer
                        </Link>
                      )}
                      <button
                        onClick={() => alert(`Téléchargement du billet PDF ${tkt.ticketNumber}`)}
                        className="py-1.5 px-3 rounded-xl bg-[#243A79] text-white text-xs font-bold hover:bg-[#1A2B59] transition flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 2: Commandes */}
        {activeTab === 'commandes' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">N° Commande</th>
                    <th className="p-4">Événement</th>
                    <th className="p-4">Places</th>
                    <th className="p-4">Montant Total</th>
                    <th className="p-4">Moyen de paiement</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono font-bold text-slate-800">{ord.orderNumber}</td>
                      <td className="p-4 font-bold text-[#243A79]">{ord.eventTitle}</td>
                      <td className="p-4">{ord.ticketsCount} billet(s)</td>
                      <td className="p-4 font-black text-slate-900">{ord.totalAmount.toLocaleString()} FCFA</td>
                      <td className="p-4 uppercase font-semibold text-slate-600">{ord.paymentMethod.replace('_', ' ')}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {ord.status === 'paid' ? 'Payée' : ord.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => alert(`Téléchargement de la facture ${ord.orderNumber}`)}
                          className="text-[#0B94D3] font-bold hover:underline"
                        >
                          Facture PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Profil */}
        {activeTab === 'profil' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-[#243A79]">Informations personnelles</h3>
              {!editing && (
                <button
                  type="button"
                  onClick={startEdit}
                  className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Modifier
                </button>
              )}
            </div>
            {saved && (
              <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Informations mises à jour.
              </p>
            )}
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-500 font-semibold block mb-1">Nom complet</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className={`w-full border rounded-xl p-2.5 text-slate-800 font-medium ${
                      editing
                        ? 'bg-white border-slate-300 focus:outline-none focus:border-[#0B94D3]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-slate-500 font-semibold block mb-1">Téléphone</label>
                  <input
                    type="tel"
                    disabled={!editing}
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className={`w-full border rounded-xl p-2.5 text-slate-800 font-medium ${
                      editing
                        ? 'bg-white border-slate-300 focus:outline-none focus:border-[#0B94D3]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-500 font-semibold block mb-1">E-mail (facultatif)</label>
                  <input
                    type="email"
                    disabled={!editing}
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className={`w-full border rounded-xl p-2.5 text-slate-800 font-medium ${
                      editing
                        ? 'bg-white border-slate-300 focus:outline-none focus:border-[#0B94D3]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>
              {formError && (
                <p className="text-xs font-semibold text-rose-700">{formError}</p>
              )}
              {editing && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="h-10 px-4 rounded-xl bg-[#243A79] hover:bg-[#1A2B59] text-white text-sm font-bold inline-flex items-center gap-2 disabled:opacity-60"
                  >
                    {saving ? 'Enregistrement…' : 'Enregistrer'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </form>
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-sm font-bold text-[#243A79] mb-2">Carnet de bénéficiaires</h4>
              <p className="text-xs text-slate-500 mb-3">Pour accélérer les prochains transferts sécurisés.</p>
              <ul className="space-y-2">
                {beneficiaries.map((b) => (
                  <li key={b.id} className="flex items-center justify-between text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                    <span className="font-semibold text-slate-800">{b.name}</span>
                    <span className="text-slate-500">{b.phone}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setLogoutOpen(true)}
              className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold inline-flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Se déconnecter
            </button>
          </div>
        )}

      </main>

      <ConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        variant="logout"
        title="Fermer la session ?"
        description="Vous allez quitter votre espace supporter NGTICKET."
        confirmLabel="Se déconnecter"
        cancelLabel="Rester connecté"
        onConfirm={() => {
          logout();
          router.push('/connexion');
        }}
      />

      <ClientFooter />
    </div>
    </AuthGuard>
  );
}
