'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ClientNavbar from '@/components/layout/ClientNavbar';
import ClientFooter from '@/components/layout/ClientFooter';
import { mockEvents } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { useCatalog } from '@/context/CatalogContext';
import InteractiveStadium3D from '@/components/stadium/InteractiveStadium3D';
import ConcertPosterBooking from '@/components/concert/ConcertPosterBooking';
import BookingStepper from '@/components/layout/BookingStepper';
import { EventMatchTeams } from '@/components/ui/TeamFlag';
import { isShowEvent } from '@/lib/eventKind';
import { PricingCategory } from '@/types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight,
  Ticket,
  ChevronRight,
  DoorOpen,
  Eye,
  Check
} from 'lucide-react';

export default function EventDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3F5F9]" />}>
      <EventDetailContent />
    </Suspense>
  );
}

function EventDetailContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === '1';
  const { addToCart, user } = useApp();
  const catalog = useCatalog();
  const eventId = params.id as string;

  const event =
    catalog.getEvent(eventId) ||
    mockEvents.find((e) => e.id === eventId);

  const [selectedCategory, setSelectedCategory] = useState<PricingCategory | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSeat, setSelectedSeat] = useState('Rangée C • Siège 14');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const found = catalog.getEvent(eventId) || mockEvents.find((e) => e.id === eventId);
    if (!found) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(found.pricingCategories[0]);
    setSelectedSeat(
      isShowEvent(found.category) ? 'Accès nominatif • zone concert' : 'Rangée C • Siège 14'
    );
  }, [eventId, catalog.events, catalog.ready]);

  const handleAddToCart = () => {
    if (!event || !selectedCategory) return;
    if (!user.isLoggedIn) {
      router.push(`/connexion?next=${encodeURIComponent(`/evenement/${eventId}`)}`);
      return;
    }
    addToCart({
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      venueName: event.venueName,
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      price: selectedCategory.price,
      quantity: quantity,
      selectedSeats: [selectedSeat],
    });

    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      router.push('/panier');
    }, 600);
  };

  if (!event || !selectedCategory) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F3F5F9]">
        {!isPreview && <ClientNavbar />}
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center space-y-3">
          <h1 className="text-xl font-black text-[#243A79] uppercase">Événement introuvable</h1>
          <p className="text-sm text-slate-500">Ce match ou concert n’est plus disponible ou le lien est incorrect.</p>
          <Link href="/catalogue" className="h-10 px-4 rounded-md bg-[#243A79] text-white text-sm font-bold inline-flex items-center">
            Retour au catalogue
          </Link>
        </main>
        {!isPreview && <ClientFooter />}
      </div>
    );
  }

  const showEvent = isShowEvent(event.category);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F5F9] font-sans overflow-x-hidden">
      {!isPreview && <ClientNavbar />}

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 w-full space-y-3 sm:space-y-6 pb-24 lg:pb-6">
        
        <BookingStepper current={1} />

        {/* HERO EVENT DETAILS BANNER */}
        <div className="relative rounded-xl overflow-hidden shadow-lg bg-[#0D1527] text-white border border-slate-800">
          <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('${event.image}')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090E1D] via-[#090E1D]/90 to-transparent" />

          <div className="relative z-10 p-3.5 sm:p-8 max-w-3xl space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-athletic text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-[#FF4B26] text-white rounded">
                {event.competition || event.category}
              </span>
              <span className="font-athletic text-[10px] sm:text-xs font-bold text-emerald-400 bg-white/10 px-2 py-0.5 rounded">
                ● Guichet ouvert
              </span>
            </div>

            <h1 className="font-athletic text-xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight sm:leading-none">
              {event.title}
            </h1>
            {isShowEvent(event.category) ? (
              <div className="flex items-center gap-3 bg-slate-900/80 border border-amber-500/30 rounded-lg p-2 w-full sm:w-fit">
                <img
                  src={event.image}
                  alt={`Affiche ${event.title}`}
                  className="w-14 h-20 sm:w-16 sm:h-24 rounded-md object-cover border border-white/20 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Affiche officielle</span>
                  <p className="text-sm text-white font-semibold leading-snug mt-0.5">{event.subtitle || event.title}</p>
                </div>
              </div>
            ) : (event.teamHome || event.title.toLowerCase().includes(' vs ')) ? (
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-2.5 sm:p-3 w-full sm:w-fit min-w-[240px] sm:min-w-[360px]">
                <EventMatchTeams event={event} variant="dark" size="md" />
              </div>
            ) : null}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {event.description}
            </p>

            <div className="flex flex-wrap gap-3 font-athletic text-xs uppercase font-bold text-slate-200 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700">
                <Calendar className="w-3.5 h-3.5 text-[#34B3EC]" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-[#FFB020]" />
                <span>{isShowEvent(event.category) ? `Show ${event.time}` : `Coup d’envoi ${event.time}`} (Portes {event.doorsOpenTime})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{event.venueName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN LAYOUT: 3D INTERACTIVE STADIUM & BOOKING CONTROL PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-start">
          
          {/* Left Column (8 Cols): 3D Interactive Stadium, Seat Map & View From Seat */}
          <div className="lg:col-span-8 space-y-4">
            {isShowEvent(event.category) ? (
              <ConcertPosterBooking
                event={event}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
              />
            ) : (
              <InteractiveStadium3D
                categories={event.pricingCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                selectedSeat={selectedSeat}
                onSelectSeat={(seat) => setSelectedSeat(seat)}
                quantity={quantity}
                onQuantityChange={(qty) => setQuantity(qty)}
                venueName={event.venueName}
                eventTitle={event.title}
              />
            )}
          </div>

          {/* Right Column (4 Cols): Pricing Categories & Direct Checkout */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Active Seat & Tribune Summary Card */}
            <div className="bg-[#0b1224] text-white rounded-lg sm:rounded-xl p-3.5 sm:p-5 border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-athletic text-xs font-black uppercase tracking-widest text-[#0B94D3]">
                  VOTRE SÉLECTION ACTIVE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Réservable 10 min
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                <span className="font-athletic text-xs font-bold text-slate-400 uppercase block">
                  {isShowEvent(event.category) ? 'Niveau de places' : 'Catégorie & Tribune'}
                </span>
                <h4 className="font-athletic text-base sm:text-xl font-black uppercase text-amber-400 leading-tight">
                  {selectedCategory.name}
                </h4>
                {!showEvent && (
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">Siège précis :</span>
                    <span className="font-athletic font-black text-white text-sm bg-slate-800 px-2 py-0.5 rounded">
                      {selectedSeat}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <span>Prix unitaire :</span>
                <span className="font-athletic text-lg font-black text-white">
                  {selectedCategory.price.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {/* Pricing Categories Quick Selection */}
            <div className="bg-white rounded-lg sm:rounded-xl p-3.5 sm:p-5 border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-athletic text-sm sm:text-lg font-black uppercase text-[#243A79]">
                  Changer de tarif
                </h3>
                <span className="text-[10px] font-athletic font-bold uppercase text-slate-500">
                  {event.pricingCategories.length} Catégories
                </span>
              </div>

              {/* Categories list */}
              <div className="space-y-2">
                {event.pricingCategories.map((cat) => {
                  const isSelected = selectedCategory.id === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full p-3 rounded-lg border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'border-[#243A79] bg-blue-50/60 ring-2 ring-[#0B94D3] shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-athletic text-sm font-black uppercase text-slate-900 block leading-tight">
                          {cat.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">{cat.description}</span>
                        <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">
                          ✓ {cat.availableSeats} places libres
                        </span>
                      </div>
                      <div className="text-right pl-2 flex-shrink-0">
                        <span className="font-athletic text-base sm:text-xl font-black text-[#243A79] leading-none block">
                          {cat.price.toLocaleString()} <span className="text-[10px] font-sans font-bold">F</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quantity selector */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <label className="font-athletic text-xs font-black uppercase text-slate-700 block">
                    Nombre de places
                  </label>
                  <span className="text-[10px] text-slate-400">{showEvent ? 'Même niveau de places' : 'Places côte à côte'}</span>
                </div>

                <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-black text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 font-athletic text-base font-black text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-black text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="font-athletic text-xs font-bold uppercase text-slate-400 block">Total Panier</span>
                  <span className="font-athletic text-xl sm:text-3xl font-black text-[#243A79] leading-none">
                    {(selectedCategory.price * quantity).toLocaleString()} <span className="text-xs font-sans font-bold text-slate-500">FCFA</span>
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="hidden sm:flex py-3 px-5 rounded-lg bg-[#FF4B26] hover:bg-[#e03d1a] active:scale-95 text-white font-athletic text-lg font-black uppercase tracking-wider transition shadow-md items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Réserver ({quantity})</span>
                </button>
              </div>

              {addedToast && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-bold animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Billet ajouté ! Redirection vers votre panier...</span>
                </div>
              )}

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-[11px] leading-tight">
                  {showEvent
                    ? 'Votre niveau de places est confirmé à l’achat. Le QR code est nominatif et valable à l’entrée.'
                    : 'Attribution automatique des meilleures places côte à côte garanties par NGSER.'}
                </span>
              </div>

            </div>
          </div>

        </div>

      </main>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-3 shadow-[0_-6px_20px_rgba(15,23,42,0.08)]">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase text-slate-400 truncate">{selectedCategory.name}</p>
          <p className="text-base font-black text-[#243A79] leading-none">
            {(selectedCategory.price * quantity).toLocaleString()} <span className="text-[10px] font-semibold text-slate-500">FCFA</span>
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="h-11 px-4 rounded-md bg-[#FF4B26] hover:bg-[#e03d1a] text-white text-sm font-black uppercase flex items-center gap-1.5 shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          Réserver ({quantity})
        </button>
      </div>

      {!isPreview && <ClientFooter />}
    </div>
  );
}
