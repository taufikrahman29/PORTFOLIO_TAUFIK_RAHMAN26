'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Code, Save } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Skill } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { IconRenderer } from '@/components/ui/icon-renderer';
import { useToast } from '@/components/ui/toast';

export default function AdminSkillsPage() {
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Skill | null>(null);

  const emptySkill: Skill = {
    id: '',
    name: '',
    category: 'Frontend',
    level: 85,
    icon: 'Code',
    display_order: 1,
  };

  const [formData, setFormData] = useState<Skill>(emptySkill);

  const fetchSkills = async () => {
    const data = await dataService.getSkills();
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ ...emptySkill, display_order: skills.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setFormData(skill);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      await dataService.saveSkill(formData);
      toast('Skill berhasil disimpan!', 'success');
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      toast('Gagal menyimpan skill.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dataService.deleteSkill(deleteTarget.id);
      toast('Skill berhasil dihapus.', 'success');
      setDeleteTarget(null);
      fetchSkills();
    } catch (err) {
      toast('Gagal menghapus skill.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Skills &amp; Tech Stack CRUD</h2>
          <p className="text-xs text-muted-foreground">Kelola keahlian, tingkat penguasaan (0-100%), dan icon teknologi</p>
        </div>
        <Button variant="gradient" onClick={handleOpenAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Skill Baru</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
              <th className="p-4">Icon &amp; Skill Name</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Level (%)</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3 font-bold text-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <IconRenderer name={skill.icon || 'Code'} className="w-4 h-4" />
                    </div>
                    <span>{skill.name}</span>
                  </div>
                </td>
                <td className="p-4 text-xs font-medium text-muted-foreground">{skill.category}</td>
                <td className="p-4 text-xs font-mono font-bold text-primary">{skill.level}%</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(skill)}>
                      <Edit2 className="w-4 h-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(skill)} className="hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Skill' : 'Tambah Skill Baru'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Nama Skill / Teknologi *</label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Next.js" required />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Kategori</label>
            <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Frontend / Backend / Database" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Level Progress (0 - 100%)</label>
              <Input type="number" min={0} max={100} value={formData.level} onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 0 })} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Nama Icon Lucide</label>
              <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="Code / Globe / Server" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" variant="gradient">Simpan Skill</Button>
          </div>
        </form>
      </Dialog>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemTitle={deleteTarget?.name}
      />
    </div>
  );
}
