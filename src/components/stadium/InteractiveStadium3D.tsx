'use client';

import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Check, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  ShieldCheck, 
  DoorOpen, 
  Maximize2,
  ChevronRight,
  Flame,
  UserCheck
} from 'lucide-react';
import { PricingCategory } from '@/types';

interface InteractiveStadium3DProps {
  categories: PricingCategory[];
  selectedCategory: PricingCategory;
  onSelectCategory: (cat: PricingCategory) => void;
  selectedSeat: string;
  onSelectSeat: (seatLabel: string) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  venueName?: string;
  eventTitle?: string;
}

type ViewMode = 'stadium_3d' | 'seat_map' | 'view_from_seat';

export default function InteractiveStadium3D({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedSeat,
  onSelectSeat,
  quantity,
  onQuantityChange,
  venueName = "Stade Ahmadou Ahidjo (Yaoundé)",
  eventTitle = "Match de Gala Officiel",
}: InteractiveStadium3DProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('stadium_3d');
  const [is3DIsometric, setIs3DIsometric] = useState(true);
  const [activeTribuneKey, setActiveTribuneKey] = useState<string>('honneur');
  const [selectedSeatsList, setSelectedSeatsList] = useState<string[]>([selectedSeat]);
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  // Tribunes definition
  const tribunes = [
    {
      id: 'honneur',
      name: 'Tribune Honneur & VVIP',
      subtitle: 'Accès Salons Climatises • Vue Médiane',
      code: 'TH-OUEST',
      color: '#FFB020',
      badge: 'PRESTIGE VVIP',
      categoryMatch: categories.find(c => c.name.toLowerCase().includes('honneur') || c.name.toLowerCase().includes('vip')) || categories[0],
      occupancy: 94,
      remaining: 86,
      door: 'Porte 04 (Accès VVIP Ouest)',
      price: categories.find(c => c.name.toLowerCase().includes('honneur') || c.name.toLowerCase().includes('vip'))?.price || 50000,
    },
    {
      id: 'laterale',
      name: 'Tribune Latérale Est / Ouest',
      subtitle: 'Excellente Vision Tactique du Terrain',
      code: 'TL-EST',
      color: '#0B94D3',
      badge: 'POPULAIRE CHIC',
      categoryMatch: categories.find(c => c.name.toLowerCase().includes('latérale') || c.name.toLowerCase().includes('standard')) || categories[1] || categories[0],
      occupancy: 82,
      remaining: 240,
      door: 'Porte 08 (Accès Latéral Est)',
      price: categories.find(c => c.name.toLowerCase().includes('latérale') || c.name.toLowerCase().includes('standard'))?.price || 15000,
    },
    {
      id: 'virage_nord',
      name: 'Virage Nord (Kop Supporters)',
      subtitle: 'Ambiance Ultras & Fanfares en Direct',
      code: 'VN-NORD',
      color: '#10B981',
      badge: 'CHAUD SUPPORTERS',
      categoryMatch: categories.find(c => c.name.toLowerCase().includes('populaire') || c.name.toLowerCase().includes('virage')) || categories[categories.length - 1],
      occupancy: 89,
      remaining: 410,
      door: 'Porte 12 (Accès Virage Nord)',
      price: categories.find(c => c.name.toLowerCase().includes('populaire') || c.name.toLowerCase().includes('virage'))?.price || 5000,
    },
    {
      id: 'virage_sud',
      name: 'Virage Sud (Famille & Visiteurs)',
      subtitle: 'Convivial & Proche des Échauffements',
      code: 'VS-SUD',
      color: '#FF4B26',
      badge: 'FAMILLE',
      categoryMatch: categories.find(c => c.name.toLowerCase().includes('populaire') || c.name.toLowerCase().includes('virage')) || categories[categories.length - 1],
      occupancy: 76,
      remaining: 520,
      door: 'Porte 02 (Accès Virage Sud)',
      price: categories.find(c => c.name.toLowerCase().includes('populaire') || c.name.toLowerCase().includes('virage'))?.price || 5000,
    },
  ];

  const currentTribune = tribunes.find(t => t.id === activeTribuneKey) || tribunes[0];

  const handleSelectTribune = (tribuneId: string) => {
    setActiveTribuneKey(tribuneId);
    const target = tribunes.find(t => t.id === tribuneId);
    if (target) {
      onSelectCategory(target.categoryMatch);
      const newSeat = `Rangée C • Siège ${Math.floor(Math.random() * 12) + 5}`;
      onSelectSeat(newSeat);
      setSelectedSeatsList([newSeat]);
    }
  };

  const handleSeatClick = (seatCode: string) => {
    let nextList: string[];
    if (selectedSeatsList.includes(seatCode)) {
      if (selectedSeatsList.length > 1) {
        nextList = selectedSeatsList.filter(s => s !== seatCode);
      } else {
        nextList = [seatCode];
      }
    } else {
      if (selectedSeatsList.length < quantity) {
        nextList = [...selectedSeatsList, seatCode];
      } else {
        nextList = [seatCode];
      }
    }
    setSelectedSeatsList(nextList);
    onSelectSeat(nextList[0]);
    onQuantityChange(nextList.length);
  };

  // Mock seat layout: 6 rows (A to F), 18 seats per row
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 18;

  const isSeatTaken = (row: string, num: number) => {
    // deterministic mock of sold seats
    const hash = (row.charCodeAt(0) * 11 + num * 7) % 10;
    return hash === 2 || hash === 5 || hash === 8;
  };

  const isSeatVip = (row: string, num: number) => {
    return (row === 'A' || row === 'B') && (num >= 8 && num <= 11);
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      
      {/* 1. TOP BAR: TITLE, CAPACITY & MODE SWITCHER */}
      <div className="p-3 sm:p-5 bg-slate-900 text-white border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-athletic text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#0B94D3]">
              Plan du stade
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase">En direct</span>
          </div>
          <h2 className="font-athletic text-sm sm:text-2xl font-black uppercase text-white tracking-tight leading-tight mt-0.5">
            Choisissez votre tribune
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 font-medium truncate">
            {venueName} • Touchez une tribune
          </p>
        </div>

        {/* View Mode Tabs (3D Stadium / Seat Map / View From Seat) */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 sm:p-1 rounded-lg border border-slate-700/80 font-athletic text-[10px] sm:text-xs uppercase font-bold w-full sm:w-auto">
          <button
            onClick={() => setViewMode('stadium_3d')}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded transition flex items-center justify-center gap-1 ${
              viewMode === 'stadium_3d'
                ? 'bg-[#243A79] text-white font-black shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D</span>
          </button>

          <button
            onClick={() => setViewMode('seat_map')}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded transition flex items-center justify-center gap-1 ${
              viewMode === 'seat_map'
                ? 'bg-[#0B94D3] text-white font-black shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sièges</span>
          </button>

          <button
            onClick={() => setViewMode('view_from_seat')}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded transition flex items-center justify-center gap-1 ${
              viewMode === 'view_from_seat'
                ? 'bg-[#FF4B26] text-white font-black shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vue</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN DISPLAY AREA ACCORDING TO VIEW MODE */}
      <div className="relative bg-[#070C18] overflow-hidden min-h-[280px] sm:min-h-[420px] flex items-center justify-center p-2 sm:p-4 select-none">
        
        {/* Subtle Stadium Night Floodlights (Radials) */}
        <div className="absolute top-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,148,211,0.06)_0%,transparent_70%)] pointer-events-none" />

        {/* ========================================================= */}
        {/* MODE 1: 3D ISOMETRIC STADIUM ARCHITECTURE */}
        {/* ========================================================= */}
        {viewMode === 'stadium_3d' && (
          <div className="w-full flex flex-col items-center justify-center space-y-4 py-3">
            
            {/* Top Toolbar: Perspective & Quick Info */}
            <div className="w-full max-w-2xl flex items-center justify-between text-[10px] sm:text-xs font-athletic uppercase text-slate-400 z-10 px-1 sm:px-2 gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-bold text-white hidden xs:inline">Tribune :</span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded font-black text-slate-950 truncate max-w-[150px] sm:max-w-none" style={{ backgroundColor: currentTribune.color }}>
                  {currentTribune.name}
                </span>
                <span className="text-amber-300 font-bold hidden sm:inline">
                  • {currentTribune.price.toLocaleString()} FCFA
                </span>
              </div>

              {/* 3D vs 2D Perspective Toggle */}
              <button
                onClick={() => setIs3DIsometric(!is3DIsometric)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1 font-bold shrink-0"
              >
                <span className="sm:hidden">{is3DIsometric ? '3D' : '2D'}</span>
                <span className="hidden sm:inline">{is3DIsometric ? 'Perspective 3D Inclinée' : 'Vue 2D Aérienne'}</span>
              </button>
            </div>

            {/* Stadium Visual Box with 3D Perspective */}
            <div className="stadium-perspective-container w-full max-w-2xl h-[220px] xs:h-[260px] sm:h-[370px] relative flex items-center justify-center overflow-hidden">
              
              <div
                className={`relative w-[210px] h-[140px] xs:w-[250px] xs:h-[165px] sm:w-[480px] sm:h-[280px] rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-slate-700/80 bg-slate-900 shadow-2xl flex items-center justify-center transition-all duration-700 ${
                  is3DIsometric ? 'stadium-pitch-3d shadow-blue-500/20' : 'stadium-pitch-flat'
                }`}
                style={{
                  boxShadow: is3DIsometric 
                    ? '0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(11, 148, 211, 0.25)' 
                    : '0 10px 25px rgba(0,0,0,0.5)',
                }}
              >

                {/* --- 1. NORTH TRIBUNE (TOP) --- */}
                <button
                  onClick={() => handleSelectTribune('virage_nord')}
                  className={`absolute -top-7 xs:-top-8 sm:-top-13 left-6 xs:left-8 sm:left-10 right-6 xs:right-8 sm:right-10 py-1 sm:py-2.5 rounded-t-xl sm:rounded-t-2xl font-athletic text-[8px] xs:text-[10px] sm:text-sm font-black uppercase transition-all flex items-center justify-center gap-1 sm:gap-2 z-20 border-t-2 border-x-2 ${
                    activeTribuneKey === 'virage_nord'
                      ? 'bg-[#10B981] text-slate-950 border-emerald-300 scale-105 shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-400'
                      : 'bg-[#10B981]/20 text-emerald-300 border-emerald-500/40 hover:bg-[#10B981]/40'
                  }`}
                >
                  <span className="sm:hidden">NORD</span>
                  <span className="hidden sm:inline">VIRAGE NORD (KOP SUPPORTERS)</span>
                  <span className="text-[8px] sm:text-[10px] font-sans px-1 sm:px-1.5 py-0.2 rounded bg-black/40 text-emerald-200">
                    5k
                  </span>
                </button>

                {/* --- 2. SOUTH TRIBUNE (BOTTOM) --- */}
                <button
                  onClick={() => handleSelectTribune('virage_sud')}
                  className={`absolute -bottom-7 xs:-bottom-8 sm:-bottom-13 left-6 xs:left-8 sm:left-10 right-6 xs:right-8 sm:right-10 py-1 sm:py-2.5 rounded-b-xl sm:rounded-b-2xl font-athletic text-[8px] xs:text-[10px] sm:text-sm font-black uppercase transition-all flex items-center justify-center gap-1 sm:gap-2 z-20 border-b-2 border-x-2 ${
                    activeTribuneKey === 'virage_sud'
                      ? 'bg-[#FF4B26] text-white border-orange-300 scale-105 shadow-lg shadow-orange-500/40 ring-2 ring-orange-400'
                      : 'bg-[#FF4B26]/20 text-orange-300 border-orange-500/40 hover:bg-[#FF4B26]/40'
                  }`}
                >
                  <span className="sm:hidden">SUD</span>
                  <span className="hidden sm:inline">VIRAGE SUD (FAMILLE & VISITEURS)</span>
                  <span className="text-[8px] sm:text-[10px] font-sans px-1 sm:px-1.5 py-0.2 rounded bg-black/40 text-orange-200">
                    5k
                  </span>
                </button>

                {/* --- 3. WEST TRIBUNE: HONNEUR & VVIP (LEFT) --- */}
                <button
                  onClick={() => handleSelectTribune('honneur')}
                  className={`absolute -left-7 xs:-left-8 sm:-left-16 top-2 sm:top-4 bottom-2 sm:bottom-4 w-7 xs:w-8 sm:w-16 rounded-l-xl sm:rounded-l-2xl font-athletic text-[8px] sm:text-xs font-black uppercase transition-all flex flex-col items-center justify-center gap-0.5 sm:gap-1 z-20 border-l-2 border-y-2 writing-vertical-lr ${
                    activeTribuneKey === 'honneur'
                      ? 'bg-[#FFB020] text-slate-950 border-amber-200 scale-105 shadow-lg shadow-amber-500/40 ring-2 ring-amber-300'
                      : 'bg-[#FFB020]/20 text-amber-300 border-amber-500/40 hover:bg-[#FFB020]/40'
                  }`}
                >
                  <span className="rotate-180">VIP</span>
                  <span className="hidden sm:block text-[9px] font-sans bg-black/40 text-amber-200 px-1 rounded rotate-180">
                    50 000 F
                  </span>
                </button>

                {/* --- 4. EAST TRIBUNE: LATÉRALE (RIGHT) --- */}
                <button
                  onClick={() => handleSelectTribune('laterale')}
                  className={`absolute -right-7 xs:-right-8 sm:-right-16 top-2 sm:top-4 bottom-2 sm:bottom-4 w-7 xs:w-8 sm:w-16 rounded-r-xl sm:rounded-r-2xl font-athletic text-[8px] sm:text-xs font-black uppercase transition-all flex flex-col items-center justify-center gap-0.5 sm:gap-1 z-20 border-r-2 border-y-2 ${
                    activeTribuneKey === 'laterale'
                      ? 'bg-[#0B94D3] text-white border-sky-200 scale-105 shadow-lg shadow-sky-500/40 ring-2 ring-sky-300'
                      : 'bg-[#0B94D3]/20 text-sky-300 border-sky-500/40 hover:bg-[#0B94D3]/40'
                  }`}
                >
                  <span className="rotate-90">EST</span>
                  <span className="hidden sm:block text-[9px] font-sans bg-black/40 text-sky-200 px-1 rounded rotate-90">
                    15 000 F
                  </span>
                </button>

                {/* --- REALISTIC SOCCER PITCH IN CENTER --- */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/70 shadow-inner flex items-center justify-center bg-[#155e37]">
                  
                  {/* Pitch Lawn Mowing Stripes (Bandes de tonte alternées) */}
                  <div className="absolute inset-0 grid grid-cols-10 opacity-80 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={i % 2 === 0 ? 'bg-[#156e3b]' : 'bg-[#1b7e44]'}
                      />
                    ))}
                  </div>

                  {/* Field Boundary Lines */}
                  <div className="absolute inset-2 border-2 border-white/80 pointer-events-none rounded-sm" />

                  {/* Half-way Line */}
                  <div className="absolute top-2 bottom-2 left-1/2 w-0.5 bg-white/80 -translate-x-1/2 pointer-events-none" />

                  {/* Center Circle & Center Spot */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/80 flex items-center justify-center pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-white shadow" />
                  </div>

                  {/* Left Penalty Area (West Box) */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-14 sm:w-20 h-24 sm:h-32 border-r-2 border-y-2 border-white/80 pointer-events-none">
                    {/* Goal Area inside */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 sm:w-7 h-12 sm:h-16 border-r-2 border-y-2 border-white/80" />
                    {/* Goal Post 3D */}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-8 bg-white/90 rounded-sm shadow-md" />
                  </div>

                  {/* Right Penalty Area (East Box) */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-14 sm:w-20 h-24 sm:h-32 border-l-2 border-y-2 border-white/80 pointer-events-none">
                    {/* Goal Area inside */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 sm:w-7 h-12 sm:h-16 border-l-2 border-y-2 border-white/80" />
                    {/* Goal Post 3D */}
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2 h-8 bg-white/90 rounded-sm shadow-md" />
                  </div>

                  {/* Central Pitch Branding Tag */}
                  <div className="absolute z-10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white font-athletic text-[8px] sm:text-[11px] font-black uppercase tracking-widest pointer-events-none flex items-center gap-1.5">
                    <span>PELOUSE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34B3EC]" />
                  </div>

                  {/* LED Sponsor Boards Running Along Boundaries */}
                  <div className="absolute bottom-1 left-4 right-4 h-2 bg-slate-900 border-t border-amber-400/80 overflow-hidden flex items-center justify-around text-[7px] text-amber-300 font-bold uppercase pointer-events-none">
                    <span>NGSER BILLETTERIE OFFICIELLE</span>
                    <span>•</span>
                    <span>NGTICKET CI</span>
                    <span>•</span>
                    <span>TOURNOI GALA 2026</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Action Bar below 3D Stadium */}
            <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Info className="w-4 h-4 text-[#0B94D3] flex-shrink-0" />
                <span>Cliquez sur une tribune pour zoomer et voir le plan de sièges disponible.</span>
              </div>

              <button
                onClick={() => setViewMode('seat_map')}
                className="w-full sm:w-auto py-2 px-3 sm:px-4 rounded-lg bg-[#0B94D3] hover:bg-[#0980b8] text-white font-athletic text-[11px] sm:text-sm font-black uppercase tracking-wide sm:tracking-wider transition shadow flex items-center justify-center gap-1.5"
              >
                <span className="sm:hidden">Choisir mes sièges</span>
                <span className="hidden sm:inline">Choisir mes Sièges dans cette Tribune</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 2: DETAILED SEAT GRID SELECTION (PLAN DE SIÈGES) */}
        {/* ========================================================= */}
        {viewMode === 'seat_map' && (
          <div className="w-full max-w-2xl py-2 space-y-4">
            
            {/* Header: Selected Tribune & Block details */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-white">
              <div>
                <span className="font-athletic text-[10px] font-black uppercase tracking-widest text-[#0B94D3] block">
                  BLOC B-12 • ACCÈS PORTE 04
                </span>
                <h4 className="font-athletic text-xl font-black uppercase tracking-tight text-white leading-none">
                  {currentTribune.name}
                </h4>
              </div>

              <div className="flex items-center gap-4 text-xs font-athletic">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Prix du siège</span>
                  <span className="text-amber-400 text-lg font-black">{currentTribune.price.toLocaleString()} F</span>
                </div>
                <div className="border-l border-slate-700 pl-4">
                  <span className="text-slate-400 block text-[10px] uppercase">Siège(s) choisi(s)</span>
                  <span className="text-emerald-400 text-lg font-black">{selectedSeatsList.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Pitch Direction Marker */}
            <div className="w-full py-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-center text-[10px] font-athletic text-emerald-300 font-black uppercase tracking-widest">
              ⬇️ DIRECTION DE LA PELOUSE & DES JOUEURS (TERRAIN) ⬇️
            </div>

            {/* Realistic Stadium Rows & Seats Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 overflow-x-auto space-y-2">
              {rows.map((row) => (
                <div key={row} className="flex items-center justify-center gap-1.5 min-w-[500px]">
                  
                  {/* Row Label (Left) */}
                  <span className="w-6 text-center font-athletic text-xs font-black text-slate-400 uppercase">
                    R-{row}
                  </span>

                  {/* Seat buttons */}
                  <div className="flex items-center gap-1">
                    {[...Array(seatsPerRow)].map((_, i) => {
                      const seatNum = i + 1;
                      const seatCode = `Rangée ${row} • Siège ${seatNum}`;
                      const isTaken = isSeatTaken(row, seatNum);
                      const isVip = isSeatVip(row, seatNum);
                      const isSelected = selectedSeatsList.includes(seatCode);

                      return (
                        <React.Fragment key={seatNum}>
                          {/* Central Gangway / Aisle between seat 9 and 10 */}
                          {seatNum === 10 && (
                            <div className="w-3 sm:w-4 flex items-center justify-center">
                              <span className="h-4 w-0.5 bg-slate-800" />
                            </div>
                          )}

                          <button
                            type="button"
                            disabled={isTaken}
                            onClick={() => handleSeatClick(seatCode)}
                            onMouseEnter={() => setHoveredSeat(seatCode)}
                            onMouseLeave={() => setHoveredSeat(null)}
                            title={
                              isTaken 
                                ? `${seatCode} : Déjà réservé` 
                                : isSelected 
                                ? `${seatCode} : Votre sélection` 
                                : `${seatCode} : Disponible (${currentTribune.price.toLocaleString()} FCFA)`
                            }
                            className={`w-5 h-6 sm:w-6 sm:h-7 rounded-t-md text-[9px] font-bold transition-all relative flex flex-col items-center justify-between py-0.5 ${
                              isSelected
                                ? 'bg-[#FFB020] text-slate-950 ring-2 ring-white scale-110 z-10 shadow-lg font-black'
                                : isTaken
                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800/80 opacity-50'
                                : isVip
                                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                                : 'bg-[#0B94D3] hover:bg-[#34B3EC] hover:scale-105 text-white shadow-sm'
                            }`}
                          >
                            <span className="text-[7px] leading-none">{seatNum}</span>
                            <div className={`w-3.5 h-1 rounded-sm ${isSelected ? 'bg-slate-950' : 'bg-black/30'}`} />
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Row Label (Right) */}
                  <span className="w-6 text-center font-athletic text-xs font-black text-slate-400 uppercase">
                    R-{row}
                  </span>

                </div>
              ))}
            </div>

            {/* Seat Map Legend */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-300 font-athletic uppercase pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-t-sm bg-[#0B94D3]" />
                <span>Disponible</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-t-sm bg-[#FFB020] ring-1 ring-white" />
                <span className="text-amber-300 font-bold">Votre Sélection ({selectedSeatsList.length})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-t-sm bg-purple-600" />
                <span>Loges Privilèges</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-t-sm bg-slate-800 border border-slate-700" />
                <span className="text-slate-500">Occupé / Vendu</span>
              </span>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 3: REALISTIC 3D VIEW FROM SEAT (VUE DEPUIS LE SIÈGE) */}
        {/* ========================================================= */}
        {viewMode === 'view_from_seat' && (
          <div className="w-full max-w-2xl py-2 space-y-4">
            
            {/* 3D Perspective Photo/Graphic simulation */}
            <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl h-64 sm:h-72 bg-slate-900 group">
              
              {/* Background realistic stadium POV */}
              <div
                className="absolute inset-0 bg-cover bg-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: activeTribuneKey === 'honneur'
                    ? "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80')"
                    : activeTribuneKey === 'laterale'
                    ? "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80')"
                    : "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Holographic Seat Pointer in 3D View */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-[#FFB020] text-amber-300 font-athletic text-xs font-black uppercase tracking-wider shadow-xl flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Votre Vision : {selectedSeat}</span>
                </div>
                <div className="w-0.5 h-6 bg-[#FFB020]" />
                <div className="w-3 h-3 rounded-full bg-[#FFB020] ring-4 ring-amber-400/30 animate-ping" />
              </div>

              {/* Bottom Seat POV Metadata */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#243A79] font-athletic font-black uppercase text-white">
                    {currentTribune.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40 text-[11px]">
                    Angle 100% Sans Poteau
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2 font-athletic text-slate-300">
                  <span>Distance pelouse : <strong className="text-white">18 mètres</strong></span>
                </div>
              </div>

            </div>

            {/* Seat Comfort & Access Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-white">
                <span className="font-athletic text-[10px] font-bold text-slate-400 uppercase block">Porte d’Entrée</span>
                <span className="font-athletic text-base font-black text-amber-400">{currentTribune.door}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-white">
                <span className="font-athletic text-[10px] font-bold text-slate-400 uppercase block">Visibilité Écran Géant</span>
                <span className="font-athletic text-base font-black text-emerald-400">Directe 100% Panoramique</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-white">
                <span className="font-athletic text-[10px] font-bold text-slate-400 uppercase block">Services Inclus</span>
                <span className="font-athletic text-base font-black text-sky-400">Coupe-file & Buvette Proche</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 3. TRIBUNE SELECTOR BOTTOM RIBBON */}
      <div className="p-2.5 sm:p-4 bg-slate-50 border-t border-slate-200">
        <div className="text-[10px] sm:text-[11px] font-athletic uppercase text-slate-500 font-black mb-2 flex justify-between gap-2">
          <span>Votre zone</span>
          <span className="text-[#0B94D3] hidden xs:inline">Touchez pour changer</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2.5">
          {tribunes.map((tribune) => {
            const isSelected = activeTribuneKey === tribune.id;
            return (
              <button
                key={tribune.id}
                type="button"
                onClick={() => handleSelectTribune(tribune.id)}
                className={`p-2 sm:p-3 rounded-md sm:rounded-lg border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#243A79] bg-white ring-2 ring-[#0B94D3] shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: tribune.color }}
                    />
                    <span className="font-athletic text-[10px] font-bold uppercase text-slate-500">
                      {tribune.remaining} pl.
                    </span>
                  </div>
                  <h5 className="font-athletic text-[11px] sm:text-sm font-black uppercase text-slate-900 leading-tight">
                    {tribune.name}
                  </h5>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-athletic text-base font-black text-[#243A79]">
                    {tribune.price.toLocaleString()} <span className="text-[10px] font-sans font-bold">F</span>
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
