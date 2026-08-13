'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Globe } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog } from '@/components/ui/dialog';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { IconRenderer } from '@/components/ui/icon-renderer';
import { useToast } from '@/components/ui/toast';

export default function AdminServicesPage() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  const emptyItem: Service = {
    id: '',
    title: '',
    description: '',
    icon: 'Layout',
    display_order: 1,
  };

  const [formData, setFormData] = useState<Service>(emptyItem);

  const fetchItems = async () => {
    const data = await dataService.getServices();
    setServices(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ ...emptyItem, display_order: services.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Service) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    try {
      await dataService.saveService(formData);
      toast('Layanan berhasil disimpan!', 'success');
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      toast('Gagal menyimpan layanan.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dataService.deleteService(deleteTarget.id);
      toast('Layanan dihapus.', 'success');
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
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Services &amp; Layanan CRUD</h2>
          <p className="text-xs text-muted-foreground">Atur daftar layanan pengembangan IT yang ditawarkan kepada klien</p>
        </div>
        <Button variant="gradient" onClick={handleOpenAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
              <th className="p-4">Icon &amp; Nama Layanan</th>
              <th className="p-4">Deskripsi Layanan</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {services.map((srv) => (
              <tr key={srv.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3 font-bold text-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <IconRenderer name={srv.icon || 'Layout'} className="w-4 h-4" />
                    </div>
                    <span>{srv.title}</span>
                  </div>
                </td>
                <td className="p-4 text-xs text-muted-foreground max-w-md">{srv.description}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(srv)}>
                      <Edit2 className="w-4 h-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(srv)} className="hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit Layanan' : 'Tambah Layanan Baru'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Nama Layanan *</label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Website Development" required />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Nama Icon Lucide</label>
            <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="Globe / Layout / Database / ShieldCheck" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Deskripsi Layanan</label>
            <Textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Penjelasan rincian penawaran layanan..." />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" variant="gradient">Simpan Layanan</Button>
          </div>
        </form>
      </Dialog>

      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} itemTitle={deleteTarget?.title} />
    </div>
  );
}
