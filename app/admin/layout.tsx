'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { dataService } from '@/lib/data-store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setCheckingAuth(false);
      return;
    }

    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('tr_admin_auth');
      if (!auth) {
        router.push('/admin/login');
      } else {
        setAuthenticated(true);
      }
    }
    setCheckingAuth(false);

    // Load unread messages count
    const fetchUnread = async () => {
      const msgs = await dataService.getMessages();
      const unread = msgs.filter((m) => !m.is_read).length;
      setUnreadCount(unread);
    };
    fetchUnread();

    const handleSync = () => fetchUnread();
    window.addEventListener('tr_data_sync', handleSync);
    return () => window.removeEventListener('tr_data_sync', handleSync);
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">
        Memeriksa autentikasi admin...
      </div>
    );
  }

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard Analytics';
    if (pathname.includes('/admin/profile')) return 'Profile Management';
    if (pathname.includes('/admin/projects')) return 'Project Management';
    if (pathname.includes('/admin/skills')) return 'Skills Management';
    if (pathname.includes('/admin/experience')) return 'Experience Management';
    if (pathname.includes('/admin/education')) return 'Education Management';
    if (pathname.includes('/admin/certificates')) return 'Certificates Management';
    if (pathname.includes('/admin/services')) return 'Services Management';
    if (pathname.includes('/admin/messages')) return 'Incoming Messages';
    if (pathname.includes('/admin/socials')) return 'Social Media Links';
    if (pathname.includes('/admin/appearance')) return 'Appearance & Theme';
    if (pathname.includes('/admin/settings')) return 'Settings';
    return 'Admin Portal';
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Responsive Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        unreadCount={unreadCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader
          title={getPageTitle()}
          onOpenMobileSidebar={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
