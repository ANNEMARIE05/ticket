export interface PricingCategory {
  id: string;
  name: string;
  price: number;
  description: string;
  availableSeats: number;
  color: string;
}

export interface Event {
  id: string;
  title: string;
  subtitle?: string;
  category: 'football' | 'tennis' | 'basketball' | 'concert' | 'theatre' | 'culture';
  competition?: string;
  date: string;
  time: string;
  venueId: string;
  venueName: string;
  city: string;
  image: string;
  bannerImage?: string;
  status: 'draft' | 'upcoming' | 'on_sale' | 'sold_out' | 'finished' | 'cancelled';
  teamHome?: { name: string; logo: string; score?: number; countryCode?: string };
  teamAway?: { name: string; logo: string; score?: number; countryCode?: string };
  priceStartingFrom: number;
  totalSeats: number;
  soldSeats: number;
  description: string;
  featured?: boolean;
  isHot?: boolean;
  doorsOpenTime: string;
  pricingCategories: PricingCategory[];
}

export type CompetitionStatus = 'upcoming' | 'ongoing' | 'inscriptions' | 'finished';

export interface Competition {
  id: string;
  name: string;
  season: string;
  sport: string;
  organizer: string;
  status: CompetitionStatus;
  startDate: string;
  endDate: string;
  description: string;
  stadiums: string;
  matchesCount: number;
  color: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  address: string;
  capacity: number;
  gatesCount: number;
  zonesCount: number;
  image: string;
  status: 'active' | 'maintenance' | 'inactive';
  zones: {
    id: string;
    name: string;
    capacity: number;
    category: string;
    color: string;
    gates: string[];
  }[];
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  city: string;
  categoryName: string;
  zone: string;
  seat: string;
  gate: string;
  price: number;
  holderName: string;
  holderPhone: string;
  qrCodeUrl: string;
  status: 'active' | 'used' | 'expired' | 'transferred';
  purchasedAt: string;
  orderId: string;
  transferredTo?: {
    name: string;
    phone: string;
    date: string;
  };
  transferCount?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  ticketsCount: number;
  amount: number;
  fees: number;
  totalAmount: number;
  paymentMethod: 'orange_money' | 'mtn_momo' | 'card';
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  method: 'orange_money' | 'mtn_momo' | 'card';
  amount: number;
  fee: number;
  date: string;
  status: 'success' | 'pending' | 'failed' | 'refunded';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  registeredDate: string;
  ordersCount: number;
  totalSpent: number;
  status: 'active' | 'suspended';
}

export interface SAVTicket {
  id: string;
  caseNumber: string;
  customerName: string;
  customerPhone: string;
  eventTitle: string;
  type: 'remboursement' | 'annulation' | 'reemission' | 'transfert_bloque';
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  createdAt: string;
}

export interface SupervisionIncident {
  id: string;
  incidentNumber: string;
  time: string;
  gate: string;
  zone: string;
  severity: 'low' | 'medium' | 'critical';
  description: string;
  assignedTeam: string;
  status: 'open' | 'investigating' | 'resolved';
}
