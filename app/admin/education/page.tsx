'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GraduationCap } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Education } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog } from '@/components/ui/dialog';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { useToast } from '@/components/ui/toast';

export default function AdminEducationPage() {
  const { toast } = useToast();
  const [educations, setEducations] = useState<Education[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Education | null>(null);

  const emptyItem: Education = {
    id: '',
    university: '',
    major: '',
    year: '',
    gpa: '',
    description: '',
    display_order: 1,
  };

  const [formData, setFormData] = useState<Education>(emptyItem);

  const fetchItems = async () => {
    const data = await dataService.getEducations();
    setEducations(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ ...emptyItem, display_order: educations.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Education) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.university || !formData.major) return;

    try {
      await dataService.saveEducation(formData);
      toast('Data pendidikan berhasil disimpan!', 'success');
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      toast('Gagal menyimpan.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dataService.deleteEducation(deleteTarget.id);
      toast('Data pendidikan dihapus.', 'success');
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
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Pendidikan CRUD</h2>
          <p className="text-xs text-muted-foreground">Ubah data perguruan tinggi, program studi, tahun, dan IPK</p>
        </div>
        <Button variant="gradient" onClick={handleOpenAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Pendidikan</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
              <th className="p-4">Perguruan Tinggi &amp; Major</th>
              <th className="p-4">Tahun</th>
              <th className="p-4">IPK</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {educations.map((edu) => (
              <tr key={edu.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <h4 className="font-bold text-foreground">{edu.university}</h4>
                  <span className="text-xs text-accent font-semibold">{edu.major}</span>
                </td>
                <td className="p-4 text-xs font-mono text-muted-foreground">{edu.year}</td>
                <td className="p-4 text-xs font-mono font-bold text-emerald-500">{edu.gpa || '-'}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(edu)}>
                      <Edit2 className="w-4 h-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(edu)} className="hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit Pendidikan' : 'Tambah Pendidikan Baru'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Universitas / Perguruan Tinggi *</label>
            <Input value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} placeholder="Universitas Indonesia" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Program Studi / Major *</label>
              <Input value={formData.major} onChange={(e) => setFormData({ ...formData, major: e.target.value })} placeholder="Sistem Informasi (S.Kom)" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Tahun Pendidikan</label>
              <Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="2019 - 2023" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">IPK (GPA)</label>
            <Input value={formData.gpa} onChange={(e) => setFormData({ ...formData, gpa: e.target.value })} placeholder="3.85 / 4.00" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Deskripsi Singkat</label>
            <Textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Predikat kelulusan dan prestasi akademis..." />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" variant="gradient">Simpan Pendidikan</Button>
          </div>
        </form>
      </Dialog>

      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} itemTitle={deleteTarget?.university} />
    </div>
  );
}
