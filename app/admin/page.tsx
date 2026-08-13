'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Code,
  Layers,
  Award,
  MessageSquare,
  Plus,
  ArrowRight,
  User,
  Eye,
  CheckCircle2,
  Mail,
  Clock,
} from 'lucide-react';
import { dataService } from '@/lib/data-store';
import { Project, Message } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    certificates: 0,
    messages: 0,
    unreadMessages: 0,
  });

  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      const [p, s, e, c, m] = await Promise.all([
        dataService.getProjects(),
        dataService.getSkills(),
        dataService.getExperiences(),
        dataService.getCertificates(),
        dataService.getMessages(),
      ]);

      setStats({
        projects: p.length,
        skills: s.length,
        experiences: e.length,
        certificates: c.length,
        messages: m.length,
        unreadMessages: m.filter((msg) => !msg.is_read).length,
      });

      setRecentProjects(p.slice(0, 4));
      setRecentMessages(m.slice(0, 4));
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Projects', value: stats.projects, icon: Briefcase, color: 'text-violet-500', href: '/admin/projects' },
    { title: 'Total Skills', value: stats.skills, icon: Code, color: 'text-indigo-500', href: '/admin/skills' },
    { title: 'Pengalaman', value: stats.experiences, icon: Layers, color: 'text-cyan-500', href: '/admin/experience' },
    { title: 'Sertifikasi', value: stats.certificates, icon: Award, color: 'text-emerald-500', href: '/admin/certificates' },
    { title: 'Pesan Masuk', value: stats.messages, unread: stats.unreadMessages, icon: MessageSquare, color: 'text-rose-500', href: '/admin/messages' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary/20 via-indigo-600/20 to-accent/20 border border-primary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">Selamat Datang Kembali, Taufik Rahman!</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Semua perubahan di dashboard ini akan langsung tersinkronkan ke halaman website publik.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/projects">
            <Button variant="gradient" size="sm" className="gap-1 text-xs rounded-full">
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Project</span>
            </Button>
          </Link>
          <Link href="/admin/profile">
            <Button variant="outline" size="sm" className="gap-1 text-xs rounded-full">
              <User className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const IconComp = card.icon;
          return (
            <Link key={card.title} href={card.href}>
              <Card className="hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group">
                <CardHeader className="p-5 flex flex-row items-center justify-between space-y-0 pb-2">
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    {card.title}
                  </span>
                  <IconComp className={`w-5 h-5 ${card.color} group-hover:scale-110 transition-transform`} />
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-foreground">{card.value}</span>
                    {card.unread !== undefined && card.unread > 0 && (
                      <Badge variant="warning" className="text-[10px] bg-rose-500/20 text-rose-400 border-rose-500/40">
                        {card.unread} Belum Dibaca
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Messages & Recent Projects Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Incoming Messages Table */}
        <div className="lg:col-span-7">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pesan Masuk Terbaru</CardTitle>
                <p className="text-xs text-muted-foreground">Pesan yang dikirim pengunjung melalui formulir kontak</p>
              </div>
              <Link href="/admin/messages">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary">
                  <span>Lihat Semua</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/60">
                {recentMessages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-muted-foreground">Belum ada pesan masuk.</div>
                ) : (
                  recentMessages.map((msg) => (
                    <div key={msg.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground truncate">{msg.name}</span>
                          {!msg.is_read && (
                            <Badge variant="warning" className="text-[9px] px-1.5 py-0">Baru</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{msg.subject || msg.message}</p>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(msg.created_at)}</span>
                        </span>
                      </div>
                      <Link href="/admin/messages">
                        <Button variant="outline" size="sm" className="text-xs shrink-0">
                          Respon
                        </Button>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects Table */}
        <div className="lg:col-span-5">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Terbaru</CardTitle>
                <p className="text-xs text-muted-foreground">Daftar portfolio teratas yang ditampilkan</p>
              </div>
              <Link href="/admin/projects">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary">
                  <span>Kelola</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/60">
                {recentProjects.map((proj) => (
                  <div key={proj.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <h5 className="font-bold text-xs text-foreground truncate">{proj.title}</h5>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">{proj.category}</Badge>
                        <span className="text-[10px] text-muted-foreground">{proj.project_year}</span>
                      </div>
                    </div>
                    <Badge variant={proj.published !== false ? 'success' : 'default'} className="text-[10px]">
                      {proj.published !== false ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
