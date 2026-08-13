'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageSquareQuote } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { useLanguage } from '@/lib/language-context';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { t } = useLanguage();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 relative bg-background border-t border-border/40">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{t('Testimoni Klien & Mitra', 'Client & Partner Testimonials')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t('Apa Kata Mereka tentang Taufik Rahman', 'What They Say About Taufik Rahman')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {t(
              'Ulasan dan apresiasi langsung dari pimpinan instansi, mitra kerja, serta tim profesional.',
              'Direct reviews and appreciation from agency leaders, work partners, and professional teams.'
            )}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-3xl border border-border/80 bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author Profile */}
              <div className="pt-6 mt-6 border-t border-border/60 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40 shrink-0 bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium">
                    {item.role} &bull; <span className="text-primary">{item.company}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
