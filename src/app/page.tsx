'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ClientNavbar from '@/components/layout/ClientNavbar';
import ClientFooter from '@/components/layout/ClientFooter';
import { mockEvents } from '@/data/mockData';
import { TeamFlag, EventMatchTeams } from '@/components/ui/TeamFlag';
import { resolveTeamCountry } from '@/lib/teamFlags';
import { isShowEvent } from '@/lib/eventKind';
import { 
  MatchCardSkeleton, 
  HeroBannerSkeleton, 
  TrendingPlayerSkeleton 
} from '@/components/ui/Skeleton';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Flame, 
  ArrowRight, 
  Trophy, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  ShieldCheck, 
  Search, 
  Smartphone, 
  QrCode, 
  Ticket, 
  Play,
  RefreshCw,
  Loader2
} from 'lucide-react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSportTab, setSelectedSportTab] = useState<'all' | 'football' | 'concert' | 'basketball'>('all');

  const handleTabChange = (tab: 'all' | 'football' | 'concert' | 'basketball') => {
    setSelectedSportTab(tab);
  };

  // Featured slides for the rotating hero carousel
  const heroSlides = [
    {
      event: mockEvents[0],
      badge: 'ÉLIMINATOIRES COUPE DU MONDE · FECAFOOT',
      tagline: 'LIONS INDOMPTABLES AU STADE AHMADOU AHIDJO',
      homeTeam: 'Cameroun',
      homeShort: 'CMR',
      awayTeam: 'Nigéria',
      awayShort: 'NGA',
      highlightPlayer: 'Aboubakar & Mbeumo',
      accentColor: '#0B94D3',
      bgImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=80',
    },
    {
      event: mockEvents[2],
      badge: 'CONCERT GÉANT STADE',
      tagline: 'THE EXPERIENCE TOUR — LIVE JAPOMA',
      homeTeam: 'Locko',
      homeShort: 'LOCKO',
      awayTeam: 'Live Show 360°',
      awayShort: 'SHOW',
      highlightPlayer: 'Scène Centrale 360° & Orchestre',
      accentColor: '#FFB020',
      bgImage: mockEvents[2].image,
    },
    {
      event: mockEvents[1],
      badge: 'ELITE ONE FECAFOOT',
      tagline: 'LE CLASSIQUE NATIONAL À GAROUA',
      homeTeam: 'Coton Sport',
      homeShort: 'COTON',
      awayTeam: 'Canon Yaoundé',
      awayShort: 'CANON',
      highlightPlayer: 'Roumdé Adjia en feu',
      accentColor: '#FF4B26',
      bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80',
    },
    {
      event: mockEvents[3],
      badge: 'ELITE ONE FECAFOOT',
      tagline: 'UNION DOUALA REÇOIT LA COLOMBE',
      homeTeam: 'Union Douala',
      homeShort: 'UNION',
      awayTeam: 'Colombe du Dja',
      awayShort: 'COLOMBE',
      highlightPlayer: 'Choc littoral à Japoma',
      accentColor: '#10B981',
      bgImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1400&q=80',
    }
  ];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const activeHero = heroSlides[currentSlide];

  // Filtered list
  const filteredEvents = selectedSportTab === 'all' 
    ? mockEvents 
    : mockEvents.filter(e => e.category === selectedSportTab);

  // Trending players inspired by Maquette #1 Haider
  const trendingPlayers = [
    { name: 'Vincent Aboubakar', team: 'Cameroun', rating: '9.4', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
    { name: 'Bryan Mbeumo', team: 'Cameroun', rating: '9.2', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80' },
    { name: 'André Onana', team: 'Cameroun', rating: '9.3', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { name: 'Karl Toko Ekambi', team: 'Cameroun', rating: '8.9', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F5F9] font-sans">
      <ClientNavbar />

      <main className="flex-1 space-y-4 sm:space-y-6">
        
        {/* ======================================================== */}
        {/* SECTION 1: HERO DYNAMIQUE AVEC SLIDER (INSPIRÉ MAQUETTES HAIDER & ESPN) */}
        {/* ======================================================== */}
        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
          
          <div className="relative rounded-xl overflow-hidden bg-[#0D1527] border border-slate-800 shadow-2xl text-white">
            
            {/* Background Image with Dark Vignette */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out opacity-25 scale-105"
              style={{ backgroundImage: `url('${activeHero.bgImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090E1D] via-[#090E1D]/90 to-transparent z-0" />

            {/* Slider Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 items-stretch">
              
              {/* Left Column: Match Details & Pitch (7 Cols) */}
              <div className="lg:col-span-8 p-3.5 xs:p-4 sm:p-10 flex flex-col justify-between space-y-3 sm:space-y-6">
                
                {/* Competition Tag & Live Badge */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="font-athletic text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 bg-[#FF4B26] text-white rounded clip-angled">
                    {activeHero.badge}
                  </span>
                  <span className="font-athletic text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 sm:py-1 bg-white/10 text-emerald-400 border border-emerald-500/30 rounded flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 radar-live" />
                    Guichet ouvert
                  </span>
                  <span className="text-slate-400 font-athletic text-xs uppercase hidden sm:inline">
                    • {activeHero.event.date} à {activeHero.event.time}
                  </span>
                </div>

                {/* Big Match Title with Athletic Typography */}
                <div>
                  <h1 className="font-athletic text-[22px] xs:text-2xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[1.05]">
                    {activeHero.event.title}
                  </h1>
                  <p className="text-[11px] sm:text-sm text-slate-300 font-medium mt-1 uppercase tracking-wide line-clamp-2">
                    {activeHero.tagline} • <span className="text-[#34B3EC] font-bold">{activeHero.event.venueName}</span>
                  </p>
                </div>

                {isShowEvent(activeHero.event.category) ? (
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-900/90 border border-amber-500/30 rounded-lg sm:rounded-xl p-2.5 sm:p-4 w-full sm:w-fit">
                    <img
                      src={activeHero.event.image}
                      alt={`Affiche ${activeHero.event.title}`}
                      className="w-16 h-24 sm:w-20 sm:h-28 rounded-lg object-cover border border-amber-400/40 shadow-lg shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Affiche officielle</span>
                      <p className="font-athletic text-sm sm:text-lg font-black text-white uppercase leading-tight mt-0.5">
                        {activeHero.event.title}
                      </p>
                      <p className="text-[11px] text-slate-300 mt-1">
                        VIP · Fosse · Pelouse · Gradins
                      </p>
                    </div>
                  </div>
                ) : (
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-slate-900/90 border border-slate-700/80 rounded-lg sm:rounded-xl p-2.5 sm:p-5 w-full sm:w-fit">
                  
                  {/* Team 1 */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-none">
                    {resolveTeamCountry(activeHero.homeTeam) ? (
                      <TeamFlag name={activeHero.homeTeam} size="lg" className="rounded-md sm:rounded-lg ring-white/20" />
                    ) : (
                      <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#243A79] border border-blue-400/40 rounded-md sm:rounded-lg flex items-center justify-center font-athletic text-sm sm:text-xl font-black text-white shadow shrink-0">
                        {activeHero.homeShort.substring(0, 3)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="font-athletic text-xs sm:text-lg font-black text-white uppercase block leading-none truncate">
                        {activeHero.homeTeam}
                      </span>
                      <span className="text-[9px] text-slate-400 font-semibold uppercase">Domicile</span>
                    </div>
                  </div>

                  {/* VS Emblem */}
                  <div className="px-1 sm:px-2 flex flex-col items-center shrink-0">
                    <span className="font-athletic text-sm sm:text-xl font-black text-[#FF4B26] tracking-widest">VS</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase hidden xs:block">OFFICIEL</span>
                  </div>

                  {/* Team 2 */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-none justify-end sm:justify-start">
                    {resolveTeamCountry(activeHero.awayTeam) ? (
                      <TeamFlag name={activeHero.awayTeam} size="lg" className="rounded-md sm:rounded-lg ring-white/20" />
                    ) : (
                      <div className="w-9 h-9 sm:w-12 sm:h-12 bg-slate-800 border border-slate-600 rounded-md sm:rounded-lg flex items-center justify-center font-athletic text-sm sm:text-xl font-black text-white shadow shrink-0">
                        {activeHero.awayShort.substring(0, 3)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="font-athletic text-xs sm:text-lg font-black text-white uppercase block leading-none truncate">
                        {activeHero.awayTeam}
                      </span>
                      <span className="text-[9px] text-slate-400 font-semibold uppercase">Visiteur</span>
                    </div>
                  </div>

                </div>
                )}

                {/* CTAs & Slide Indicators */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                  <div className="flex items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <Link
                      href={`/evenement/${activeHero.event.id}`}
                      className="flex-1 sm:flex-none px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-lg bg-[#FF4B26] hover:bg-[#e03d1a] active:scale-95 text-white font-athletic text-xs sm:text-lg font-black uppercase tracking-wide sm:tracking-wider transition shadow-lg flex items-center justify-center gap-1.5 sm:gap-2"
                    >
                      <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="sm:hidden">Réserver dès {activeHero.event.priceStartingFrom.toLocaleString()} F</span>
                      <span className="hidden sm:inline">Réserver Ma Place Dès {activeHero.event.priceStartingFrom.toLocaleString()} FCFA</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    </Link>

                    <Link
                      href="/catalogue"
                      className="px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-athletic text-xs sm:text-base font-bold uppercase transition border border-white/20 hidden sm:inline-flex"
                    >
                      Voir le calendrier
                    </Link>
                  </div>

                  {/* Slide controls & Dots */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition border border-slate-700"
                      title="Précédent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 px-2">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-2 rounded-full transition-all ${
                            currentSlide === idx ? 'w-6 bg-[#FF4B26]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition border border-slate-700"
                      title="Suivant"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Hero Visual Cutout & VIP Club Card (4 Cols) */}
              <div className="lg:col-span-4 bg-gradient-to-t from-[#0b1224] to-[#121c35] border-t lg:border-t-0 lg:border-l border-slate-800 p-3.5 sm:p-6 flex flex-col justify-between">
                
                {isShowEvent(activeHero.event.category) ? (
                  <div className="relative rounded-lg sm:rounded-xl overflow-hidden border border-amber-500/30 aspect-[3/4] max-h-[280px] sm:max-h-[340px]">
                    <img
                      src={activeHero.event.image}
                      alt={`Affiche ${activeHero.event.title}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Affiche officielle</span>
                      <Link
                        href={`/evenement/${activeHero.event.id}`}
                        className="mt-2 block text-center py-2.5 px-4 rounded-lg bg-[#FFB020] hover:bg-[#e69e1c] text-slate-950 font-athletic text-sm font-black uppercase tracking-wider transition shadow"
                      >
                        Voir les niveaux
                      </Link>
                    </div>
                  </div>
                ) : (
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-lg sm:rounded-xl p-3.5 sm:p-5 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-athletic text-sm sm:text-base font-black uppercase text-white leading-none">
                          Club Hospitalités & VIP
                        </h4>
                        <span className="text-[10px] text-amber-400 font-bold uppercase">Accès Loges Privilèges</span>
                      </div>
                    </div>
                    <span className="font-athletic text-xs font-bold bg-[#FF4B26] text-white px-2 py-0.5 rounded uppercase">
                      Exclusif
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Profitez de places centrales au Stade Ahmadou Ahidjo avec salons réceptifs, open-bar traiteur et accès coupe-file prioritaire.
                  </p>

                  <Link
                    href={`/evenement/${activeHero.event.id}`}
                    className="block text-center py-2.5 px-4 rounded-lg bg-[#FFB020] hover:bg-[#e69e1c] text-slate-950 font-athletic text-base font-black uppercase tracking-wider transition shadow"
                  >
                    Pack VIP Prestige
                  </Link>
                </div>
                )}

                {/* Quota & Match Status Gauge */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between items-baseline text-xs font-bold uppercase font-athletic">
                    <span className="text-slate-400">Remplissage Prévente</span>
                    <span className="text-[#34B3EC]">
                      {Math.round((activeHero.event.soldSeats / activeHero.event.totalSeats) * 100)}% ({activeHero.event.soldSeats.toLocaleString()} / {activeHero.event.totalSeats.toLocaleString()})
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className="bg-gradient-to-r from-[#0B94D3] to-[#FF4B26] h-full transition-all duration-700"
                      style={{ width: `${Math.round((activeHero.event.soldSeats / activeHero.event.totalSeats) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium text-center">
                    ⚠️ Les portes ouvriront à {activeHero.event.doorsOpenTime}. Présentation du QR Code sur smartphone.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ======================================================== */}
        {/* SECTION 2: COMMENT ÇA MARCHE EN 3 ÉTAPES (ZÉRO PRISE DE TÊTE) */}
        {/* ======================================================== */}
        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
              
              {/* Step 1 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#243A79] rounded-md sm:rounded-lg text-white font-athletic text-lg sm:text-2xl font-black flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-athletic text-sm sm:text-lg font-black uppercase text-slate-900 leading-none">
                    Choisis ton match
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Sélectionne ta tribune ou virage en direct sur le plan 2D du stade.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3 sm:gap-4 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#FF4B26] rounded-md sm:rounded-lg text-white font-athletic text-lg sm:text-2xl font-black flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-athletic text-sm sm:text-lg font-black uppercase text-slate-900 leading-none">
                    Paiement Mobile 1 Clic
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Orange Money, MTN MoMo ou carte Visa/Mastercard 3-D Secure, sans frais cachés.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3 sm:gap-4 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#10B981] rounded-md sm:rounded-lg text-white font-athletic text-lg sm:text-2xl font-black flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-athletic text-sm sm:text-lg font-black uppercase text-slate-900 leading-none">
                    Billet QR par SMS
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Pas besoin d'imprimer ! Passe le QR code directement au tourniquet.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: PROGRAMME DES MATCHS & STARS DU MOMENT (MAQUETTE #1 & #3) */}
        {/* ======================================================== */}
        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 9 Cols: Match Schedule & Cards */}
            <div className="lg:col-span-9 space-y-4">
              
              {/* Header with Sports Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="font-athletic text-lg sm:text-3xl font-black uppercase text-[#243A79] tracking-tight leading-none">
                    Programme Billetterie & Matchs
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Réservez en direct les meilleures places aux guichets officiels</p>
                </div>

                {/* Filter Pills & Live Refresh Button */}
                <div className="flex flex-wrap items-center gap-1.5 font-athletic text-sm uppercase font-bold">
                  <button
                    onClick={() => handleTabChange('all')}
                    className={`px-3 py-1.5 rounded transition ${
                      selectedSportTab === 'all'
                        ? 'bg-[#243A79] text-white font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tous
                  </button>
                  <button
                    onClick={() => handleTabChange('football')}
                    className={`px-3 py-1.5 rounded transition ${
                      selectedSportTab === 'football'
                        ? 'bg-[#243A79] text-white font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ⚽ Football
                  </button>
                  <button
                    onClick={() => handleTabChange('concert')}
                    className={`px-3 py-1.5 rounded transition ${
                      selectedSportTab === 'concert'
                        ? 'bg-[#243A79] text-white font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    🎤 Concerts
                  </button>
                  <button
                    onClick={() => handleTabChange('basketball')}
                    className={`px-3 py-1.5 rounded transition ${
                      selectedSportTab === 'basketball'
                        ? 'bg-[#243A79] text-white font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    🏀 Basketball
                  </button>
                </div>
              </div>

              {/* Match Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {filteredEvents.map((evt, idx) => {
                  const fillPercent = Math.round((evt.soldSeats / evt.totalSeats) * 100);
                  const viewerCount = ['48.2K', '35.1K', '62.4K', '22.8K', '14.5K', '28.0K'][idx % 6];

                  return (
                    <Link
                      key={evt.id}
                      href={`/evenement/${evt.id}`}
                      className="bg-white border border-slate-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-[#0B94D3] transition-all shadow-sm hover:shadow-md flex flex-col justify-between text-left cursor-pointer"
                    >
                      {/* Top Bar with Live Badge & Viewers (like Haider's card header) */}
                      <div className="p-2.5 sm:p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-athletic text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#243A79] text-white">
                            {evt.category}
                          </span>
                          <span className="font-athletic text-xs font-bold text-slate-500 uppercase truncate max-w-[140px]">
                            {evt.competition || 'Gala Stade'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 font-athletic text-xs font-black text-[#FF4B26]">
                          <span className="w-2 h-2 rounded-full bg-[#FF4B26] radar-live" />
                          <span>{viewerCount} EN LIGNE</span>
                        </div>
                      </div>

                      {/* Main Card Content */}
                      <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                        
                        {/* Title and date */}
                        <div>
                          <h3 className="font-athletic text-base sm:text-2xl font-black uppercase text-[#243A79] leading-tight hover:text-[#0B94D3] transition">
                            {evt.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-1">
                            <Calendar className="w-3.5 h-3.5 text-[#0B94D3]" />
                            <span>{evt.date} • {evt.time}</span>
                            <span>•</span>
                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                            <span className="truncate">{evt.venueName}</span>
                          </div>
                        </div>

                        {/* Points Table / Duel Box format from Maquette #1 */}
                        {isShowEvent(evt.category) ? (
                          <div className="relative h-36 rounded-lg overflow-hidden border border-slate-200">
                            <img src={evt.image} alt={`Affiche ${evt.title}`} className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Affiche officielle</span>
                              <span className="text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                                VIP · Fosse · Gradins
                              </span>
                            </div>
                          </div>
                        ) : (
                        <div className="bg-[#0b1224] text-white rounded-lg p-3 space-y-2 border border-slate-800">
                          <div className="text-[10px] font-athletic uppercase tracking-widest text-slate-400 font-black flex justify-between">
                            <span>TABLEAU DU MATCH</span>
                            <span className="text-amber-400">RÉSERVATION DIRECTE</span>
                          </div>

                          {evt.teamHome || evt.title.toLowerCase().includes(' vs ') ? (
                            <EventMatchTeams event={evt} variant="dark" size="sm" />
                          ) : (
                            <div className="flex items-center justify-between font-athletic text-sm uppercase font-bold text-slate-200">
                              <span className="truncate">{evt.title}</span>
                              <span className="bg-[#243A79] px-2 py-0.5 rounded font-black text-white text-xs">
                                {evt.priceStartingFrom.toLocaleString()} F
                              </span>
                            </div>
                          )}
                        </div>
                        )}

                        {/* Fill rate bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-slate-600 font-athletic uppercase">
                            <span>Places Vendues</span>
                            <span className="text-[#243A79]">{fillPercent}% ({evt.soldSeats.toLocaleString()} pl.)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#0B94D3] to-[#243A79] h-full"
                              style={{ width: `${fillPercent}%` }}
                            />
                          </div>
                        </div>

                      </div>

                      {/* Card Bottom CTA Bar */}
                      <div className="p-2.5 sm:p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block font-athletic">À partir de</span>
                          <span className="font-athletic text-lg sm:text-2xl font-black text-[#243A79] leading-none">
                            {evt.priceStartingFrom.toLocaleString()} <span className="text-[10px] sm:text-xs font-bold text-slate-500 font-sans">FCFA</span>
                          </span>
                        </div>

                        <span className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-md sm:rounded-lg bg-[#243A79] group-hover:bg-[#FF4B26] text-white font-athletic text-xs sm:text-base font-black uppercase tracking-wide sm:tracking-wider transition flex items-center gap-1 shadow-sm shrink-0">
                          <span>Réserver</span>
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>

                    </Link>
                  );
                })}
              </div>

            </div>

            {/* Right 3 Cols: Stars du Moment & Stades (Directly from Maquette #1) */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Trending Players Widget */}
              <div className="bg-white border border-slate-200 rounded-lg sm:rounded-xl p-3.5 sm:p-5 shadow-sm space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-athletic text-base sm:text-xl font-black uppercase text-[#243A79]">
                    Stars du Moment
                  </h3>
                  <span className="text-[10px] font-black uppercase text-[#0B94D3] bg-blue-50 px-2 py-0.5 rounded">
                    Top Cotes
                  </span>
                </div>

                <div className="space-y-3">
                  {trendingPlayers.map((player, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <span className="font-athletic text-sm font-black uppercase text-slate-900 block leading-tight">
                            {player.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">{player.team}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 font-athletic text-sm font-black">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{player.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/catalogue?cat=football"
                  className="block text-center py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-athletic text-xs font-bold uppercase transition"
                >
                  Voir tous les matchs de gala
                </Link>
              </div>

              {/* Guichets Stades Info */}
              <div className="bg-[#0b1224] text-white border border-slate-800 rounded-lg sm:rounded-xl p-3.5 sm:p-5 space-y-3">
                <span className="text-[10px] font-athletic uppercase tracking-widest text-[#0B94D3] font-black block">
                  INFRASTRUCTURES FECAFOOT
                </span>
                <h4 className="font-athletic text-lg font-black uppercase text-white leading-tight">
                  Stades Officiels Certifiés
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-300 font-medium">Stade Ahmadou Ahidjo</span>
                    <span className="font-athletic font-bold text-amber-400">42 500 PL.</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-300 font-medium">Stade de Japoma</span>
                    <span className="font-athletic font-bold text-amber-400">50 000 PL.</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-300 font-medium">Stade Roumdé Adjia</span>
                    <span className="font-athletic font-bold text-amber-400">25 000 PL.</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Contrôle d'accès sécurisé par NGSER.</span>
                </div>
              </div>

            </div>

          </div>

        </section>

      </main>

      <ClientFooter />
    </div>
  );
}
