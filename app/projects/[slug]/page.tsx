'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Calendar, Star, ShieldCheck, Tag } from 'lucide-react';
import { Project } from '@/lib/types';
import { dataService } from '@/lib/data-store';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      const data = await dataService.getProjectBySlug(slug);
      if (data) {
        setProject(data);
        setActiveImage(data.thumbnail_url || (data.gallery_images && data.gallery_images[0]) || '');
      }
      setLoading(false);
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 container max-w-4xl mx-auto px-4 space-y-6">
        <Skeleton className="h-10 w-40 rounded-lg" />
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-8 w-2/3 rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 px-4">
        <h2 className="text-2xl font-bold text-foreground">Project Tidak Ditemukan</h2>
        <p className="text-sm text-muted-foreground">Maaf, project dengan slug &quot;{slug}&quot; tidak ditemukan dalam database.</p>
        <Link href="/#projects">
          <Button variant="gradient" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portfolio</span>
          </Button>
        </Link>
      </div>
    );
  }

  const galleryImages = [
    project.thumbnail_url,
    ...(project.gallery_images || []),
  ].filter(Boolean);

  return (
    <main className="min-h-screen relative">
      <Navbar />

      <div className="pt-32 pb-20 container max-w-5xl mx-auto px-4 space-y-8">
        
        {/* Back Link */}
        <Link href="/#projects" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portfolio</span>
        </Link>

        {/* Title & Header Badges */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {project.is_featured && (
              <Badge variant="primary" className="gap-1 bg-amber-500/20 text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>Featured Project</span>
              </Badge>
            )}
            <Badge variant="secondary">{project.category}</Badge>
            <Badge variant="outline" className="gap-1">
              <Calendar className="w-3 h-3" />
              <span>Tahun {project.project_year}</span>
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {project.short_description}
          </p>
        </div>

        {/* Main Preview Image */}
        <div className="relative h-72 sm:h-96 md:h-[480px] w-full rounded-3xl overflow-hidden border-2 border-border/80 bg-black shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'}
            alt={project.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Multiple Image Gallery Thumbnails */}
        {galleryImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImage === img ? 'border-primary ring-2 ring-primary/30 scale-105' : 'border-border/60 opacity-60 hover:opacity-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-border/60">
          
          {/* Left Column: Full Description */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-foreground">Deskripsi Lengkap Project</h3>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
              {project.full_description || project.short_description}
            </div>
          </div>

          {/* Right Column: Tech Stack & Action Links Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-lg space-y-6">
              <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                <span>Teknologi Digunakan</span>
              </h4>

              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <Badge key={tech} variant="primary" className="text-xs py-1 px-3">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="pt-4 border-t border-border/60 space-y-3">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="gradient" className="w-full justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Kunjungi Live Demo</span>
                    </Button>
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-center gap-2">
                      <Github className="w-4 h-4" />
                      <span>Lihat Kode GitHub</span>
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      <Footer socials={[]} />
    </main>
  );
}
