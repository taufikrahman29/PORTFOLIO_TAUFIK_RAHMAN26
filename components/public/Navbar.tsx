'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, ShieldAlert, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('Beranda', 'Home'), href: '#home' },
    { label: t('Tentang', 'About'), href: '#about' },
    { label: t('Keahlian', 'Skills'), href: '#skills' },
    { label: t('Portfolio', 'Projects'), href: '#projects' },
    { label: t('Pengalaman', 'Experience'), href: '#experience' },
    { label: t('Sertifikat', 'Certificates'), href: '#certificates' },
    { label: t('Layanan', 'Services'), href: '#services' },
    { label: t('Testimoni', 'Testimonials'), href: '#testimonials' },
    { label: t('Kontak', 'Contact'), href: '#contact' },
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-indigo-500 to-accent flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            TR
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base md:text-lg tracking-tight group-hover:text-primary transition-colors">
              Taufik Rahman
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              Portfolio
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-card/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 shadow-inner">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 text-xs md:text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="rounded-full h-9 px-3 border-border/60 text-xs font-semibold gap-1.5 hover:bg-primary/10 hover:text-primary"
            title="Ganti Bahasa / Switch Language"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="uppercase font-bold tracking-wider">{language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
          </Button>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full w-9 h-9 border-border/60"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </Button>
          )}

          {/* Admin Dashboard Shortcut Link */}
          <Link href="/admin">
            <Button variant="gradient" size="sm" className="hidden sm:inline-flex gap-1.5 text-xs rounded-full">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Button>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-border/80 px-4 py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="gap-2 text-xs font-bold rounded-full"
                >
                  <Languages className="w-4 h-4" />
                  <span>Bahasa: {language === 'id' ? '🇮🇩 Indonesia' : '🇬🇧 English'}</span>
                </Button>

                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="gradient" size="sm" className="gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Admin</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
