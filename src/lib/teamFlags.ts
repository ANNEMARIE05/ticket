import { Event } from '@/types';

const COUNTRY_BY_NAME: Record<string, string> = {
  'cote d ivoire': 'ci',
  cote: 'ci',
  civ: 'ci',
  elephants: 'ci',
  senegal: 'sn',
  sen: 'sn',
  teranga: 'sn',
  mali: 'ml',
  ghana: 'gh',
  nigeria: 'ng',
  cameroun: 'cm',
  cameroon: 'cm',
  maroc: 'ma',
  morocco: 'ma',
  algerie: 'dz',
  algeria: 'dz',
  tunisie: 'tn',
  tunisia: 'tn',
  'burkina faso': 'bf',
  'guinee': 'gn',
  'guinee equatoriale': 'gq',
  gabon: 'ga',
  togo: 'tg',
  benin: 'bj',
  france: 'fr',
  italie: 'it',
  italy: 'it',
  portugal: 'pt',
  espagne: 'es',
  spain: 'es',
  allemagne: 'de',
  germany: 'de',
  angleterre: 'gb-eng',
  england: 'gb-eng',
  bresil: 'br',
  brazil: 'br',
  argentine: 'ar',
  argentina: 'ar',
};

const TEAM_COUNTRY: Record<string, string> = {
  cameroun: 'cm',
  cameroon: 'cm',
  lions: 'cm',
  nigeria: 'ng',
  nigéria: 'ng',
  'super eagles': 'ng',
  'coton sport': 'cm',
  coton: 'cm',
  'canon yaounde': 'cm',
  canon: 'cm',
  'union douala': 'cm',
  union: 'cm',
  'colombe du dja': 'cm',
  colombe: 'cm',
  'fap yaounde': 'cm',
  fap: 'cm',
  beac: 'cm',
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’`]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function resolveTeamCountry(name?: string, countryCode?: string): string | undefined {
  const explicit = countryCode?.trim().toLowerCase();
  if (explicit) return explicit;

  if (!name) return undefined;
  const key = normalize(name);
  if (!key) return undefined;

  if (TEAM_COUNTRY[key]) return TEAM_COUNTRY[key];
  if (COUNTRY_BY_NAME[key]) return COUNTRY_BY_NAME[key];

  const hit = Object.entries({ ...COUNTRY_BY_NAME, ...TEAM_COUNTRY }).find(([label]) =>
    key.includes(label)
  );
  return hit?.[1];
}

export function splitMatchTitle(title?: string): { home?: string; away?: string } {
  if (!title) return {};
  const parts = title.split(/\s+vs\.?\s+/i);
  if (parts.length !== 2) return {};
  return { home: parts[0].trim(), away: parts[1].trim() };
}

export function getEventTeams(event: Pick<Event, 'title' | 'teamHome' | 'teamAway'>) {
  const fromTitle = splitMatchTitle(event.title);
  const home = event.teamHome?.name || fromTitle.home;
  const away = event.teamAway?.name || fromTitle.away;
  return {
    home,
    away,
    homeCode: resolveTeamCountry(home, event.teamHome?.countryCode),
    awayCode: resolveTeamCountry(away, event.teamAway?.countryCode),
    isMatch: Boolean(home && away),
  };
}

export function flagImageUrl(code: string, width = 80) {
  return `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`;
}
