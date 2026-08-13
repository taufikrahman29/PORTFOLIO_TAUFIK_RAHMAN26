'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/lib/types';
import { IconRenderer } from '@/components/ui/icon-renderer';
import { useLanguage } from '@/lib/language-context';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLanguage();
  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="skills" className="py-20 relative">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">
            {t('Keahlian & Stack', 'Skills & Tech Stack')}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('Teknologi & Tools Pemrograman', 'Technologies & Programming Tools')}
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            {t(
              'Skillset teknis yang saya kuasai dan terapkan dalam pengembangan aplikasi web profesional.',
              'Technical skillset that I master and apply in professional web application development.'
            )}
          </p>
        </div>

        {/* Category Tabs */}
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

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <IconRenderer name={skill.icon || 'Code'} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{skill.name}</h4>
                      <span className="text-[11px] text-muted-foreground font-medium">{skill.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-primary font-mono">{skill.level}%</span>
                </div>

                {/* Level Progress Bar */}
                <div className="w-full bg-muted/70 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
