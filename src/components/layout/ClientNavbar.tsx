'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  Ticket,
  ChevronDown,
  LogOut,
  Settings,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TeamFlag } from '@/components/ui/TeamFlag';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

export default function ClientNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, user, login, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      login(loginPhone);
      setLoginLoading(false);
      setLoginModalOpen(false);
      router.push('/compte');
    }, 600);
  };

  useEffect(() => {
    if (!accountMenuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [accountMenuOpen]);

  const confirmLogout = () => {
    setAccountMenuOpen(false);
    setMobileMenuOpen(false);
    logout();
    router.push('/connexion');
  };

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = searchQuery.trim();
    const href = q ? `/catalogue?q=${encodeURIComponent(q)}` : '/catalogue';
    setMobileMenuOpen(false);
    router.push(href);
  };

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Catalogue', href: '/catalogue' },
    { label: 'Mes billets', href: user.isLoggedIn ? '/compte/billets' : '/connexion?next=/compte/billets' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const base = href.split('?')[0];
    return pathname === base || pathname.startsWith(base + '/');
  };

  const accountActive = pathname === '/compte' || pathname.startsWith('/compte/');
  const hasRealName = Boolean(user.name?.trim()) && user.name.trim() !== 'Mon compte';
  const accountInitials = (() => {
    if (!hasRealName) return 'NG';
    const parts = user.name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  })();
  const accountBtnClass = `h-9 w-9 sm:w-auto sm:px-2.5 flex items-center justify-center gap-1.5 rounded-md border transition-colors ${
    accountActive
      ? 'border-slate-300 bg-white text-[#1E3A8A] ring-1 ring-slate-200'
      : 'border-slate-200 bg-white/80 text-slate-700 hover:text-slate-900 hover:bg-white'
  }`;

  return (
    <>
      <div className="sticky top-0 z-50 w-full font-sans">
        {/* Ticker */}
        <div className="bg-[#0F172A] text-white border-b border-white/5 text-xs sm:text-sm overflow-hidden select-none py-1 sm:py-1.5">
          <div className="flex items-center">
            <div className="bg-[#E11D2E] text-white font-bold px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs uppercase tracking-wide flex items-center gap-1.5 flex-shrink-0 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Flash
            </div>

            <div className="overflow-hidden whitespace-nowrap flex-1 relative">
              <div className="animate-ticker flex items-center gap-8 text-slate-300 font-medium text-[11px] sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <TeamFlag name="Cameroun" size="xs" />
                  <strong className="text-white">Cameroun vs Nigéria</strong>
                  <TeamFlag name="Nigéria" size="xs" />
                  <span className="text-amber-400"> · 14 oct 20:00 · Ahidjo</span>
                  <span className="text-rose-400"> · Forte demande</span>
                </span>
                <span className="text-slate-600">/</span>
                <span className="inline-flex items-center gap-1.5">
                  <TeamFlag name="Coton Sport" size="xs" />
                  <strong className="text-white">Coton Sport vs Canon Yaoundé</strong>
                  <TeamFlag name="Canon Yaoundé" size="xs" />
                  <span className="text-emerald-400"> · Garoua</span>
                  <span> · Dès 2 000 FCFA</span>
                </span>
                <span className="text-slate-600">/</span>
                <span>
                  <strong className="text-white">Locko Live Japoma</strong>
                  <span> · 05 nov · Tables VVIP ouvertes</span>
                </span>
                <span className="text-slate-600">/</span>
                <span className="inline-flex items-center gap-1.5">
                  <TeamFlag name="Union Douala" size="xs" />
                  <strong className="text-white">Union Douala vs Colombe</strong>
                  <TeamFlag name="Colombe du Dja" size="xs" />
                  <span className="text-amber-400"> · Japoma</span>
                </span>
                <span className="text-slate-600">/</span>
                <span className="inline-flex items-center gap-1.5">
                  <TeamFlag name="Cameroun" size="xs" />
                  <strong className="text-white">Cameroun vs Nigéria</strong>
                  <TeamFlag name="Nigéria" size="xs" />
                  <span className="text-amber-400"> · 14 oct 20:00 · Ahidjo</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <header className="bg-[#F8FAFC] border-b border-slate-200/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-12 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1E3A8A] rounded-md flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                NG
              </div>
              <div className="leading-tight min-w-0">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[15px] sm:text-lg font-bold tracking-tight text-[#1E3A8A]">
                    NG<span className="text-sky-600">TICKET</span>
                  </span>
                  <span className="hidden xs:inline text-[10px] font-bold uppercase text-slate-400 ml-0.5">.cm</span>
                </div>
                <span className="hidden sm:block text-[11px] font-medium text-slate-500 truncate">
                  Billetterie officielle
                </span>
              </div>
            </Link>

            {/* Nav — Accueil / Catalogue / Mes billets (filtres dans le catalogue) */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-shrink-0">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-semibold transition-colors rounded-md ${
                      active
                        ? 'text-[#1E3A8A] bg-slate-200/70'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search — moteur de réservation */}
            <form
              onSubmit={submitSearch}
              className="hidden md:flex flex-1 max-w-md mx-2"
              role="search"
            >
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Rechercher un match, concert, stade…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 bg-white border border-slate-200 rounded-md pl-9 pr-20 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 px-2.5 rounded text-xs font-semibold bg-[#0F172A] text-white hover:bg-slate-800 transition-colors"
                >
                  Chercher
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <Link
                href="/panier"
                className="relative h-9 w-9 sm:w-auto sm:px-2.5 flex items-center justify-center gap-1.5 rounded-md text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200 transition-colors bg-white/80"
                title="Panier"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-semibold">Panier</span>
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E11D2E] text-white text-[10px] font-bold rounded-sm min-w-[18px] h-[18px] px-1 flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </Link>

              {user.isLoggedIn ? (
                <div className="relative" ref={accountMenuRef}>
                  <button
                    type="button"
                    onClick={() => setAccountMenuOpen((open) => !open)}
                    className={accountBtnClass}
                    title="Mon compte"
                    aria-expanded={accountMenuOpen}
                    aria-haspopup="menu"
                  >
                    <span className="w-7 h-7 rounded-md bg-[#1E3A8A] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {accountInitials}
                    </span>
                    <span className="hidden sm:inline text-sm font-semibold">Mon compte</span>
                    <ChevronDown className={`hidden sm:block w-3.5 h-3.5 text-slate-400 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {accountMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 mt-1.5 w-56 rounded-xl border border-slate-200 bg-white shadow-lg py-1 z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name || 'Client'}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.phone || user.email}</p>
                      </div>
                      <Link
                        href="/compte"
                        role="menuitem"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <User className="w-4 h-4" />
                        Mon espace
                      </Link>
                      <Link
                        href="/compte?tab=profil"
                        role="menuitem"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <Settings className="w-4 h-4" />
                        Modifier mes informations
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          setLogoutOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginModalOpen(true)}
                  className={accountBtnClass}
                  aria-label="Mon compte"
                >
                  <span className="w-7 h-7 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <span className="hidden sm:inline text-sm font-semibold">Mon compte</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-md text-slate-700 hover:bg-white border border-slate-200 bg-white/80"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 bg-[#F8FAFC] px-3 py-3 space-y-1">
              <form onSubmit={submitSearch} className="relative mb-2" role="search">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  placeholder="Match, concert, stade…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 bg-white border border-slate-200 rounded-md pl-9 pr-3 text-sm"
                />
              </form>
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-semibold ${
                    isActive(l.href) ? 'bg-slate-200/80 text-[#1E3A8A]' : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-2 mt-1 border-t border-slate-200 space-y-1">
                {user.isLoggedIn ? (
                  <>
                    <Link
                      href="/compte"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-800 hover:bg-white"
                    >
                      <span className="w-7 h-7 rounded-md bg-[#1E3A8A] text-white text-[10px] font-bold flex items-center justify-center">
                        {accountInitials}
                      </span>
                      Mon compte
                    </Link>
                    <Link
                      href="/compte?tab=profil"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-700 hover:bg-white"
                    >
                      <Settings className="w-4 h-4" />
                      Modifier mes informations
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setLogoutOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold text-rose-700 hover:bg-rose-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLoginModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-800 hover:bg-white"
                  >
                    <User className="w-4 h-4" />
                    Mon compte
                  </button>
                )}
                <Link
                  href="/catalogue"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold bg-[#E11D2E] text-white"
                >
                  <Ticket className="w-4 h-4" />
                  Réserver un billet
                </Link>
                <Link
                  href="/panier"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-700 hover:bg-white"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Panier{totalCartCount > 0 ? ` (${totalCartCount})` : ''}
                </Link>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Login modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0"
            onClick={() => setLoginModalOpen(false)}
            aria-hidden
          />
          <div className="relative bg-white w-full max-w-md rounded-t-xl sm:rounded-md border border-slate-200 p-4 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setLoginModalOpen(false)}
              className="absolute right-3 top-3 p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <div className="w-10 h-10 bg-[#1E3A8A] rounded-md flex items-center justify-center text-white font-bold text-sm mb-3">
                NG
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Connexion</h2>
              <p className="text-sm text-slate-500 mt-1">Accédez à vos e-billets et réservations.</p>
            </div>

            <form onSubmit={handleQuickLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Téléphone ou e-mail
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-slate-500"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Mot de passe</label>
                  <Link
                    href="/mot-de-passe-oublie"
                    onClick={() => setLoginModalOpen(false)}
                    className="text-xs font-medium text-slate-500 hover:text-slate-800"
                  >
                    Oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full h-11 rounded-md bg-[#E11D2E] hover:bg-[#C41626] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {loginLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
              Nouveau ?{' '}
              <Link
                href="/inscription"
                onClick={() => setLoginModalOpen(false)}
                className="font-semibold text-slate-800 hover:underline"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        variant="logout"
        title="Fermer la session ?"
        description="Vous allez quitter votre espace supporter NGTICKET."
        confirmLabel="Se déconnecter"
        cancelLabel="Rester connecté"
        onConfirm={confirmLogout}
      />
    </>
  );
}
