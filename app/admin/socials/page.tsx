'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Globe } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { SocialLink } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Dialog } from '@/components/ui/dialog';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { useToast } from '@/components/ui/toast';

export default function AdminSocialsPage() {
  const { toast } = useToast();
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SocialLink | null>(null);

  const emptyItem: SocialLink = {
    id: '',
    platform: '',
    url: '',
    icon: 'Globe',
    is_active: true,
    display_order: 1,
  };

  const [formData, setFormData] = useState<SocialLink>(emptyItem);

  const fetchItems = async () => {
    const data = await dataService.getSocials();
    setSocials(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ ...emptyItem, display_order: socials.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: SocialLink) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.platform || !formData.url) return;

    try {
      await dataService.saveSocial(formData);
      toast('Social media berhasil disimpan!', 'success');
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      toast('Gagal menyimpan.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dataService.deleteSocial(deleteTarget.id);
      toast('Social media dihapus.', 'success');
      setDeleteTarget(null);
      fetchItems();
    } catch (err) {
      toast('Gagal menghapus.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Social Media Management</h2>
          <p className="text-xs text-muted-foreground">Kelola tautan akun GitHub, LinkedIn, WhatsApp, Email, Instagram, dll.</p>
        </div>
        <Button variant="gradient" onClick={handleOpenAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Social Link</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
              <th className="p-4">Platform</th>
              <th className="p-4">URL Profile</th>
              <th className="p-4">Status Aktif</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {socials.map((soc) => (
              <tr key={soc.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4 font-bold text-foreground">{soc.platform}</td>
                <td className="p-4 text-xs font-mono text-primary truncate max-w-xs">{soc.url}</td>
                <td className="p-4">
                  <Switch
                    checked={soc.is_active}
                    onCheckedChange={async (checked) => {
                      await dataService.saveSocial({ ...soc, is_active: checked });
                      fetchItems();
                    }}
                  />
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(soc)}>
                      <Edit2 className="w-4 h-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(soc)} className="hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit Social Link' : 'Tambah Social Link Baru'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Platform (GitHub / LinkedIn / WhatsApp / Email) *</label>
            <Input value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} placeholder="GitHub" required />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Tautan URL *</label>
            <Input value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://github.com/username" required />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
            <span className="text-xs font-semibold">Aktifkan Tampilan di Website</span>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" variant="gradient">Simpan Link</Button>
          </div>
        </form>
      </Dialog>

      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} itemTitle={deleteTarget?.platform} />
    </div>
  );
}
