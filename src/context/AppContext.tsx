'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, Order } from '@/types';
import { mockTickets, mockOrders, mockBeneficiaries } from '@/data/mockData';

export interface Beneficiary {
  id: string;
  name: string;
  phone: string;
}

export interface CartItem {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  venueName: string;
  categoryId: string;
  categoryName: string;
  price: number;
  quantity: number;
  selectedSeats?: string[];
  beneficiaryName?: string;
  beneficiaryPhone?: string;
}

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (categoryId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartFees: number;
  cartCountdown: number;

  // Tickets & Transfer
  tickets: Ticket[];
  orders: Order[];
  beneficiaries: Beneficiary[];
  addBeneficiary: (name: string, phone: string) => void;
  transferTicket: (ticketId: string, recipientName: string, recipientPhone: string) => boolean;

  // User auth — invité par défaut, session uniquement après connexion
  authReady: boolean;
  user: {
    isLoggedIn: boolean;
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  login: (phoneOrEmail: string, extras?: { name?: string; email?: string; phone?: string }) => void;
  updateProfile: (data: { name: string; phone: string; email: string }) => void;
  logout: () => void;
}

const SESSION_KEY = 'ngticket-fo-session';

const GUEST_USER = {
  isLoggedIn: false,
  name: '',
  phone: '',
  email: '',
  avatar: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCountdown, setCartCountdown] = useState<number>(600); // 10 minutes (600s)
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [authReady, setAuthReady] = useState(false);
  
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [user, setUser] = useState(GUEST_USER);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as typeof GUEST_USER;
        if (parsed?.isLoggedIn) {
          setUser(parsed);
          setTickets(mockTickets);
          setOrders(mockOrders);
          setBeneficiaries(mockBeneficiaries);
        }
      }
    } catch {
      /* ignore */
    }
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (!authReady) return;
    try {
      if (user.isLoggedIn) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      else localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }, [user, authReady]);

  // Countdown timer for active cart
  useEffect(() => {
    if (cart.length === 0) return;
    const interval = setInterval(() => {
      setCartCountdown((prev) => {
        if (prev <= 1) {
          setCart([]);
          return 600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.categoryId === newItem.categoryId);
      if (existing) {
        return prev.map((i) =>
          i.categoryId === newItem.categoryId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
    setCartCountdown(600);
  };

  const removeFromCart = (categoryId: string) => {
    setCart((prev) => prev.filter((i) => i.categoryId !== categoryId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartFees = Math.round(cartTotal * 0.02); // 2% service fee

  const addBeneficiary = (name: string, phone: string) => {
    setBeneficiaries((prev) => {
      if (prev.some((b) => b.phone === phone)) return prev;
      return [...prev, { id: `ben-${Date.now()}`, name, phone }];
    });
  };

  const transferTicket = (ticketId: string, recipientName: string, recipientPhone: string): boolean => {
    let found = false;
    setTickets((prev) =>
      prev.map((tkt) => {
        if (tkt.id === ticketId) {
          if ((tkt.transferCount ?? 0) >= 1 || tkt.status !== 'active') return tkt;
          found = true;
          return {
            ...tkt,
            status: 'transferred',
            transferCount: 1,
            transferredTo: {
              name: recipientName,
              phone: recipientPhone,
              date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            },
          };
        }
        return tkt;
      })
    );
    if (found) addBeneficiary(recipientName, recipientPhone);
    return found;
  };

  const login = (phoneOrEmail: string, extras?: { name?: string; email?: string; phone?: string }) => {
    const isEmail = phoneOrEmail.includes('@');
    const emailLocal = isEmail ? phoneOrEmail.split('@')[0].replace(/[._-]+/g, ' ').trim() : '';
    const name = extras?.name?.trim() || emailLocal || 'Client';
    const nextUser = {
      isLoggedIn: true,
      name,
      phone: extras?.phone || (isEmail ? '' : phoneOrEmail),
      email: extras?.email || (isEmail ? phoneOrEmail : ''),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1E3A8A&color=fff`,
    };
    setUser(nextUser);
    setTickets(mockTickets);
    setOrders(mockOrders);
    setBeneficiaries(mockBeneficiaries);
  };

  const updateProfile = (data: { name: string; phone: string; email: string }) => {
    const name = data.name.trim();
    setUser((prev) => ({
      ...prev,
      name,
      phone: data.phone.trim(),
      email: data.email.trim(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Client')}&background=1E3A8A&color=fff`,
    }));
  };

  const logout = () => {
    setUser(GUEST_USER);
    setTickets([]);
    setOrders([]);
    setBeneficiaries([]);
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartFees,
        cartCountdown,
        tickets,
        orders,
        beneficiaries,
        addBeneficiary,
        transferTicket,
        authReady,
        user,
        login,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
