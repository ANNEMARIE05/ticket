'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, authReady } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authReady) return;
    if (!user.isLoggedIn) {
      const next = pathname && pathname !== '/connexion' ? `?next=${encodeURIComponent(pathname)}` : '';
      router.replace(`/connexion${next}`);
    }
  }, [authReady, user.isLoggedIn, pathname, router]);

  if (!authReady || !user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F3F5F9] flex items-center justify-center text-sm text-slate-500">
        Redirection vers la connexion…
      </div>
    );
  }

  return <>{children}</>;
}
