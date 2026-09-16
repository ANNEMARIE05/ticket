'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Competition, Event, Venue } from '@/types';
import { mockCompetitions, mockEvents, mockVenues } from '@/data/mockData';

const STORAGE_KEY = 'ngticket-catalog-v3-cm';

interface CatalogContextType {
  events: Event[];
  venues: Venue[];
  competitions: Competition[];
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  addVenue: (venue: Venue) => void;
  updateVenue: (venue: Venue) => void;
  removeVenue: (id: string) => void;
  addCompetition: (competition: Competition) => void;
  updateCompetition: (competition: Competition) => void;
  removeCompetition: (id: string) => void;
  getEvent: (id: string) => Event | undefined;
  getVenue: (id: string) => Venue | undefined;
  ready: boolean;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [venues, setVenues] = useState<Venue[]>(mockVenues);
  const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          events?: Event[];
          venues?: Venue[];
          competitions?: Competition[];
        };
        if (parsed.events?.length) setEvents(parsed.events);
        if (parsed.venues?.length) setVenues(parsed.venues);
        if (parsed.competitions?.length) setCompetitions(parsed.competitions);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ events, venues, competitions }));
    } catch {
      /* ignore quota */
    }
  }, [events, venues, competitions, hydrated]);

  const addEvent = (event: Event) => setEvents((prev) => [event, ...prev]);
  const updateEvent = (event: Event) =>
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  const removeEvent = (id: string) => setEvents((prev) => prev.filter((e) => e.id !== id));

  const addVenue = (venue: Venue) => setVenues((prev) => [venue, ...prev]);
  const updateVenue = (venue: Venue) =>
    setVenues((prev) => prev.map((v) => (v.id === venue.id ? venue : v)));
  const removeVenue = (id: string) => setVenues((prev) => prev.filter((v) => v.id !== id));

  const addCompetition = (competition: Competition) =>
    setCompetitions((prev) => [competition, ...prev]);
  const updateCompetition = (competition: Competition) =>
    setCompetitions((prev) => prev.map((c) => (c.id === competition.id ? competition : c)));
  const removeCompetition = (id: string) =>
    setCompetitions((prev) => prev.filter((c) => c.id !== id));

  const getEvent = (id: string) => events.find((e) => e.id === id);
  const getVenue = (id: string) => venues.find((v) => v.id === id);

  return (
    <CatalogContext.Provider
      value={{
        events,
        venues,
        competitions,
        addEvent,
        updateEvent,
        removeEvent,
        addVenue,
        updateVenue,
        removeVenue,
        addCompetition,
        updateCompetition,
        removeCompetition,
        getEvent,
        getVenue,
        ready: hydrated,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return ctx;
}
