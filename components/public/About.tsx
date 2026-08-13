'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Code, GraduationCap, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';
import { Profile } from '@/lib/types';

interface AboutProps {
  profile: Profile;
  projectCount: number;
  skillCount: number;
  experienceCount: number;
  certCount: number;
}

export function About({ profile, projectCount, skillCount, experienceCount, certCount }: AboutProps) {
  const stats = [
    { label: 'Tahun Pengalaman', value: `${experienceCount}+`, icon: Briefcase, color: 'text-violet-500' },
    { label: 'Project Selesai', value: `${projectCount}+`, icon: Code, color: 'text-indigo-500' },
    { label: 'Sertifikasi IT', value: `${certCount}`, icon: Award, color: 'text-emerald-500' },
    { label: 'Teknologi Skill', value: `${skillCount}+`, icon: GraduationCap, color: 'text-cyan-500' },
  ];

  return (
    <section id="about" className="py-20 relative bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Tentang Saya</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Pengembang Web &amp; Analis Sistem Informasi
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Mengkombinasikan pemahaman bisnis Sistem Informasi dengan eksekusi teknis koding kelas enterprise.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Stats Cards Grid (Left) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const IconComp = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <h4 className="text-3xl font-extrabold tracking-tight text-foreground">{stat.value}</h4>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Info (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 rounded-3xl border border-border/80 bg-card shadow-lg space-y-6">
              <h4 className="text-2xl font-bold tracking-tight text-foreground">
                Profil &amp; Dedikasi Profesional
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {profile.headline}. {profile.bio}
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Clean Code & Modular Architecture',
                  'Enterprise Database Design (PostgreSQL / MySQL)',
                  'RESTful API & Supabase SSR Integration',
                  'UI/UX Micro-Interactions & Responsive',
                  'Cybersecurity & Input Sanitization',
                  'SEO Optimization & High Lighthouse Score',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Quick Details Bar */}
              <div className="pt-6 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>Lokasi: {profile.location || 'Indonesia'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>{profile.whatsapp}</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
