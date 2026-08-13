'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck, Eye } from 'lucide-react';
import { Certificate } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-20 relative bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Sertifikasi IT</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Sertifikat &amp; Lisensi Profesional
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Bukti kompetensi resmi dan pelatihan teknis yang telah diverifikasi oleh lembaga independen.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative h-48 w-full bg-muted cursor-pointer overflow-hidden group/img"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image_url || 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800'}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-medium text-xs">
                  <Eye className="w-4 h-4" />
                  <span>Lihat Sertifikat</span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="primary" className="text-[11px] gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{cert.issuer}</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{cert.year}</span>
                    </Badge>
                  </div>

                  <h4 className="font-bold text-base text-foreground leading-snug group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>

                  {cert.credential_id && (
                    <p className="text-xs text-muted-foreground font-mono">
                      No. ID: {cert.credential_id}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  {cert.credential_url && (
                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1 text-xs rounded-full">
                        <span>Verifikasi</span>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Certificate Image Preview Modal */}
        {selectedCert && (
          <Dialog
            isOpen={!!selectedCert}
            onClose={() => setSelectedCert(null)}
            maxWidth="lg"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-bold">{selectedCert.title}</h3>
              <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden bg-black/90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedCert.image_url || 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800'}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Penerbit: {selectedCert.issuer} ({selectedCert.year})</span>
                {selectedCert.credential_id && <span>ID: {selectedCert.credential_id}</span>}
              </div>
            </div>
          </Dialog>
        )}

      </div>
    </section>
  );
}
