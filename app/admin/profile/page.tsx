'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, Save, Upload, Trash2, Camera, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Profile } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { createClient } from '@/lib/supabase/client';

export default function AdminProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    id: 'profile-1',
    name: '',
    avatar_url: '',
    headline: '',
    bio: '',
    email: '',
    whatsapp: '',
    location: '',
    availability_status: '',
    cv_url: '',
    roles: [],
  });

  const [rolesText, setRolesText] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const data = await dataService.getProfile();
      setProfile(data);
      setRolesText(data.roles ? data.roles.join(', ') : '');
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'profile');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Gagal upload');
      }

      const publicUrl = data.url;
      // ATOMIC PARTIAL UPDATE: Update ONLY avatar_url field in DB & Cache
      const updated = await dataService.patchProfile({ avatar_url: publicUrl });
      setProfile(updated);
      toast('Foto profil berhasil diperbarui dan tersinkron ke Publik!', 'success');
    } catch (err) {
      toast('Gagal mengunggah foto profil. Data lama tetap dipertahankan.', 'error');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      // ATOMIC PARTIAL UPDATE: Delete ONLY avatar_url field in DB & Cache
      const updated = await dataService.patchProfile({ avatar_url: '' });
      setProfile(updated);
      toast('Foto profil telah dihapus dan tersinkron ke Publik.', 'info');
    } catch (err) {
      toast('Gagal menghapus foto. Data lama tetap dipertahankan.', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const parsedRoles = rolesText.split(',').map((r) => r.trim()).filter(Boolean);
      const updatedProfile = {
        ...profile,
        roles: parsedRoles.length > 0 ? parsedRoles : profile.roles,
      };

      await dataService.updateProfile(updatedProfile);
      toast('Profile berhasil diperbarui dan tersinkron ke Halaman Publik!', 'success');
    } catch (err) {
      toast('Terjadi kesalahan saat menyimpan profil.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Pengaturan Profile</h2>
          <p className="text-xs text-muted-foreground">Kelola informasi pribadi, foto, headline, dan status pekerjaan Anda</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Avatar Upload Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Foto Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary/40 bg-muted shrink-0 shadow-md">
              {profile.avatar_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={profile.avatar_url} alt="Profile Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <User className="w-10 h-10" />
                </div>
              )}
              {uploadingAvatar && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              )}
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Button
                  type="button"
                  variant="gradient"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="gap-2"
                >
                  {uploadingAvatar ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>{uploadingAvatar ? 'Mengunggah...' : 'Upload Foto Baru'}</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />

                {profile.avatar_url && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteAvatar}
                    className="gap-1.5 text-rose-500 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Hapus</span>
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Format yang didukung: JPG, PNG, WebP. Maksimal ukuran 5MB. Gambar disimpan langsung di Supabase Storage.
              </p>
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-foreground">Atau Tautan URL Foto Profil</label>
                <Input
                  name="avatar_url"
                  value={profile.avatar_url}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Info Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Informasi Pribadi &amp; Karir</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Nama Lengkap</label>
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Taufik Rahman"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Status Availability</label>
                <Input
                  name="availability_status"
                  value={profile.availability_status}
                  onChange={handleChange}
                  placeholder="Available for Work"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Headline Profesional</label>
              <Input
                name="headline"
                value={profile.headline}
                onChange={handleChange}
                placeholder="Full Stack Web Developer & Information Systems Graduate"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Bio Singkat (Deskripsi Profil)</label>
              <Textarea
                name="bio"
                rows={4}
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tuliskan biografi dan keahlian utama Anda..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                Animated Roles (Pisahkan dengan koma &quot;,&quot;)
              </label>
              <Input
                value={rolesText}
                onChange={(e) => setRolesText(e.target.value)}
                placeholder="Full Stack Web Developer, Information Systems Graduate, Web Developer, IT Enthusiast"
              />
              <span className="text-[11px] text-muted-foreground">Teks role ini akan ditampilkan dengan efek animasi ketik di bagian Hero home.</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Email Official</label>
                <Input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="taufikrahman.dev@gmail.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Nomor WhatsApp</label>
                <Input
                  name="whatsapp"
                  value={profile.whatsapp}
                  onChange={handleChange}
                  placeholder="+6281234567890"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Lokasi</label>
                <Input
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="Indonesia"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-foreground">Link CV / Resume (URL PDF)</label>
              <Input
                name="cv_url"
                value={profile.cv_url}
                onChange={handleChange}
                placeholder="https://drive.google.com/..."
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
                <span>Simpan Perubahan Profile</span>
              </>
            )}
          </Button>
        </div>

      </form>
    </div>
  );
}
