'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Trash2, CheckCircle2, Eye, Reply } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Message } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { useToast } from '@/components/ui/toast';

export default function AdminMessagesPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);

  const fetchMessages = async () => {
    const data = await dataService.getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string) => {
    await dataService.toggleReadMessage(id);
    toast('Status dibaca berhasil diperbarui.', 'info');
    fetchMessages();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dataService.deleteMessage(deleteTarget.id);
      toast('Pesan berhasil dihapus.', 'success');
      setDeleteTarget(null);
      fetchMessages();
    } catch (err) {
      toast('Gagal menghapus pesan.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Pesan Masuk Inbox</h2>
          <p className="text-xs text-muted-foreground">Kelola pesan dan kontak dari pengunjung website public</p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-border bg-card text-muted-foreground text-sm">
            Belum ada pesan masuk di inbox.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl border transition-all shadow-sm space-y-4 ${
                !msg.is_read
                  ? 'border-primary/50 bg-primary/5 dark:bg-primary/10'
                  : 'border-border/80 bg-card'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-foreground">{msg.name}</h4>
                    {!msg.is_read ? (
                      <Badge variant="warning" className="text-[10px]">Baru (Belum Dibaca)</Badge>
                    ) : (
                      <Badge variant="default" className="text-[10px]">Sudah Dibaca</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <span>{msg.email}</span>
                    </span>
                    {msg.whatsapp && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{msg.whatsapp}</span>
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {formatDate(msg.created_at)}
                </span>
              </div>

              <div className="space-y-2">
                {msg.subject && (
                  <h5 className="font-semibold text-sm text-foreground">Subjek: {msg.subject}</h5>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/30 p-4 rounded-xl">
                  {msg.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleRead(msg.id)}
                  className="gap-1.5 text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{msg.is_read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}</span>
                </Button>

                <div className="flex items-center gap-2">
                  {msg.whatsapp && (
                    <a
                      href={`https://wa.me/${msg.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(msg.name)},%20terima%20kasih%20telah%20menghubungi%20saya.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Balas WhatsApp</span>
                      </Button>
                    </a>
                  )}

                  <a href={`mailto:${msg.email}?subject=Re:%20${encodeURIComponent(msg.subject || 'Balasan Kontak Portfolio')}`}>
                    <Button variant="gradient" size="sm" className="gap-1.5 text-xs">
                      <Reply className="w-3.5 h-3.5" />
                      <span>Balas Email</span>
                    </Button>
                  </a>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(msg)}
                    className="hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemTitle={`Pesan dari ${deleteTarget?.name}`}
      />
    </div>
  );
}
