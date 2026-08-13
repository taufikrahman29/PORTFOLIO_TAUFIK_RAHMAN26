'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, MessageSquare, ShieldAlert } from 'lucide-react';
import { SocialLink } from '@/lib/types';

interface FooterProps {
  socials: SocialLink[];
}

export function Footer({ socials }: FooterProps) {
  return (
    <footer className="border-t border-border/60 bg-card/60 backdrop-blur-md py-12">
      <div className="container max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-indigo-500 to-accent flex items-center justify-center text-white font-black text-xl shadow-md">
              TR
            </div>
            <div>
              <h4 className="font-bold text-base text-foreground">Taufik Rahman</h4>
              <p className="text-xs text-muted-foreground">Full Stack Web Developer &amp; Information Systems Graduate</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socials.filter(s => s.is_active).map((soc) => (
              <a
                key={soc.id}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border/60 bg-card hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all text-muted-foreground"
                title={soc.platform}
              >
                {soc.platform.toLowerCase().includes('github') && <Github className="w-4 h-4" />}
                {soc.platform.toLowerCase().includes('linkedin') && <Linkedin className="w-4 h-4" />}
                {soc.platform.toLowerCase().includes('whatsapp') && <MessageSquare className="w-4 h-4" />}
                {soc.platform.toLowerCase().includes('email') && <Mail className="w-4 h-4" />}
              </a>
            ))}
          </div>

        </div>

        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Taufik Rahman. Built with Next.js &amp; Supabase. All rights reserved.</p>
          <Link href="/admin" className="hover:text-primary transition-colors flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
