'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '@/lib/types';
import { IconRenderer } from '@/components/ui/icon-renderer';

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 relative">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Layanan &amp; Solusi</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Layanan Pengembangan IT
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Solusi digital menyeluruh yang siap membantu bisnis Anda tumbuh dan berkembang secara efisien.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl space-y-4 group relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <IconRenderer name={service.icon || 'Layout'} className="w-7 h-7" />
              </div>

              <h4 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h4>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
