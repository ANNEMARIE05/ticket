'use client';

import React from 'react';
import { Activity, Ticket } from 'lucide-react';

interface StadiumLoaderProps {
  label?: string;
  sublabel?: string;
  fullscreen?: boolean;
}

export default function StadiumLoader({
  label = 'Synchronisation Billetterie Live NGSER...',
  sublabel = 'Vérification des quotas de sièges et des tourniquets du stade',
  fullscreen = false,
}: StadiumLoaderProps) {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      
      {/* Stadium Animated Beacon */}
      <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#0B94D3]/40 animate-ping opacity-75" />
        
        {/* Middle Rotating Dashed Ring */}
        <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#FF4B26] animate-[spin_4s_linear_infinite]" />
        
        {/* Inner Solid Ring with Glow */}
        <div className="absolute inset-2 rounded-full border-2 border-[#243A79] bg-[#243A79]/10 shadow-lg flex items-center justify-center" />

        {/* Center Soccer/Ticket Icon with Pulse */}
        <div className="relative z-10 w-10 h-10 rounded-full bg-[#243A79] text-white flex items-center justify-center shadow-md animate-stadium-pulse">
          <Ticket className="w-5 h-5 text-[#34B3EC]" />
        </div>
      </div>

      {/* Sporty Loading Text */}
      <div className="space-y-1">
        <h4 className="font-athletic text-xl font-black uppercase tracking-wider text-[#243A79] flex items-center justify-center gap-2">
          <span>{label}</span>
          <Activity className="w-4 h-4 text-[#FF4B26] animate-pulse" />
        </h4>
        {sublabel && (
          <p className="text-xs text-slate-500 font-medium max-w-sm">
            {sublabel}
          </p>
        )}
      </div>

      {/* Athletic Progress bar with animated gradient */}
      <div className="w-48 h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden relative">
        <div className="h-full bg-gradient-to-r from-[#243A79] via-[#0B94D3] to-[#FF4B26] rounded-full w-full" />
      </div>

    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-2">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center py-8">
      {content}
    </div>
  );
}
