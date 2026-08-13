'use client';

import React, { useState } from 'react';
import { Settings, Database, CheckCircle2, Copy, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const supabase = createClient();
  const isSupabaseConnected = !!supabase;

  const handleCopySql = () => {
    const sqlText = `-- Jalankan SQL file di Supabase Editor: /supabase/schema.sql`;
    navigator.clipboard.writeText(sqlText);
    toast('Instruksi SQL berhasil disalin ke clipboard!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Pengaturan Sistem &amp; Database</h2>
        <p className="text-xs text-muted-foreground">Status koneksi Supabase, autentikasi, dan instruksi database</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <span>Status Supabase Database &amp; Storage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-border/80 bg-muted/30">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground block">Koneksi Supabase Client:</span>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isSupabaseConnected ? (
                  <span className="text-emerald-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Terhubung (Active Connection)</span>
                  </span>
                ) : (
                  <span className="text-amber-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Mode Local Sync / Demo Ready</span>
                  </span>
                )}
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={handleCopySql} className="gap-1.5 text-xs">
              <Copy className="w-3.5 h-3.5" />
              <span>Copy SQL Script</span>
            </Button>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              Untuk menghubungkan dengan database Supabase produksi Anda, masukkan kredensial berikut ke dalam file <code>.env.local</code>:
            </p>
            <pre className="p-3 rounded-lg bg-card border font-mono text-[11px] overflow-x-auto text-foreground">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key`}
            </pre>
            <p>
              Skema SQL lengkap dengan 11 tabel relasional dan aturan RLS dapat ditemukan pada file <code>supabase/schema.sql</code>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
