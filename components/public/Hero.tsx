'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Linkedin, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Profile, SocialLink } from '@/lib/types';
import { useLanguage } from '@/lib/language-context';

interface HeroProps {
  profile: Profile;
  socials: SocialLink[];
}

export function Hero({ profile, socials }: HeroProps) {
  const { t } = useLanguage();
  const [isColor, setIsColor] = useState(false);
  
  const roles = useMemo(() => {
    return profile.roles && profile.roles.length > 0 ? profile.roles : [
      'Full Stack Web Developer',
      'Information Systems Graduate',
      'Web Developer',
      'IT & Cybersecurity Enthusiast'
    ];
  }, [profile.roles]);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex % roles.length];

    if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => prev + 1);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting ? currentRole.substring(0, prev.length - 1) : currentRole.substring(0, prev.length + 1)
        );
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/20 via-indigo-500/20 to-accent/20 rounded-full blur-3xl -z-10 animate-pulse-slow" />

      <div className="container max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{profile.availability_status || 'Available for Work'}</span>
          </div>

          {/* Title & Animated Typing Text */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              {t('Halo, Saya', 'Hello, I am')} <br className="hidden sm:inline" />
              <span className="text-gradient">{profile.name}</span>
            </h1>
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/90 font-mono">
                {displayText}
                <span className="animate-pulse text-primary font-bold">|</span>
              </span>
            </div>
          </div>

          {/* Headline Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {profile.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a href="#projects">
              <Button variant="gradient" size="lg" className="gap-2 group">
                <span>{t('Lihat Portfolio', 'View Portfolio')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline" size="lg" className="gap-2">
                <Mail className="w-4 h-4" />
                <span>{t('Hubungi Saya', 'Contact Me')}</span>
              </Button>
            </a>
            {profile.cv_url && (
              <a href={profile.cv_url} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span>{t('Unduh CV', 'Download Resume')}</span>
                </Button>
              </a>
            )}
          </div>

          {/* Social Media Quick Bar */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-muted-foreground">
            <span className="text-xs uppercase font-semibold tracking-wider mr-2">{t('Hubungkan:', 'Connect:')}</span>
            {socials.filter(s => s.is_active).map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border/60 bg-card hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-200 shadow-sm"
                title={social.platform}
              >
                {social.platform.toLowerCase().includes('github') && <Github className="w-4 h-4" />}
                {social.platform.toLowerCase().includes('linkedin') && <Linkedin className="w-4 h-4" />}
                {social.platform.toLowerCase().includes('whatsapp') && <MessageSquare className="w-4 h-4" />}
                {social.platform.toLowerCase().includes('email') && <Mail className="w-4 h-4" />}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Column Profile Picture Card (Grayscale on default, Full Color on click/hover) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center relative"
        >
          <div
            onClick={() => setIsColor(!isColor)}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 cursor-pointer group"
          >
            {/* Outer Decorative Animated Gradient Ring */}
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary via-indigo-500 to-accent transition-all duration-700 blur-xl ${
                isColor ? 'opacity-90 scale-105' : 'opacity-40 scale-100 group-hover:opacity-75'
              }`}
            />
            
            {/* Profile Card Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-border/80 bg-card shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar_url || '/uploads/profile/profile-1786653200885.png'}
                alt={profile.name}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                  isColor
                    ? 'grayscale-0 contrast-100 brightness-100'
                    : 'grayscale contrast-125 brightness-95 group-hover:grayscale-0'
                }`}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
