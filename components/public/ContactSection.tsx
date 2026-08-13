'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Mail, MapPin, Phone, CheckCircle2, Loader2, Github, Linkedin } from 'lucide-react';
import { Profile, SocialLink } from '@/lib/types';
import { dataService } from '@/lib/data-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

interface ContactSectionProps {
  profile: Profile;
  socials: SocialLink[];
}

export function ContactSection({ profile, socials }: ContactSectionProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast('Mohon lengkapi Nama, Email, dan Pesan Anda.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await dataService.sendMessage({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        subject: formData.subject,
        message: formData.message,
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      toast('Pesan berhasil terkirim! Terima kasih telah menghubungi.', 'success');
      setFormData({ name: '', email: '', whatsapp: '', subject: '', message: '' });
    } catch (err) {
      setIsSubmitting(false);
      toast('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.', 'error');
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Hubungi Saya</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mari Berdiskusi &amp; Bekerjasama
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Apakah Anda memiliki project, pertanyaan teknis, atau penawaran kerjasama? Kirim pesan langsung di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Quick Action Buttons */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl border border-border/80 bg-card shadow-lg space-y-6">
              <h4 className="text-2xl font-bold tracking-tight text-foreground">Kontak Langsung</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Anda juga dapat terhubung secara cepat melalui platform berikut:
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-medium block">Email Official</span>
                    <a href={`mailto:${profile.email}`} className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-medium block">WhatsApp / Telp</span>
                    <a href={`https://wa.me/${profile.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-foreground hover:text-emerald-500 transition-colors">
                      {profile.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-medium block">Domisili</span>
                    <span className="text-sm font-bold text-foreground">{profile.location}</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="pt-6 border-t border-border/60 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Quick Actions:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/${profile.whatsapp?.replace(/[^0-9]/g, '')}?text=Halo%20Taufik,%20saya%20tertarik%20untuk%20diskusi%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full justify-center gap-2 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs">
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </Button>
                  </a>
                  <a href={`mailto:${profile.email}?subject=Diskusi%20Project`}>
                    <Button variant="outline" className="w-full justify-center gap-2 border-primary/40 text-primary hover:bg-primary/10 text-xs">
                      <Mail className="w-4 h-4" />
                      <span>Direct Email</span>
                    </Button>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl border border-border/80 bg-card shadow-lg">
              <h4 className="text-2xl font-bold tracking-tight text-foreground mb-6">Fomulir Pesan</h4>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">Nama Lengkap *</label>
                    <Input
                      name="name"
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">Alamat Email *</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">Nomor WhatsApp</label>
                    <Input
                      name="whatsapp"
                      placeholder="+62812345678"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">Subjek Pesan</label>
                    <Input
                      name="subject"
                      placeholder="Pertanyaan / Penawaran"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Isi Pesan *</label>
                  <Textarea
                    name="message"
                    rows={5}
                    placeholder="Tuliskan rincian pesan atau project yang ingin Anda sampaikan..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim Pesan...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </Button>

                {submittedSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 mt-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Pesan Anda telah berhasil tersimpan dan terkirim ke Admin Dashboard.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
