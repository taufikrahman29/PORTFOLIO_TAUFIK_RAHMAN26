'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, Calendar, ArrowUpRight, Eye } from 'lucide-react';
import { Project } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const publishedProjects = projects.filter((p) => p.published !== false);

  const categories = ['All', ...Array.from(new Set(publishedProjects.map((p) => p.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? publishedProjects
    : publishedProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Portfolio Project</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Karya &amp; Application Showcase
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Daftar project aplikasi web enterprise dan sistem informasi yang telah saya kembangkan.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'bg-card border border-border/80 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const allImages = Array.from(new Set([project.thumbnail_url, ...(project.gallery_images || [])])).filter(Boolean);
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative rounded-3xl border border-border/80 bg-card overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Thumbnail Image Section */}
                  <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.thumbnail_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />

                    {/* Featured & Category Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {project.is_featured && (
                        <Badge variant="primary" className="gap-1 bg-amber-500/20 text-amber-400 border-amber-500/40">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>Featured</span>
                        </Badge>
                      )}
                      <Badge variant="secondary" className="backdrop-blur-md bg-card/80">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Year & Image Count Badges */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {allImages.length > 1 && (
                        <Badge variant="primary" className="backdrop-blur-md bg-primary/80 text-white text-[11px]">
                          📷 {allImages.length} Gambar
                        </Badge>
                      )}
                      <Badge variant="outline" className="gap-1 backdrop-blur-md bg-card/80 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{project.project_year}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Project Info Section */}
                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <Link href={`/projects/${project.slug}`}>
                        <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {project.short_description}
                      </p>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies?.map((tech) => (
                        <Badge key={tech} variant="default" className="text-[11px] font-normal bg-muted">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer Buttons */}
                    <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="gradient" size="sm" className="gap-1 text-xs rounded-full">
                              <span>Live Demo</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Button>
                          </a>
                        )}
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="gap-1 text-xs rounded-full">
                              <Github className="w-3.5 h-3.5" />
                              <span>Code</span>
                            </Button>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detail &amp; Galeri ({allImages.length})</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Detail Modal Dialog with Interactive Multi-Image Gallery */}
        {activeModalProject && (
          <Dialog
            isOpen={!!activeModalProject}
            onClose={() => setActiveModalProject(null)}
            maxWidth="lg"
          >
            <div className="space-y-5">
              {/* Main Preview Image inside Modal */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border bg-black shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeModalProject.thumbnail_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'}
                  alt={activeModalProject.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Gallery Thumbnails List inside Modal */}
              {((activeModalProject.gallery_images && activeModalProject.gallery_images.length > 0)
                ? Array.from(new Set([activeModalProject.thumbnail_url, ...activeModalProject.gallery_images])).filter(Boolean)
                : []).length > 1 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Galeri Foto Project (Klik untuk melihat):
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {Array.from(new Set([activeModalProject.thumbnail_url, ...(activeModalProject.gallery_images || [])])).filter(Boolean).map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveModalProject({ ...activeModalProject, thumbnail_url: imgUrl })}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          activeModalProject.thumbnail_url === imgUrl ? 'border-primary ring-2 ring-primary/40 scale-105' : 'border-border/60 opacity-60 hover:opacity-100'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{activeModalProject.category}</Badge>
                  <Badge variant="outline">{activeModalProject.project_year}</Badge>
                </div>
                <h3 className="text-2xl font-bold">{activeModalProject.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {activeModalProject.full_description || activeModalProject.short_description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Teknologi Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies?.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-3">
                <Link href={`/projects/${activeModalProject.slug}`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <span>Halaman Detail Lengkap</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  {activeModalProject.github_url && (
                    <a href={activeModalProject.github_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </Button>
                    </a>
                  )}
                  {activeModalProject.live_url && (
                    <a href={activeModalProject.live_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="gradient" size="sm" className="gap-1.5 text-xs">
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Dialog>
        )}

      </div>
    </section>
  );
}
