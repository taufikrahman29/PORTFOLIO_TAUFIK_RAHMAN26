'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, Sun, Moon, Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  title: string;
  onOpenMobileSidebar?: () => void;
}

export function AdminHeader({ title, onOpenMobileSidebar }: AdminHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 border-b border-border/80 bg-card/70 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full w-9 h-9 border-border/60"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </Button>

        <Link href="/" target="_blank" className="hidden sm:inline-flex">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs rounded-full">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Button>
        </Link>

        <div className="flex items-center gap-2 pl-2 border-l border-border/60">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs">
            TR
          </div>
          <span className="hidden md:inline-block text-xs font-semibold text-foreground">
            Taufik Rahman
          </span>
        </div>
      </div>
    </header>
  );
}
