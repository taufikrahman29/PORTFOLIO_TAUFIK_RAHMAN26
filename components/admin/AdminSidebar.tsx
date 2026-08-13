'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Briefcase,
  Code,
  GraduationCap,
  Award,
  Layers,
  MessageSquare,
  Globe,
  Palette,
  Settings,
  ExternalLink,
  LogOut,
  X,
  MessageSquareQuote,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  unreadCount?: number;
}

const navMenu = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Profile', href: '/admin/profile', icon: User },
  { label: 'Projects', href: '/admin/projects', icon: Briefcase },
  { label: 'Skills', href: '/admin/skills', icon: Code },
  { label: 'Experience', href: '/admin/experience', icon: Layers },
  { label: 'Education', href: '/admin/education', icon: GraduationCap },
  { label: 'Certificates', href: '/admin/certificates', icon: Award },
  { label: 'Services', href: '/admin/services', icon: Globe },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare, hasBadge: true },
  { label: 'Social Media', href: '/admin/socials', icon: Globe },
  { label: 'Appearance', href: '/admin/appearance', icon: Palette },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar({ mobileOpen, onCloseMobile, unreadCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tr_admin_auth');
      window.location.href = '/admin/login';
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-card border-r border-border/80 text-card-foreground">
      {/* Brand & Mobile Close */}
      <div className="p-6 flex items-center justify-between border-b border-border/60">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-indigo-600 to-accent flex items-center justify-center text-white font-black text-xl shadow-md">
            TR
          </div>
          <div>
            <h3 className="font-extrabold text-sm tracking-tight text-foreground">Admin Portal</h3>
            <p className="text-[11px] text-muted-foreground font-medium">Taufik Rahman</p>
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-muted text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navMenu.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
              )}
            >
              <div className="flex items-center gap-3">
                <IconComponent className={cn('w-4 h-4 shrink-0', isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary')} />
                <span>{item.label}</span>
              </div>
              {item.hasBadge && unreadCount > 0 && (
                <span className={cn(
                  'px-2 py-0.5 rounded-full text-[10px] font-bold',
                  isActive ? 'bg-white text-primary' : 'bg-rose-500 text-white'
                )}>
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Shortcut & Logout */}
      <div className="p-4 border-t border-border/60 space-y-2">
        <Link href="/" target="_blank">
          <Button variant="outline" size="sm" className="w-full justify-center gap-2 text-xs">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website Public</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-center gap-2 text-xs text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar (Logout)</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer (Collapsible) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative w-64 max-w-xs h-full z-10 shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
