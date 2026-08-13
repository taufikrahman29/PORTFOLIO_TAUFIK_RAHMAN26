'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building, GraduationCap, Award } from 'lucide-react';
import { Experience, Education } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface ExperienceTimelineProps {
  experiences: Experience[];
  educations: Education[];
}

export function ExperienceTimeline({ experiences, educations }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Karir &amp; Pendidikan</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Pengalaman Kerja &amp; Akademik
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Perjalanan profesional dan riwayat pendidikan yang membentuk keahlian saya hari ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Work Experience Timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-2xl font-bold text-foreground">Pengalaman Kerja</h4>
            </div>

            <div className="relative border-l-2 border-primary/30 pl-6 sm:pl-8 ml-4 space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot Indicator */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md transition-all duration-300 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-lg font-bold text-foreground">{exp.position}</h5>
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Calendar className="w-3 h-3 text-primary" />
                        <span>{exp.period}</span>
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                      <Building className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-[11px]">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-2xl font-bold text-foreground">Pendidikan</h4>
            </div>

            <div className="relative border-l-2 border-accent/30 pl-6 sm:pl-8 ml-4 space-y-8">
              {educations.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-background group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md transition-all duration-300 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-lg font-bold text-foreground">{edu.university}</h5>
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Calendar className="w-3 h-3 text-accent" />
                        <span>{edu.year}</span>
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-accent font-semibold">
                      <span>{edu.major}</span>
                      {edu.gpa && (
                        <Badge variant="success" className="gap-1 text-xs">
                          <Award className="w-3 h-3" />
                          <span>IPK: {edu.gpa}</span>
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
