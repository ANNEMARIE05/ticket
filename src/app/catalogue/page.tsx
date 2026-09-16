'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import ClientNavbar from '@/components/layout/ClientNavbar';
import ClientFooter from '@/components/layout/ClientFooter';
import { useCatalog } from '@/context/CatalogContext';
import { EventMatchTeams } from '@/components/ui/TeamFlag';
import { isShowEvent, getEventDemandBadge } from '@/lib/eventKind';
import { 
  Search, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Tag,
} from 'lucide-react';

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EEF1F6] flex items-center justify-center text-sm text-slate-500">Chargement du catalogue…</div>}>
      <CatalogueContent />
    </Suspense>
  );
}

function CatalogueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { events: mockEvents, venues: mockVenues } = useCatalog();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [competitionsOnly, setCompetitionsOnly] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(100000);

  // Sync URL → filtres (navbar / footer)
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('cat') || 'all';
    const comp = searchParams.get('comp') === '1';
    setSearch(q);
    setSelectedCategory(['football', 'concert', 'basketball', 'tennis'].includes(cat) ? cat : 'all');
    setCompetitionsOnly(comp);
  }, [searchParams]);

  const syncUrl = (next: { q?: string; cat?: string; comp?: boolean }) => {
    const params = new URLSearchParams();
    const q = next.q !== undefined ? next.q : search;
    const cat = next.cat !== undefined ? next.cat : selectedCategory;
    const comp = next.comp !== undefined ? next.comp : competitionsOnly;
    if (q.trim()) params.set('q', q.trim());
    if (cat && cat !== 'all') params.set('cat', cat);
    if (comp) params.set('comp', '1');
    const qs = params.toString();
    router.replace(qs ? `/catalogue?${qs}` : '/catalogue', { scroll: false });
  };

  const filteredEvents = mockEvents.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(search.toLowerCase()) ||
      evt.venueName.toLowerCase().includes(search.toLowerCase()) ||
      evt.description.toLowerCase().includes(search.toLowerCase()) ||
      (evt.competition || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
    const matchesVenue = selectedVenue === 'all' || evt.venueId === selectedVenue;
    const matchesPrice = evt.priceStartingFrom <= priceMax;
    const matchesComp =
      !competitionsOnly ||
      Boolean(evt.competition && !['Concert Événement', 'Festival Musiques Urbaines'].includes(evt.competition));
    return matchesSearch && matchesCategory && matchesVenue && matchesPrice && matchesComp;
  });

  const categoryChips = [
    { id: 'all', label: 'Tous' },
    { id: 'football', label: 'Football' },
    { id: 'concert', label: 'Concerts' },
    { id: 'basketball', label: 'Basketball' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF1F6] font-sans">
      <ClientNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 w-full space-y-3.5 sm:space-y-5">
        
        {/* Page Header */}
        <div className="bg-[#0F172A] text-white p-3.5 sm:p-6 rounded-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-sky-400 block mb-1">
              Programmation officielle
            </span>
            <h1 className="text-lg sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Catalogue des événements
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Réservez vos places pour les matchs FECAFOOT, concerts et compétitions au Cameroun.
            </p>
          </div>

          <span className="self-start sm:self-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/10 text-emerald-300 text-xs sm:text-sm font-semibold border border-white/10">
            {filteredEvents.length} disponible{filteredEvents.length > 1 ? 's' : ''}
          </span>
        </div>

        {filteredEvents.some((e) => e.isHot) && (
          <div className="bg-amber-50 border border-amber-200 rounded-md px-3.5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-xs font-black uppercase text-amber-800 tracking-wide">File d’attente virtuelle</p>
              <p className="text-sm text-amber-900">
                Pic d’affluence détecté sur les événements à forte demande. Position estimée : <strong>24</strong> · temps d’attente ~ <strong>3 min</strong>.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-white border border-amber-200 rounded-md px-2.5 py-1">
              Activation automatique
            </span>
          </div>
        )}

        {/* Filtres discipline en chips (remplace les faux liens navbar) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categoryChips.map((chip) => {
            const active = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(chip.id);
                  syncUrl({ cat: chip.id });
                }}
                className={`h-8 sm:h-9 px-2.5 sm:px-3.5 rounded-md text-xs sm:text-sm font-semibold border transition-colors ${
                  active
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              const next = !competitionsOnly;
              setCompetitionsOnly(next);
              syncUrl({ comp: next });
            }}
            className={`h-8 sm:h-9 px-2.5 sm:px-3.5 rounded-md text-xs sm:text-sm font-semibold border transition-colors ${
              competitionsOnly
                ? 'bg-sky-700 text-white border-sky-700'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            Compétitions
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-md p-3 sm:p-4 border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="relative sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Recherche
              </label>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Événement, club, stade…"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    syncUrl({ q: e.target.value });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Stade ou salle
              </label>
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:border-slate-400"
              >
                <option value="all">Tous les stades</option>
                {mockVenues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Prix max</label>
                <span className="text-sm font-bold text-slate-900">{priceMax.toLocaleString()} FCFA</span>
              </div>
              <input
                type="range"
                min="2000"
                max="100000"
                step="1000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#0F172A] cursor-pointer mt-2"
              />
            </div>
          </div>
        </div>

        {/* Content Result Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-md border border-dashed border-slate-300">
            <Tag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Aucun événement trouvé</h3>
            <p className="text-sm text-slate-500 mt-1">Modifiez vos filtres ou votre recherche.</p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setSelectedVenue('all');
                setCompetitionsOnly(false);
                setPriceMax(100000);
                router.replace('/catalogue', { scroll: false });
              }}
              className="mt-4 h-10 px-4 bg-[#0F172A] text-white text-sm font-semibold rounded-md hover:bg-slate-800"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {filteredEvents.map((evt) => (
              <Link
                key={evt.id}
                href={`/evenement/${evt.id}`}
                className="bg-white rounded-md overflow-hidden border border-slate-200 hover:border-slate-400 transition-all shadow-sm hover:shadow-md flex flex-col group justify-between text-left cursor-pointer"
              >
                <div className={`relative bg-slate-900 overflow-hidden ${isShowEvent(evt.category) ? 'h-52 sm:h-64' : 'h-36 sm:h-44'}`}>
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                      isShowEvent(evt.category) ? 'object-cover object-top' : 'object-cover opacity-90'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0F172A] text-white">
                    {isShowEvent(evt.category) ? 'Affiche concert' : evt.category}
                  </span>
                  {(() => {
                    const badge = getEventDemandBadge(evt);
                    const tone =
                      badge.tone === 'rose'
                        ? 'bg-rose-600 text-white'
                        : badge.tone === 'amber'
                        ? 'bg-amber-400 text-slate-900'
                        : badge.tone === 'orange'
                        ? 'bg-[#FF4B26] text-white'
                        : badge.tone === 'sky'
                        ? 'bg-sky-500 text-white'
                        : 'bg-emerald-500 text-white';
                    return (
                      <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-black uppercase ${tone}`}>
                        {badge.label}
                      </span>
                    );
                  })()}

                  <div className="absolute bottom-2.5 left-3 right-3 text-white flex justify-between items-center text-xs gap-2">
                    <span className="font-semibold flex items-center gap-1 text-sm">
                      <Calendar className="w-3.5 h-3.5 text-sky-300" />
                      {evt.date} • {evt.time}
                    </span>
                    <span className="font-semibold bg-white/20 px-2 py-0.5 rounded text-[11px] backdrop-blur-sm truncate max-w-[45%]">
                      {evt.competition || 'Gala'}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E3A8A] transition leading-tight">
                      {evt.title}
                    </h3>
                    {(evt.teamHome || evt.title.toLowerCase().includes(' vs ')) && (
                      <div className="mt-2 p-2 rounded-md bg-slate-50 border border-slate-100">
                        <EventMatchTeams event={evt} variant="light" size="sm" />
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span className="truncate">{evt.venueName}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Dès</span>
                      <span className="text-xl font-bold text-slate-900 leading-none">
                        {evt.priceStartingFrom.toLocaleString()}{' '}
                        <span className="text-xs font-semibold text-slate-500">FCFA</span>
                      </span>
                    </div>

                    <span className="h-10 px-3.5 rounded-md bg-[#E11D2E] group-hover:bg-[#C41626] text-white text-sm font-semibold transition flex items-center gap-1 shrink-0">
                      <span>Réserver</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <ClientFooter />
    </div>
  );
}
