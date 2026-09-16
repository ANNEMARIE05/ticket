import { Event } from '@/types';

export const DEFAULT_SPORT_IMAGE =
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80';

export const DEFAULT_CONCERT_IMAGE =
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80';

export function isShowEvent(category?: Event['category'] | string) {
  return category === 'concert' || category === 'theatre' || category === 'culture';
}

export const CONCERT_LEVELS = [
  { key: 'priceVIP' as const, label: 'Table / Salon VIP', hint: 'Table privée, salon et extras' },
  { key: 'priceHonneur' as const, label: 'Fosse Or', hint: 'Au pied de la scène' },
  { key: 'priceStandard' as const, label: 'Pelouse / Fosse générale', hint: 'Accès terrain festif' },
  { key: 'pricePopulaire' as const, label: 'Gradins vue scène', hint: 'Place assise panoramique' },
];

export const SPORT_LEVELS = [
  { key: 'priceVIP' as const, label: 'Loges VVIP' },
  { key: 'priceHonneur' as const, label: 'Tribune Honneur' },
  { key: 'priceStandard' as const, label: 'Tribune Latérale' },
  { key: 'pricePopulaire' as const, label: 'Virages Populaires' },
];

export function concertPricingCategories(prices: {
  priceVIP: number;
  priceHonneur: number;
  priceStandard: number;
  pricePopulaire: number;
}) {
  return [
    { id: 'cat-vip', name: 'Table Gold VIP', price: prices.priceVIP, description: 'Table privée, salon réservé', availableSeats: 80, color: '#FFB020' },
    { id: 'cat-fosse', name: 'Fosse Or Fan Zone', price: prices.priceHonneur, description: 'Au pied de la scène', availableSeats: 1200, color: '#0B94D3' },
    { id: 'cat-pelouse', name: 'Pelouse Fosse Générale', price: prices.priceStandard, description: 'Accès terrain festif', availableSeats: 4800, color: '#243A79' },
    { id: 'cat-gradin', name: 'Gradins Vue Scène', price: prices.pricePopulaire, description: 'Place assise vue panoramique', availableSeats: 8000, color: '#10B981' },
  ];
}

export function getEventStatusLabel(status: Event['status']) {
  if (status === 'on_sale') return 'En vente';
  if (status === 'upcoming') return 'Bientôt en vente';
  if (status === 'sold_out') return 'Complet';
  if (status === 'finished') return 'Terminé';
  if (status === 'cancelled') return 'Annulé';
  return 'Brouillon';
}

export function getEventDemandBadge(event: Event) {
  const remaining = event.totalSeats - event.soldSeats;
  const fillRate = event.totalSeats > 0 ? event.soldSeats / event.totalSeats : 0;
  if (event.status === 'sold_out' || remaining <= 0) return { label: 'Complet', tone: 'rose' as const };
  if (remaining < 20 || fillRate >= 0.95) return { label: 'Dernières places', tone: 'amber' as const };
  if (event.isHot || fillRate >= 0.8) return { label: 'Forte demande', tone: 'orange' as const };
  if (event.status === 'upcoming') return { label: 'Bientôt en vente', tone: 'sky' as const };
  return { label: 'En vente', tone: 'emerald' as const };
}

export function sportPricingCategories(prices: {
  priceVIP: number;
  priceHonneur: number;
  priceStandard: number;
  pricePopulaire: number;
}) {
  return [
    { id: 'cat-vip', name: 'VIP Loges', price: prices.priceVIP, description: 'VIP', availableSeats: 200, color: '#FFB020' },
    { id: 'cat-hon', name: 'Tribune Honneur', price: prices.priceHonneur, description: 'Honneur', availableSeats: 2500, color: '#0B94D3' },
    { id: 'cat-std', name: 'Tribune Standard', price: prices.priceStandard, description: 'Standard', availableSeats: 15000, color: '#243A79' },
    { id: 'cat-pop', name: 'Virage Populaire', price: prices.pricePopulaire, description: 'Populaire', availableSeats: 27300, color: '#10B981' },
  ];
}
