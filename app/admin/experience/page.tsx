'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Layers } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Experience } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog } from '@/components/ui/dialog';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { useToast } from '@/components/ui/toast';

export default function AdminExperiencePage() {
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Experience | null>(null);

  const emptyItem: Experience = {
    id: '',
    position: '',
    company: '',
    period: '',
    description: '',
    technologies: [],
    display_order: 1,
  };

  const [formData, setFormData] = useState<Experience>(emptyItem);
  const [techInput, setTechInput] = useState('');

  const fetchItems = async () => {
    const data = await dataService.getExperiences();
    setExperiences(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ ...emptyItem, display_order: experiences.length + 1 });
    setTechInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Experience) => {
    setFormData(item);
    setTechInput(item.technologies ? item.technologies.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.position || !formData.company) return;

    try {
      const technologies = techInput.split(',').map((t) => t.trim()).filter(Boolean);
      await dataService.saveExperience({ ...formData, technologies });
      toast('Pengalaman berhasil disimpan!', 'success');
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      toast('Gagal menyimpan pengalaman.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dataService.deleteExperience(deleteTarget.id);
      toast('Pengalaman berhasil dihapus.', 'success');
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
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Pengalaman Kerja CRUD</h2>
          <p className="text-xs text-muted-foreground">Kelola riwayat karir, posisi, perusahaan, dan teknologi</p>
        </div>
        <Button variant="gradient" onClick={handleOpenAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Pengalaman</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
              <th className="p-4">Posisi &amp; Perusahaan</th>
              <th className="p-4">Periode</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <h4 className="font-bold text-foreground">{exp.position}</h4>
                  <span className="text-xs text-primary font-semibold">{exp.company}</span>
                </td>
                <td className="p-4 text-xs font-mono text-muted-foreground">{exp.period}</td>
                <td className="p-4 text-xs text-muted-foreground max-w-sm truncate">{exp.description}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(exp)}>
                      <Edit2 className="w-4 h-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(exp)} className="hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Posisi / Jabatan *</label>
            <Input value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} placeholder="Full Stack Web Developer" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Perusahaan / Instansi *</label>
              <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Tech Company" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Periode (Tahun) *</label>
              <Input value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} placeholder="2023 - Present" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Deskripsi Peran &amp; Pencapaian</label>
            <Textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Tugas utama dan hasil pengerjaan..." />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Teknologi Digunakan (Pisahkan koma &quot;,&quot;)</label>
            <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Next.js, Laravel, Tailwind CSS" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" variant="gradient">Simpan Pengalaman</Button>
          </div>
        </form>
      </Dialog>

      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} itemTitle={deleteTarget?.position} />
    </div>
  );
}
