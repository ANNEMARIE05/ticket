import React from 'react';
import { Event } from '@/types';
import { flagImageUrl, getEventTeams, resolveTeamCountry } from '@/lib/teamFlags';

const SIZE_CLASS = {
  xs: 'w-4 h-3',
  sm: 'w-5 h-3.5',
  md: 'w-7 h-5',
  lg: 'w-10 h-7 sm:w-12 sm:h-8',
};

type FlagSize = keyof typeof SIZE_CLASS;

export function TeamFlag({
  name,
  countryCode,
  size = 'md',
  className = '',
}: {
  name?: string;
  countryCode?: string;
  size?: FlagSize;
  className?: string;
}) {
  const code = resolveTeamCountry(name, countryCode);
  if (!code) return null;

  return (
    <img
      src={flagImageUrl(code, size === 'lg' ? 160 : 80)}
      alt={name ? `Drapeau ${name}` : `Drapeau ${code.toUpperCase()}`}
      title={name}
      className={`${SIZE_CLASS[size]} object-cover rounded-sm shadow-sm ring-1 ring-black/10 shrink-0 ${className}`}
    />
  );
}

export function MatchTeams({
  home,
  away,
  homeCode,
  awayCode,
  variant = 'dark',
  size = 'md',
}: {
  home?: string;
  away?: string;
  homeCode?: string;
  awayCode?: string;
  variant?: 'dark' | 'light';
  size?: FlagSize;
}) {
  if (!home || !away) return null;

  const nameClass =
    variant === 'dark'
      ? 'text-slate-100'
      : 'text-slate-900';

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
        <TeamFlag name={home} countryCode={homeCode} size={size} />
        <span className={`font-athletic text-xs sm:text-sm font-black uppercase truncate ${nameClass}`}>
          {home}
        </span>
      </div>
      <span className="font-athletic text-[10px] sm:text-xs font-black text-[#FF4B26] tracking-widest shrink-0 px-1">
        VS
      </span>
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 justify-end">
        <span className={`font-athletic text-xs sm:text-sm font-black uppercase truncate text-right ${nameClass}`}>
          {away}
        </span>
        <TeamFlag name={away} countryCode={awayCode} size={size} />
      </div>
    </div>
  );
}

export function EventMatchTeams({
  event,
  variant = 'dark',
  size = 'md',
}: {
  event: Pick<Event, 'title' | 'teamHome' | 'teamAway'>;
  variant?: 'dark' | 'light';
  size?: FlagSize;
}) {
  const teams = getEventTeams(event);
  if (!teams.isMatch) return null;
  return (
    <MatchTeams
      home={teams.home}
      away={teams.away}
      homeCode={teams.homeCode}
      awayCode={teams.awayCode}
      variant={variant}
      size={size}
    />
  );
}
