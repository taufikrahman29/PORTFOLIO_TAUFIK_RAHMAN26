'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Award, Upload } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Certificate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { useToast } from '@/components/ui/toast';
import { createClient } from '@/lib/supabase/client';

export default function AdminCertificatesPage() {
  const { toast } = useToast();
  const certFileInputRef = React.useRef<HTMLInputElement>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);

  const emptyItem: Certificate = {
    id: '',
    title: '',
    issuer: '',
    year: '',
    credential_id: '',
    credential_url: '',
    image_url: '',
    display_order: 1,
  };

  const [formData, setFormData] = useState<Certificate>(emptyItem);

  const fetchItems = async () => {
    const data = await dataService.getCertificates();
    setCertificates(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ ...emptyItem, display_order: certificates.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Certificate) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'certificates');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Gagal upload');

      setFormData((prev) => ({ ...prev, image_url: data.url }));
      toast('Gambar sertifikat berhasil tersimpan ke File Manager (public/uploads/certificates)!', 'success');
    } catch (err) {
      toast('Gagal unggah gambar.', 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) return;

    try {
      await dataService.saveCertificate(formData);
      toast('Sertifikat berhasil disimpan!', 'success');
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      toast('Gagal menyimpan sertifikat.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dataService.deleteCertificate(deleteTarget.id);
      toast('Sertifikat dihapus.', 'success');
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
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Sertifikasi CRUD</h2>
          <p className="text-xs text-muted-foreground">Tambah, edit, dan upload gambar sertifikat kompetensi IT Anda</p>
        </div>
        <Button variant="gradient" onClick={handleOpenAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Sertifikat</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
              <th className="p-4">Gambar &amp; Judul Sertifikat</th>
              <th className="p-4">Penerbit</th>
              <th className="p-4">Tahun</th>
              <th className="p-4">Credential ID</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-9 rounded overflow-hidden bg-muted shrink-0 border border-border/60">
                      {cert.image_url ? (
                        <Image src={cert.image_url} alt={cert.title} fill className="object-cover" />
                      ) : (
                        <Award className="w-4 h-4 m-auto text-muted-foreground" />
                      )}
                    </div>
                    <span className="font-bold text-foreground truncate max-w-xs">{cert.title}</span>
                  </div>
                </td>
                <td className="p-4 text-xs font-semibold text-primary">{cert.issuer}</td>
                <td className="p-4 text-xs font-mono">{cert.year}</td>
                <td className="p-4 text-xs font-mono text-muted-foreground">{cert.credential_id || '-'}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(cert)}>
                      <Edit2 className="w-4 h-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(cert)} className="hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Nama Sertifikat *</label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Full Stack Web Developer Certification" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Lembaga Penerbit *</label>
              <Input value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} placeholder="BNSP / Global Tech" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Tahun</label>
              <Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="2024" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Nomor Credential ID</label>
              <Input value={formData.credential_id} onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })} placeholder="BNSP-88912" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Link Verifikasi URL</label>
              <Input value={formData.credential_url} onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })} placeholder="https://verify.cert.org" />
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border/60">
            <label className="text-xs font-semibold block">Gambar Sertifikat</label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-14 rounded overflow-hidden bg-muted shrink-0 border">
                {formData.image_url && <Image src={formData.image_url} alt="Cert" fill className="object-cover" />}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => certFileInputRef.current?.click()}
                className="gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Gambar</span>
              </Button>
              <input
                ref={certFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" variant="gradient">Simpan Sertifikat</Button>
          </div>
        </form>
      </Dialog>

      <DeleteConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} itemTitle={deleteTarget?.title} />
    </div>
  );
}
