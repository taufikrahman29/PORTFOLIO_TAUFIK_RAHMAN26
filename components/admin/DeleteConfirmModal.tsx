'use client';

import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemTitle?: string;
  isDeleting?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Hapus Data',
  itemTitle,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="text-center space-y-4 py-2">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">
            Apakah Anda yakin ingin menghapus data {itemTitle ? <strong>&quot;{itemTitle}&quot;</strong> : 'ini'}? Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isDeleting}>
            Batal
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={isDeleting}
            className="gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'Hapus...' : 'Ya, Hapus'}</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
