'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export const adminInputClass =
  'w-full bg-white border border-slate-300 rounded-md px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-300 focus:outline-none transition';

export const adminLabelClass = 'block text-sm font-semibold text-slate-700 mb-1.5';

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accent?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export function AdminModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-2xl',
}: AdminModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4 isolate">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/55"
        onClick={onClose}
        aria-label="Fermer la fenêtre"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${maxWidth} bg-white rounded-t-xl sm:rounded-md shadow-modal border border-slate-200 overflow-hidden flex flex-col max-h-[min(94vh,820px)]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-3.5 sm:px-5 py-3 sm:py-4 border-b border-slate-200 flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            {subtitle && (
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{subtitle}</p>
            )}
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-0.5">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-3.5 sm:p-5 overflow-y-auto flex-1 min-h-0">{children}</div>
        {footer && (
          <div className="px-3.5 sm:px-5 py-3 sm:py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2 sm:gap-3 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export function AdminNotice({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-[400] max-w-sm rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-lg">
      {message}
    </div>
  );
}
