'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, Upload, Star, Loader2, UserCheck } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Testimonial } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { useToast } from '@/components/ui/toast';

export default function AdminTestimonialsPage() {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  const emptyItem: Testimonial = {
    id: '',
    name: '',
    role: '',
    company: '',
    avatar_url: '',
    content: '',
    rating: 5,
    display_order: 1,
  };

  const [formData, setFormData] = useState<Testimonial>(emptyItem);

  const fetchItems = async () => {
    const data = await dataService.getTestimonials();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ ...emptyItem, display_order: items.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'testimonials');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Gagal upload');

      setFormData((prev) => ({ ...prev, avatar_url: data.url }));
      toast('Foto pemberi testimoni berhasil diunggah.', 'success');
    } catch (err) {
      toast('Gagal unggah foto.', 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      toast('Nama dan isi testimoni wajib diisi.', 'error');
      return;
    }

    setSaving(true);
    try {
      await dataService.saveTestimonial(formData);
      await fetchItems();
      setIsModalOpen(false);
      toast('Testimoni berhasil disimpan!', 'success');
    } catch (err) {
      toast('Gagal menyimpan testimoni.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dataService.deleteTestimonial(deleteTarget.id);
      await fetchItems();
      setDeleteTarget(null);
      toast('Testimoni dihapus.', 'info');
    } catch (err) {
      toast('Gagal menghapus.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Kelola Testimoni Klien &amp; Mitra</h2>
          <p className="text-xs text-muted-foreground">Kelola ulasan, apresiasi, dan rekomendasi instansi untuk ditampilkan sebelum kontak</p>
        </div>
        <Button onClick={handleOpenAdd} variant="gradient" className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni</span>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Daftar Testimoni ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-border bg-card space-y-3 relative group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border bg-muted shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.role} &bull; {item.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(item)}>
                      <Edit2 className="w-4 h-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(item)} className="hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 italic">
                  &ldquo;{item.content}&rdquo;
                </p>

                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          <h3 className="text-lg font-bold">
            {formData.id ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Nama Pemberi Testimoni</label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Drs. H. Rukmana, M.Si." required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Jabatan / Posisi</label>
              <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="Kepala Dinas" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Instansi / Perusahaan</label>
              <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Disnaker Kab. Bandung" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Isi Ulasan Testimoni</label>
            <Textarea rows={3} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Tuliskan testimoni apresiasi..." required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Rating Bintang (1 - 5)</label>
              <Input type="number" min={1} max={5} value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Urutan Tampilan</label>
              <Input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })} />
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border/60">
            <label className="text-xs font-semibold block">Foto Profil Pemberi Testimoni</label>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0 border">
                {formData.avatar_url && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={formData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                )}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Foto</span>
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" variant="gradient" disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
              <span>Simpan</span>
            </Button>
          </div>
        </form>
      </Dialog>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Testimoni"
        itemTitle={deleteTarget?.name || 'testimoni ini'}
      />

    </div>
  );
}
