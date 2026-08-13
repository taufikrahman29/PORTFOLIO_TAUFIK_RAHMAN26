'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Save, Sparkles, Loader2 } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { SiteSettings } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';

export default function AdminAppearancePage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings>({
    primary_color: 'violet',
    accent_color: 'cyan',
    background_theme: 'dark',
    font_family: 'Inter',
    border_radius: '0.75rem',
    default_mode: 'dark',
    hero_gradient: 'from-violet-600/20 via-indigo-600/20 to-cyan-500/20',
    button_style: 'rounded-full',
    site_title: 'Taufik Rahman - Full Stack Developer Portfolio',
    meta_description: 'Portfolio profesional Taufik Rahman, Full Stack Web Developer & Information Systems Graduate.',
    meta_keywords: 'Taufik Rahman, Portfolio, Full Stack Developer, Next.js, React, Laravel, Tailwind CSS, Developer Indonesia',
    og_image_url: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const data = await dataService.getSettings();
      setSettings(data);
    }
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dataService.updateSettings(settings);
      toast('Pengaturan Tampilan & SEO berhasil diperbarui dan tersinkron!', 'success');
    } catch (err) {
      toast('Gagal menyimpan tampilan.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Appearance &amp; SEO Management</h2>
        <p className="text-xs text-muted-foreground">Kustomisasi tema warna, font, style komponen, dan metadata SEO website public</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Color Palette & Theme Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Tema Warna &amp; Style Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Skema Warna Utama (Primary Color)</label>
                <select
                  name="primary_color"
                  value={settings.primary_color}
                  onChange={handleChange}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="violet">Violet / Indigo Premium</option>
                  <option value="blue">Deep Ocean Blue</option>
                  <option value="emerald">Emerald Cyber Green</option>
                  <option value="rose">Rose Magenta</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Default Mode Tampilan</label>
                <select
                  name="default_mode"
                  value={settings.default_mode}
                  onChange={handleChange}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="dark">Dark Mode (Rekomendasi)</option>
                  <option value="light">Light Mode</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Hero Background Gradient Glow</label>
              <Input
                name="hero_gradient"
                value={settings.hero_gradient}
                onChange={handleChange}
                placeholder="from-violet-600/20 via-indigo-600/20 to-cyan-500/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Metadata Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Pengaturan SEO &amp; Open Graph</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Judul Website (SEO Site Title)</label>
              <Input
                name="site_title"
                value={settings.site_title}
                onChange={handleChange}
                placeholder="Taufik Rahman - Full Stack Developer Portfolio"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Deskripsi Meta (SEO Description)</label>
              <Textarea
                name="meta_description"
                rows={3}
                value={settings.meta_description}
                onChange={handleChange}
                placeholder="Deskripsi singkat yang muncul pada Google search result..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Meta Keywords</label>
              <Input
                name="meta_keywords"
                value={settings.meta_keywords}
                onChange={handleChange}
                placeholder="Taufik Rahman, Portfolio, Next.js, Laravel, Full Stack"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" size="lg" disabled={saving} className="gap-2">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan Appearance &amp; SEO</span>
              </>
            )}
          </Button>
        </div>

      </form>
    </div>
  );
}
