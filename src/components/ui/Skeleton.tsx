import React from 'react';

// Base Skeleton Block
export function Skeleton({
  className = '',
  variant = 'light',
  style,
}: {
  className?: string;
  variant?: 'light' | 'dark';
  style?: React.CSSProperties;
}) {
  const baseBg = variant === 'dark' ? 'bg-slate-800' : 'bg-slate-200';

  return (
    <div
      style={style}
      className={`rounded ${variant === 'dark' ? baseBg : 'skeleton-shimmer'} ${variant === 'dark' ? 'animate-pulse' : ''} ${className}`}
    />
  );
}

// 1. Skeleton for Match & Event Cards (Catalogue & Homepage)
export function MatchCardSkeleton({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between p-0">
      {/* Top Header */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-4 w-28 rounded" />
        </div>
        <Skeleton className="h-4 w-20 rounded" />
      </div>

      {/* Body */}
      <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 flex-1">
        <div>
          <Skeleton className="h-7 w-4/5 rounded mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>
        </div>

        {/* Duel / Table Box */}
        <div className="bg-[#0b1224] rounded-lg p-3.5 space-y-2 border border-slate-800">
          <div className="flex justify-between items-center mb-1">
            <Skeleton className="h-3 w-20 rounded bg-slate-700" variant="dark" />
            <Skeleton className="h-3 w-24 rounded bg-slate-700" variant="dark" />
          </div>
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded bg-slate-700" variant="dark" />
              <Skeleton className="h-4 w-20 rounded bg-slate-700" variant="dark" />
            </div>
            <Skeleton className="h-4 w-12 rounded bg-slate-700" variant="dark" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 rounded bg-slate-700" variant="dark" />
              <Skeleton className="h-6 w-6 rounded bg-slate-700" variant="dark" />
            </div>
          </div>
        </div>

        {/* Quota Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div>
          <Skeleton className="h-3 w-16 rounded mb-1" />
          <Skeleton className="h-6 w-24 rounded" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
}

// 2. Skeleton for Hero Banner Carousel
export function HeroBannerSkeleton() {
  return (
    <div className="relative rounded-xl overflow-hidden bg-[#0D1527] border border-slate-800 shadow-2xl p-3.5 sm:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-36 rounded bg-slate-700" variant="dark" />
            <Skeleton className="h-6 w-44 rounded bg-slate-700" variant="dark" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-12 sm:h-16 w-11/12 rounded bg-slate-700" variant="dark" />
            <Skeleton className="h-5 w-2/3 rounded bg-slate-700" variant="dark" />
          </div>

          {/* Teams Box Skeleton */}
          <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-5 flex items-center gap-6 w-fit">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-lg bg-slate-700" variant="dark" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-24 rounded bg-slate-700" variant="dark" />
                <Skeleton className="h-3 w-14 rounded bg-slate-700" variant="dark" />
              </div>
            </div>
            <Skeleton className="h-8 w-12 rounded bg-slate-700" variant="dark" />
            <div className="flex items-center gap-3">
              <div className="space-y-1 text-right">
                <Skeleton className="h-5 w-24 rounded bg-slate-700" variant="dark" />
                <Skeleton className="h-3 w-14 rounded bg-slate-700" variant="dark" />
              </div>
              <Skeleton className="w-12 h-12 rounded-lg bg-slate-700" variant="dark" />
            </div>
          </div>

          {/* Action Button & Slider indicators */}
          <div className="flex items-center gap-4 pt-2">
            <Skeleton className="h-12 w-48 rounded-lg bg-slate-700" variant="dark" />
            <Skeleton className="h-12 w-36 rounded-lg bg-slate-700" variant="dark" />
          </div>
        </div>

        {/* Right Column (VIP Club Box) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32 rounded bg-slate-700" variant="dark" />
              <Skeleton className="h-5 w-16 rounded bg-slate-700" variant="dark" />
            </div>
            <Skeleton className="h-4 w-full rounded bg-slate-700" variant="dark" />
            <Skeleton className="h-4 w-4/5 rounded bg-slate-700" variant="dark" />
            <Skeleton className="h-10 w-full rounded-lg bg-slate-700" variant="dark" />
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-28 rounded bg-slate-700" variant="dark" />
              <Skeleton className="h-3 w-16 rounded bg-slate-700" variant="dark" />
            </div>
            <Skeleton className="h-2.5 w-full rounded-full bg-slate-700" variant="dark" />
          </div>
        </div>

      </div>
    </div>
  );
}

// 3. Skeleton for Trending Players
export function TrendingPlayerSkeleton() {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg border border-transparent">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>
      <Skeleton className="h-4 w-10 rounded" />
    </div>
  );
}

// 4. Skeleton for 2D Seat Map & Tribune Selector (Event Detail)
export function SeatMapSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <Skeleton className="h-5 w-32 rounded" />
        <Skeleton className="h-9 w-3/4 rounded" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-4 w-36 rounded" />
        </div>
      </div>

      {/* Grid: Map on Left, Booking on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <Skeleton className="h-6 w-48 rounded" />
          <Skeleton className="h-72 w-full rounded-xl" />
          <div className="grid grid-cols-4 gap-2 pt-2">
            <Skeleton className="h-8 rounded" />
            <Skeleton className="h-8 rounded" />
            <Skeleton className="h-8 rounded" />
            <Skeleton className="h-8 rounded" />
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <Skeleton className="h-6 w-40 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// 5. Skeleton for Dashboard / Backoffice KPI
export function DashboardKpiSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="w-9 h-9 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-36 rounded" />
          <Skeleton className="h-3 w-28 rounded" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({
  rows = 5,
  columns = 6,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="grid gap-4 px-4 py-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {Array.from({ length: columns }).map((__, col) => (
              <div key={col} className="space-y-2">
                <Skeleton className={`h-3.5 ${col === 0 ? 'w-4/5' : 'w-full'}`} />
                {col < 2 && <Skeleton className="h-2.5 w-2/3" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="flex items-end justify-between gap-4 animate-fade-in">
      <div className="space-y-2">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="h-10 w-44" />
    </div>
  );
}

export function FiltersSkeleton({ fields = 3 }: { fields?: number }) {
  return (
    <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-md border border-slate-200 bg-white p-3.5 shadow-sm space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-7 w-20" />
        </div>
      ))}
    </div>
  );
}

export function AdminPageSkeleton({
  filters = 4,
  columns = 6,
  rows = 5,
  showStats = true,
}: {
  filters?: number;
  columns?: number;
  rows?: number;
  showStats?: boolean;
}) {
  return (
    <div className="space-y-5">
      <PageHeaderSkeleton />
      {showStats && <StatsRowSkeleton />}
      <FiltersSkeleton fields={filters} />
      <TableSkeleton rows={rows} columns={columns} />
    </div>
  );
}

export function SplitViewSkeleton() {
  return (
    <div className="space-y-5">
      <PageHeaderSkeleton />
      <StatsRowSkeleton />
      <FiltersSkeleton fields={3} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <TableSkeleton rows={5} columns={3} />
        </div>
        <div className="lg:col-span-7 bg-white rounded-md border border-slate-200 shadow-sm p-5 space-y-4 animate-fade-in">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-80" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeaderSkeleton />
      <DashboardKpiSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 bg-white rounded-md border border-slate-200 shadow-sm p-5 space-y-4">
          <Skeleton className="h-4 w-48" />
          <div className="h-44 flex items-end justify-between gap-3">
            {[40, 65, 50, 80, 55, 90, 35].map((h, i) => (
              <Skeleton key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%` } as React.CSSProperties} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 bg-white rounded-md border border-slate-200 shadow-sm p-5 space-y-3">
          <Skeleton className="h-4 w-36" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </div>
      <TableSkeleton rows={5} columns={5} />
    </div>
  );
}

export function FormPageSkeleton() {
  return (
    <div className="space-y-5 max-w-3xl animate-fade-in">
      <div className="space-y-2">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-6 space-y-5">
        <Skeleton className="h-4 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}
