'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Star,
  CheckCircle2,
  X,
  Upload,
  Loader2,
  Search,
  ExternalLink,
  Github,
} from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Project } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog } from '@/components/ui/dialog';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { useToast } from '@/components/ui/toast';
import { createClient } from '@/lib/supabase/client';

export default function AdminProjectsPage() {
  const { toast } = useToast();
  const projFileInputRef = React.useRef<HTMLInputElement>(null);
  const projGalleryInputRef = React.useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);

  const emptyProject: Project = {
    id: '',
    title: '',
    slug: '',
    short_description: '',
    full_description: '',
    thumbnail_url: '',
    category: 'Web Application',
    technologies: [],
    project_year: new Date().getFullYear().toString(),
    live_url: '',
    github_url: '',
    is_featured: false,
    published: true,
    display_order: 1,
    gallery_images: [],
  };

  const [formData, setFormData] = useState<Project>(emptyProject);
  const [techInput, setTechInput] = useState('');

  const fetchProjects = async () => {
    const data = await dataService.getProjects();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ ...emptyProject, display_order: projects.length + 1 });
    setTechInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setFormData(project);
    setTechInput(project.technologies ? project.technologies.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: slugify(title),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('folder', 'projects');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => {
          const currentGallery = prev.gallery_images || [];
          const newGallery = isGallery ? [...currentGallery, ...uploadedUrls] : [...uploadedUrls, ...currentGallery];
          const newThumbnail = prev.thumbnail_url || uploadedUrls[0];
          return {
            ...prev,
            thumbnail_url: isGallery ? newThumbnail : uploadedUrls[0],
            gallery_images: Array.from(new Set(newGallery)),
          };
        });
        toast(`${uploadedUrls.length} gambar berhasil diunggah ke public/uploads/projects!`, 'success');
      }
    } catch (err) {
      toast('Gagal mengunggah gambar.', 'error');
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => {
      const updatedGallery = (prev.gallery_images || []).filter((_, idx) => idx !== indexToRemove);
      return { ...prev, gallery_images: updatedGallery };
    });
    toast('Gambar dihapus dari galeri.', 'info');
  };

  const handleSetAsThumbnail = (url: string) => {
    setFormData((prev) => ({ ...prev, thumbnail_url: url }));
    toast('Gambar ditetapkan sebagai thumbnail utama.', 'success');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast('Judul project wajib diisi.', 'error');
      return;
    }

    setSaving(true);
    try {
      const technologies = techInput.split(',').map((t) => t.trim()).filter(Boolean);
      const projectToSave = {
        ...formData,
        technologies,
      };

      await dataService.saveProject(projectToSave);
      toast(formData.id ? 'Project berhasil diperbarui!' : 'Project baru berhasil ditambahkan!', 'success');
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast('Terjadi kesalahan saat menyimpan project.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dataService.deleteProject(deleteTarget.id);
      toast('Project berhasil dihapus dari database.', 'success');
      setDeleteTarget(null);
      fetchProjects();
    } catch (err) {
      toast('Gagal menghapus project.', 'error');
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Project Portfolio CRUD</h2>
          <p className="text-xs text-muted-foreground">Tambah, edit, hapus, dan atur status publikasi project Anda</p>
        </div>
        <Button variant="gradient" onClick={handleOpenAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Tambah Project Baru</span>
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari project berdasarkan judul atau kategori..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Projects Data Table */}
      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                <th className="p-4">Thumbnail &amp; Project</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Tahun</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs text-muted-foreground">
                    Tidak ada project ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-muted shrink-0 border border-border/60">
                          {project.thumbnail_url ? (
                            <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px]">No Pic</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-foreground text-sm truncate max-w-xs">{project.title}</h4>
                          <span className="text-[11px] text-muted-foreground font-mono">/{project.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                    </td>

                    <td className="p-4 text-xs font-mono">{project.project_year}</td>

                    <td className="p-4">
                      {project.is_featured ? (
                        <Badge variant="primary" className="gap-1 bg-amber-500/20 text-amber-400 text-[10px]">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>Featured</span>
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>

                    <td className="p-4">
                      <Badge variant={project.published !== false ? 'success' : 'default'} className="text-[10px]">
                        {project.published !== false ? 'Published' : 'Draft'}
                      </Badge>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(project)}
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(project)}
                          title="Hapus Project"
                          className="hover:text-rose-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Dialog Form */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="2xl"
        title={formData.id ? 'Edit Project Portfolio' : 'Tambah Project Baru'}
      >
        <form onSubmit={handleSave} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Judul Project *</label>
              <Input value={formData.title} onChange={handleTitleChange} placeholder="Internal Audit Analyst System" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Slug (Auto)</label>
              <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Kategori</label>
              <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Web Application / Full Stack" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Tahun Project</label>
              <Input value={formData.project_year} onChange={(e) => setFormData({ ...formData, project_year: e.target.value })} placeholder="2024" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Urutan Tampilan</label>
              <Input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Deskripsi Singkat *</label>
            <Textarea rows={2} value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} placeholder="Ringkasan fitur utama project..." required />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Deskripsi Lengkap (Markdown / Text)</label>
            <Textarea rows={4} value={formData.full_description} onChange={(e) => setFormData({ ...formData, full_description: e.target.value })} placeholder="Penjelasan detail arsitektur, workflow, & fitur..." />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Teknologi Stack (Pisahkan koma &quot;,&quot;)</label>
            <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Next.js, TypeScript, Laravel, Tailwind CSS, Supabase" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Link Live Demo URL</label>
              <Input value={formData.live_url} onChange={(e) => setFormData({ ...formData, live_url: e.target.value })} placeholder="https://demo.taufikrahman.dev" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Link Repository GitHub</label>
              <Input value={formData.github_url} onChange={(e) => setFormData({ ...formData, github_url: e.target.value })} placeholder="https://github.com/taufikrahman29/repo" />
            </div>
          </div>

          {/* Image Uploader Thumbnail */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <label className="text-xs font-semibold block">Thumbnail Utama Project</label>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden border bg-muted shrink-0">
                {formData.thumbnail_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={formData.thumbnail_url} alt="Thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] flex items-center justify-center h-full">No image</span>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => projFileInputRef.current?.click()}
                className="gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Thumbnail Utama</span>
              </Button>
              <input
                ref={projFileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, false)}
                className="hidden"
              />
            </div>
          </div>

          {/* Multi-Image Gallery Manager (3+ Gambar) */}
          <div className="space-y-3 pt-3 border-t border-border/60">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold block text-foreground">
                  Galeri Foto Project (3 atau Lebih Gambar)
                </label>
                <span className="text-[11px] text-muted-foreground">
                  Pilih beberapa gambar sekaligus dari komputer untuk dijadikan galeri screenshot project.
                </span>
              </div>
              <Button
                type="button"
                variant="gradient"
                size="sm"
                onClick={() => projGalleryInputRef.current?.click()}
                className="gap-2 text-xs rounded-full"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Upload Beberapa Gambar</span>
              </Button>
              <input
                ref={projGalleryInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, true)}
                className="hidden"
              />
            </div>

            {/* Gallery Image Thumbnails Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {(formData.gallery_images || []).map((imgUrl, idx) => {
                const isMain = formData.thumbnail_url === imgUrl;
                return (
                  <div
                    key={idx}
                    className={`relative group rounded-xl overflow-hidden border-2 transition-all aspect-video shadow-sm ${
                      isMain ? 'border-primary ring-2 ring-primary/30' : 'border-border/80 hover:border-primary/40'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    
                    {isMain && (
                      <Badge variant="primary" className="absolute top-1.5 left-1.5 text-[9px] bg-primary text-white">
                        Thumbnail Utama
                      </Badge>
                    )}

                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                      {!isMain && (
                        <button
                          type="button"
                          onClick={() => handleSetAsThumbnail(imgUrl)}
                          className="px-2 py-1 rounded bg-primary text-white text-[10px] font-semibold hover:bg-primary/90"
                        >
                          Set Utama
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="p-1.5 rounded bg-rose-500 text-white hover:bg-rose-600"
                        title="Hapus gambar ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-muted-foreground pt-1">
              Total <strong>{(formData.gallery_images || []).length} gambar</strong> di dalam galeri project ini.
            </p>
          </div>

          {/* Toggle Switches */}
          <div className="flex items-center gap-6 pt-2 border-t border-border/60">
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
              <span className="text-xs font-semibold">Featured Project</span>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.published !== false}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <span className="text-xs font-semibold">Published (Tampil Publik)</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="gradient" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan Project'}
            </Button>
          </div>

        </form>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemTitle={deleteTarget?.title}
      />

    </div>
  );
}
