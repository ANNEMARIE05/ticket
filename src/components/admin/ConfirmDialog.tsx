'use client';

import React from 'react';
import { AlertTriangle, LogOut } from 'lucide-react';
import { AdminModal } from '@/components/admin/AdminModal';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'logout' | 'default';
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  variant = 'default',
}: ConfirmDialogProps) {
  const isLogout = variant === 'logout';
  const isDanger = variant === 'danger' || isLogout;

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={title}
      subtitle={isLogout ? 'Session' : 'Confirmation'}
      maxWidth="max-w-md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`h-10 px-5 rounded-md text-white text-sm font-semibold ${
              isDanger ? 'bg-[#0F172A] hover:bg-slate-800' : 'bg-[#1D4ED8] hover:bg-blue-700'
            }`}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
          {isLogout ? (
            <LogOut className="w-5 h-5 text-slate-700" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-slate-700" />
          )}
        </div>
        <p className="text-sm text-slate-600 leading-relaxed pt-1">{description}</p>
      </div>
    </AdminModal>
  );
}
