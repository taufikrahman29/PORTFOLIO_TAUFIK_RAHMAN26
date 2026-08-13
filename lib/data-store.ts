import { Profile, Project, Skill, Experience, Education, Certificate, Service, SocialLink, Message, SiteSettings, Testimonial } from './types';
import { createClient } from './supabase/client';

// INITIAL FALLBACK SEED DATA FOR TAUFIK RAHMAN
export const initialProfile: Profile = {
  id: 'profile-1',
  name: 'Taufik Rahman',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
  headline: 'Full Stack Web Developer & Information Systems Graduate',
  bio: 'Lulusan Sistem Informasi & Full Stack Developer yang berfokus pada pembuatan aplikasi web enterprise modern, scalable, responsif, dan aman menggunakan Next.js, TypeScript, Laravel, dan Tailwind CSS.',
  email: 'taufikrahman.dev@gmail.com',
  whatsapp: '+6281234567890',
  location: 'Indonesia',
  availability_status: 'Available for Work',
  cv_url: '#',
  roles: [
    'Full Stack Web Developer',
    'Information Systems Graduate',
    'Web Developer',
    'IT & Cybersecurity Enthusiast'
  ],
};

export const initialSkills: Skill[] = [
  { id: '1', name: 'Next.js', category: 'Frontend', level: 90, icon: 'Globe', display_order: 1 },
  { id: '2', name: 'React.js', category: 'Frontend', level: 92, icon: 'Code', display_order: 2 },
  { id: '3', name: 'TypeScript', category: 'Frontend', level: 88, icon: 'FileCode', display_order: 3 },
  { id: '4', name: 'JavaScript', category: 'Frontend', level: 94, icon: 'FileCode', display_order: 4 },
  { id: '5', name: 'Tailwind CSS', category: 'Frontend', level: 95, icon: 'Palette', display_order: 5 },
  { id: '6', name: 'Laravel', category: 'Backend', level: 88, icon: 'Server', display_order: 6 },
  { id: '7', name: 'PHP', category: 'Backend', level: 90, icon: 'Server', display_order: 7 },
  { id: '8', name: 'MySQL', category: 'Database & DevOps', level: 88, icon: 'Database', display_order: 8 },
  { id: '9', name: 'PostgreSQL', category: 'Database & DevOps', level: 85, icon: 'Database', display_order: 9 },
  { id: '10', name: 'Supabase', category: 'Database & DevOps', level: 85, icon: 'Layers', display_order: 10 },
  { id: '11', name: 'Git', category: 'Tools & Methods', level: 90, icon: 'GitBranch', display_order: 11 },
  { id: '12', name: 'GitHub', category: 'Tools & Methods', level: 92, icon: 'Github', display_order: 12 },
  { id: '13', name: 'FTK & Digital Forensics', category: 'Tools & Methods', level: 88, icon: 'ShieldCheck', display_order: 13 },
  { id: '14', name: 'CapCut Video Editor', category: 'Design & Multimedia', level: 92, icon: 'Video', display_order: 14 },
  { id: '15', name: 'Adobe Photoshop', category: 'Design & Multimedia', level: 90, icon: 'Image', display_order: 15 },
  { id: '16', name: 'Adobe Illustrator', category: 'Design & Multimedia', level: 88, icon: 'Palette', display_order: 16 },
  { id: '17', name: 'Figma UI/UX', category: 'Design & Multimedia', level: 90, icon: 'Layout', display_order: 17 },
  { id: '18', name: 'Canva Design', category: 'Design & Multimedia', level: 95, icon: 'Sparkles', display_order: 18 },
  { id: '19', name: 'Adobe Premiere Pro', category: 'Design & Multimedia', level: 85, icon: 'Film', display_order: 19 },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Internal Audit Analyst & Assignment System',
    slug: 'internal-audit-analyst-system',
    short_description: 'Sistem aplikasi enterprise untuk manajemen audit internal, penugasan auditor, matriks risiko, dan dashboard pelaporan real-time.',
    full_description: 'Aplikasi web kelas enterprise yang dirancang khusus untuk mempermudah manajemen audit internal perusahaan. Dilengkapi fitur manajemen penugasan auditor, penilaian skor risiko, tracking temuan audit, approval workflow, serta dashboard statistik executive.',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    category: 'Web Application',
    technologies: ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'REST API'],
    project_year: '2024',
    live_url: 'https://demo-audit.taufikrahman.dev',
    github_url: 'https://github.com/taufikrahman29/audit-system',
    is_featured: true,
    published: true,
    display_order: 1,
    gallery_images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'proj-2',
    title: 'Enterprise E-Commerce & Inventory Hub',
    slug: 'enterprise-ecommerce-inventory-hub',
    short_description: 'Platform toko online modern dengan integrasi inventaris stok real-time, cart checkout, dan payment gateway.',
    full_description: 'Solusi E-Commerce full stack dengan Next.js App Router & Supabase. Memiliki antarmuka belanja berkecepatan tinggi, integrasi manajemen produk otomatis, stok real-time, invoice generator, dan panel dashboard admin lengkap.',
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0a67dd486e92?auto=format&fit=crop&q=80&w=1000',
    category: 'Full Stack',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe'],
    project_year: '2024',
    live_url: 'https://shop.taufikrahman.dev',
    github_url: 'https://github.com/taufikrahman29/next-ecommerce',
    is_featured: true,
    published: true,
    display_order: 2,
    gallery_images: [
      'https://images.unsplash.com/photo-1556742049-0a67dd486e92?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'proj-3',
    title: 'Smart HR & Geofencing Attendance Portal',
    slug: 'smart-hr-geofencing-attendance',
    short_description: 'Portal manajemen SDM dengan fitur presensi geofencing lokasi, pengajuan cuti, dan kalkulasi KPI karyawan.',
    full_description: 'Aplikasi pengelolaan sumber daya manusia (HRIS) modern. Memungkinkan presensi mandiri karyawan berbasis GPS lokasi, pengajuan izin digital, rekap otomatis jam kerja, serta laporan performa KPI berkala.',
    thumbnail_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    category: 'Web Application',
    technologies: ['React', 'Laravel', 'Tailwind CSS', 'PostgreSQL'],
    project_year: '2023',
    live_url: 'https://hris.taufikrahman.dev',
    github_url: 'https://github.com/taufikrahman29/smart-hris',
    is_featured: true,
    published: true,
    display_order: 3,
    gallery_images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'proj-4',
    title: 'Cybersecurity Threat & Incident Monitor',
    slug: 'cybersecurity-threat-incident-monitor',
    short_description: 'Dashboard pemantauan insiden siber, threat intelligence feed, dan visualisasi skor kerentanan IT.',
    full_description: 'Platform analitik keamanan siber untuk memantau log aktivitas yang mencurigakan, integrasi scoring CVE, deteksi kerentanan, dan mitigasi risiko insiden secara terorganisir.',
    thumbnail_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    category: 'Web Application',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Python API'],
    project_year: '2023',
    live_url: 'https://cybersec.taufikrahman.dev',
    github_url: 'https://github.com/taufikrahman29/cyber-monitor',
    is_featured: false,
    published: true,
    display_order: 4,
    gallery_images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000'
    ]
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    position: 'Peserta Magang Manajemen Fasilitas Umum',
    company: 'Lapas Kelas IIA Bekasi',
    period: 'September 2025 – Juni 2026',
    description: 'Mengembangkan sistem web, dashboard, database, dan solusi digital untuk mendukung operasional serta pelayanan publik.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
    display_order: 1
  },
  {
    id: 'exp-2',
    position: 'Peserta Magang Digital Forensik',
    company: 'PT Analyst Forensik Digital',
    period: 'September 2024 – Desember 2024',
    description: 'Melakukan analisis bukti digital, investigasi insiden siber, dokumentasi temuan, dan penyusunan laporan forensik.',
    technologies: ['FTK', 'Autopsy', 'Wireshark', 'Windows Forensics'],
    display_order: 2
  },
  {
    id: 'exp-3',
    position: 'Analis Keamanan Siber',
    company: 'Kepolisian Negara Republik Indonesia',
    period: 'Januari 2021 – Agustus 2025',
    description: 'Melakukan analisis keamanan, investigasi digital forensik, akuisisi bukti digital, analisis perangkat, serta penyusunan laporan investigasi.',
    technologies: ['FTK', 'Autopsy', 'Wireshark', 'CCTV', 'Digital Forensics'],
    display_order: 3
  },
  {
    id: 'exp-4',
    position: 'Humas & Publikasi Media',
    company: 'Polsek Pacet Polresta Bandung',
    period: 'Januari 2021 – Desember 2025',
    description: 'Mengelola media sosial, publikasi digital, desain konten, dokumentasi, dan komunikasi informasi institusi.',
    technologies: ['Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'Instagram', 'Threads'],
    display_order: 4
  },
  {
    id: 'exp-5',
    position: 'Pengembang Full Stack',
    company: 'Polsek Cikancung',
    period: 'Desember 2023 – Januari 2024',
    description: 'Mengembangkan sistem absensi berbasis web, database, backend, frontend, serta melakukan pengujian sistem.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    display_order: 5
  },
  {
    id: 'exp-6',
    position: 'Desainer UI/UX',
    company: 'Truelancer.com',
    period: 'Februari 2023 – April 2023',
    description: 'Merancang antarmuka web dan mobile, wireframe, prototype, user flow, serta desain responsif.',
    technologies: ['Figma', 'Adobe XD', 'Photoshop'],
    display_order: 6
  },
  {
    id: 'exp-7',
    position: 'Teknisi Dukungan TI',
    company: 'CV Ebahero Majalaya',
    period: 'September 2021 – Desember 2022',
    description: 'Menangani dukungan teknis, instalasi perangkat, konfigurasi sistem, pemeliharaan komputer, software, dan jaringan.',
    technologies: ['Windows', 'Hardware', 'Networking', 'Troubleshooting'],
    display_order: 7
  },
  {
    id: 'exp-8',
    position: 'Pengembang Perangkat Lunak Junior & Madya',
    company: 'Sportbet',
    period: 'Juni 2022 – September 2022',
    description: 'Mengembangkan, menguji, dan memelihara aplikasi serta menganalisis kebutuhan pengguna dan permasalahan teknis.',
    technologies: ['PHP', 'JavaScript', 'MySQL', 'Git'],
    display_order: 8
  }
];

export const initialEducations: Education[] = [
  {
    id: 'edu-1',
    university: 'Universitas Indonesia / Perguruan Tinggi Informatika',
    major: 'Sistem Informasi (S.Kom)',
    year: '2019 - 2023',
    gpa: '3.85 / 4.00',
    description: 'Lulus dengan predikat Cum Laude. Aktif dalam organisasi kemahasiswaan IT, kompetisi pemrograman, dan memfokuskan skripsi pada Enterprise Architecture & Web Application Security.',
    display_order: 1
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: 'cert-cilacap',
    title: 'Sertifikat Apresiasi - Pelaporan Celah Kerentanan Sistem Elektronik Pemkab Cilacap',
    issuer: 'CILACAPKAB-CSIRT / Diskominfo Kabupaten Cilacap',
    year: '2026',
    credential_id: '500.12.10.1/452/II/2026',
    credential_url: 'https://csirt.cilacapkab.go.id',
    image_url: '/uploads/certificates/cert-cilacap-csirt.jpg',
    display_order: 1
  },
  {
    id: 'cert-tni',
    title: 'Sertifikat Penghargaan - Penemuan Celah Kerentanan Sistem Informasi Mabes TNI',
    issuer: 'DANSATSIBER TNI / Markas Besar TNI',
    year: '2026',
    credential_id: 'SERT/SSTNI/49/II/2026',
    credential_url: 'https://tni.mil.id',
    image_url: '/uploads/certificates/cert-mabes-tni.jpg',
    display_order: 2
  },
  {
    id: 'cert-bmkg',
    title: 'Sertifikat Apresiasi - Koordinasi Temuan Kerentanan Sistem BMKG',
    issuer: 'CSIRT-BMKG / Badan Meteorologi, Klimatologi, dan Geofisika',
    year: '2026',
    credential_id: '094/KI.02.26/CSIRT/BMKG',
    credential_url: 'https://csirt.bmkg.go.id',
    image_url: '/uploads/certificates/cert-bmkg-csirt.jpg',
    display_order: 3
  },
  {
    id: 'cert-msib-forensik',
    title: 'Sertifikat MSIB Angkatan 7 - Digital Forensik & Web Cybersecurity',
    issuer: 'Kemendikbudristek & PT Analis Forensik Digital',
    year: '2024',
    credential_id: 'MSIB-7-AFD-10076210',
    credential_url: 'https://kampusmerdeka.kemdikbud.go.id',
    image_url: '/uploads/certificates/cert-msib-forensik-digital.jpg',
    display_order: 4
  },
  {
    id: 'cert-google-it',
    title: 'Google IT Support Professional Certificate (5 Specialization Courses)',
    issuer: 'Google & Coursera',
    year: '2022',
    credential_id: '32UFHLASP28C',
    credential_url: 'https://coursera.org/verify/professional-cert/32UFHLASP28C',
    image_url: '/uploads/certificates/cert-google-it-support.jpg',
    display_order: 5
  },
  {
    id: 'cert-microsoft',
    title: 'Certificate of Attendance - Job Readiness Webinar: Digitization - Cyber Resilience',
    issuer: 'Microsoft, Kemendikbud & InfraDigital Foundation',
    year: '2024',
    credential_id: '0162/YIDN/SKU/IX/2024',
    credential_url: 'https://infradigital.io',
    image_url: '/uploads/certificates/cert-microsoft-cyber.jpg',
    display_order: 6
  },
  {
    id: 'cert-toefl',
    title: 'Test of English Proficiency and Academic (TOEFL Test - Score 607)',
    issuer: 'Elskill English Course',
    year: '2025',
    credential_id: '45483/S-T/EEC/X/2025',
    credential_url: 'https://elskill.com',
    image_url: '/uploads/certificates/cert-toefl-elskill.jpg',
    display_order: 7
  },
  {
    id: 'cert-kemnaker',
    title: 'Sertifikat Pemagangan - Pengelola Fasilitas Umum (Predikat Sangat Baik)',
    issuer: 'KEMNAKER RI & Lapas Kelas IIA Bekasi',
    year: '2026',
    credential_id: 'MN.032.010454.03.2025',
    credential_url: 'https://siapkerja.kemnaker.go.id',
    image_url: '/uploads/certificates/cert-kemnaker-lapas.jpg',
    display_order: 8
  },
  {
    id: 'cert-disnaker-bdg',
    title: 'Sertifikat Pelatihan Kewirausahaan Disnaker Kabupaten Bandung',
    issuer: 'Disnaker Kab. Bandung & Pascasarjana UPI',
    year: '2025',
    credential_id: '563/UPTD/V/DISNAKER/2025',
    credential_url: 'https://disnaker.bandungkab.go.id',
    image_url: '/uploads/certificates/cert-disnaker-bandung.jpg',
    display_order: 9
  },
  {
    id: 'cert-diskominfo-jbar',
    title: 'Sertifikat Akselerasi Pendidikan Melalui Transformasi Digital',
    issuer: 'Diskominfo Prov. Jawa Barat & Jabar Digital Service (JDS)',
    year: '2022',
    credential_id: '4496/KPG.03.01.03/DISKOMINFO',
    credential_url: 'https://digital.jabarprov.go.id',
    image_url: '/uploads/certificates/cert-diskominfo-jabar.jpg',
    display_order: 10
  },
  {
    id: 'cert-jbar-camp',
    title: 'Candradimuka Jabar Coding Camp 2022 - Digital Marketing (Predicate Master)',
    issuer: 'Diskominfo Jabar, JDS & Universitas Padjadjaran (UNPAD)',
    year: '2022',
    credential_id: '6031/KOM.03.01.10/DISKOMINFO',
    credential_url: 'https://digital.jabarprov.go.id',
    image_url: '/uploads/certificates/cert-jabar-coding-camp.jpg',
    display_order: 11
  }
];

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    title: 'Website Development',
    description: 'Pengembangan aplikasi web custom modern berkecepatan tinggi, aman, dan responsif untuk kebutuhan bisnis Anda.',
    icon: 'Globe',
    display_order: 1
  },
  {
    id: 'srv-2',
    title: 'Landing Page & Company Profile',
    description: 'Desain dan pembuatan landing page memukau untuk meningkatkan konversi dan citra profesional perusahaan.',
    icon: 'Layout',
    display_order: 2
  },
  {
    id: 'srv-3',
    title: 'Web Application Enterprise',
    description: 'Pembangunan sistem informasi perusahaan, portal audit, HRIS, inventaris, dan dashboard manajemen interaktif.',
    icon: 'Database',
    display_order: 3
  },
  {
    id: 'srv-4',
    title: 'UI/UX Implementation',
    description: 'Mengubah ide & prototipe Figma menjadi kode frontend Next.js + Tailwind CSS yang terstruktur dan sangat halus.',
    icon: 'Palette',
    display_order: 4
  },
  {
    id: 'srv-5',
    title: 'Maintenance & Optimization',
    description: 'Layanan pemeliharaan sistem web, optimasi kecepatan SEO, perbaikan bug, dan penguatan keamanan aplikasi.',
    icon: 'ShieldCheck',
    display_order: 5
  }
];

export const initialSocials: SocialLink[] = [
  { id: 'soc-1', platform: 'GitHub', url: 'https://github.com/taufikrahman29', icon: 'Github', is_active: true, display_order: 1 },
  { id: 'soc-2', platform: 'LinkedIn', url: 'https://linkedin.com/in/taufikrahman', icon: 'Linkedin', is_active: true, display_order: 2 },
  { id: 'soc-3', platform: 'WhatsApp', url: 'https://wa.me/6281234567890', icon: 'MessageSquare', is_active: true, display_order: 3 },
  { id: 'soc-4', platform: 'Email', url: 'mailto:taufikrahman.dev@gmail.com', icon: 'Mail', is_active: true, display_order: 4 },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Drs. H. Rukmana, M.Si.',
    role: 'Kepala Dinas Ketenagakerjaan',
    company: 'Disnaker Kabupaten Bandung',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    content: 'Taufik Rahman menunjukkan dedikasi luar biasa dalam pengembangan program digitalisasi dan pelatihan. Hasil kerjanya sangat terstruktur, rapi, dan memberikan dampak nyata bagi instansi.',
    rating: 5,
    display_order: 1
  },
  {
    id: 'test-2',
    name: 'Dedy Cahyadi, S.H., M.Si.',
    role: 'Kepala Lembaga Pemasyarakatan',
    company: 'Lapas Kelas IIA Bekasi',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    content: 'Kinerja Taufik dalam posisi Pengelola Fasilitas Umum dan pengembangan sistem web internal meraih predikat Sangat Baik. Kemampuannya mengintegrasikan solusi IT sangat membantu operasional lembaga.',
    rating: 5,
    display_order: 2
  },
  {
    id: 'test-3',
    name: 'Perwakilan PT Analis Forensik Digital',
    role: 'Direktur Investigasi & Keamanan Siber',
    company: 'PT Analis Forensik Digital (MSIB)',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    content: 'Sangat terkesan dengan ketelitian Taufik dalam analisis bukti digital forensik dan investigasi insiden siber. Laporan yang disusun sangat profesional dan memenuhi standar industri keamanan.',
    rating: 5,
    display_order: 3
  },
  {
    id: 'test-4',
    name: 'Direksi Tim IT Enterprise',
    role: 'Lead Architect & Senior Engineer',
    company: 'Enterprise Software Partner',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    content: 'Taufik Rahman merupakan Full Stack Developer yang sangat handal di Next.js, Laravel, dan Tailwind. Eksekusi UI/UX-nya sangat halus dan arsitektur kodenya bersih serta mudah dikembangkan.',
    rating: 5,
    display_order: 4
  }
];

export const initialSettings: SiteSettings = {
  primary_color: 'violet',
  accent_color: 'cyan',
  background_theme: 'dark',
  font_family: 'Inter',
  border_radius: '0.75rem',
  default_mode: 'dark',
  hero_gradient: 'from-violet-600/20 via-indigo-600/20 to-cyan-500/20',
  button_style: 'rounded-full',
  site_title: 'Taufik Rahman - Full Stack Developer Portfolio',
  meta_description: 'Portfolio profesional Taufik Rahman, Full Stack Web Developer & Information Systems Graduate.',
  meta_keywords: 'Taufik Rahman, Portfolio, Full Stack Developer, Next.js, React, Laravel, Tailwind CSS, Developer Indonesia',
  og_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
};

// UNIFIED STORE WITH STRICT ATOMIC PARTIAL UPDATES & CACHE REVALIDATION
class DataService {
  private getStorage<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(`tr_portfolio_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private setStorage<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`tr_portfolio_${key}`, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('tr_data_sync', { detail: { key, data } }));
    } catch (e) {
      console.error('Failed to set localStorage', e);
    }
  }

  private async triggerRevalidation(path: string = '/') {
    try {
      if (typeof window !== 'undefined') {
        fetch('/api/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path }),
        }).catch(() => {});
      }
    } catch (e) {
      console.warn('Revalidation trigger error:', e);
    }
  }

  // ==========================================
  // PROFILE (ATOMIC PARTIAL UPDATE)
  // ==========================================
  async getProfile(): Promise<Profile> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('profiles').select('*').limit(1).single();
      if (data) {
        this.setStorage('profile', data);
        return data;
      }
    }
    return this.getStorage<Profile>('profile', initialProfile);
  }

  async patchProfile(partial: Partial<Profile>): Promise<Profile> {
    const current = await this.getProfile();
    const cleanPartial = Object.fromEntries(
      Object.entries(partial).filter(([_, v]) => v !== undefined)
    );

    const supabase = createClient();
    if (supabase && current.id) {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...cleanPartial, updated_at: new Date().toISOString() })
        .eq('id', current.id)
        .select()
        .single();

      if (!error && data) {
        this.setStorage('profile', data);
        this.triggerRevalidation('/');
        return data;
      }
    }

    const updated = { ...current, ...cleanPartial, updated_at: new Date().toISOString() };
    this.setStorage('profile', updated);
    this.triggerRevalidation('/');
    return updated;
  }

  async updateProfile(profile: Profile): Promise<Profile> {
    return this.patchProfile(profile);
  }

  // ==========================================
  // PROJECTS (ATOMIC PARTIAL UPDATE PER PROJECT)
  // ==========================================
  async getProjects(): Promise<Project[]> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
      if (data && data.length > 0) {
        this.setStorage('projects', data);
        return data;
      }
    }
    return this.getStorage<Project[]>('projects', initialProjects);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((p) => p.slug === slug) || null;
  }

  async patchProject(id: string, partial: Partial<Project>): Promise<Project> {
    const currentProjects = await this.getProjects();
    const targetProject = currentProjects.find((p) => p.id === id);

    const cleanPartial = Object.fromEntries(
      Object.entries(partial).filter(([_, v]) => v !== undefined)
    );

    const supabase = createClient();
    if (supabase && id) {
      const { data, error } = await supabase
        .from('projects')
        .update({ ...cleanPartial, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const updatedList = currentProjects.map((p) => (p.id === id ? data : p));
        this.setStorage('projects', updatedList);
        this.triggerRevalidation('/');
        if (data.slug) this.triggerRevalidation(`/projects/${data.slug}`);
        return data;
      }
    }

    if (!targetProject) throw new Error(`Project dengan ID ${id} tidak ditemukan.`);

    const updatedProject = { ...targetProject, ...cleanPartial, updated_at: new Date().toISOString() };
    const updatedList = currentProjects.map((p) => (p.id === id ? updatedProject : p));
    this.setStorage('projects', updatedList);
    this.triggerRevalidation('/');
    if (updatedProject.slug) this.triggerRevalidation(`/projects/${updatedProject.slug}`);
    return updatedProject;
  }

  async saveProject(project: Project): Promise<Project> {
    if (project.id) {
      return this.patchProject(project.id, project);
    }
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('projects').insert(project).select().single();
      if (data) {
        const current = await this.getProjects();
        const updatedList = [...current, data];
        this.setStorage('projects', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }
    const current = await this.getProjects();
    const newProject = { ...project, id: `proj-${Date.now()}` };
    const updatedList = [...current, newProject];
    this.setStorage('projects', updatedList);
    this.triggerRevalidation('/');
    return newProject;
  }

  async deleteProject(id: string): Promise<void> {
    const supabase = createClient();
    if (supabase) {
      await supabase.from('projects').delete().eq('id', id);
    }
    const current = await this.getProjects();
    const updatedList = current.filter((p) => p.id !== id);
    this.setStorage('projects', updatedList);
    this.triggerRevalidation('/');
  }

  // ==========================================
  // SKILLS (ATOMIC PARTIAL UPDATE)
  // ==========================================
  async getSkills(): Promise<Skill[]> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
      if (data && data.length > 0) {
        this.setStorage('skills', data);
        return data;
      }
    }
    return this.getStorage<Skill[]>('skills', initialSkills);
  }

  async patchSkill(id: string, partial: Partial<Skill>): Promise<Skill> {
    const current = await this.getSkills();
    const target = current.find((s) => s.id === id);
    const cleanPartial = Object.fromEntries(Object.entries(partial).filter(([_, v]) => v !== undefined));

    const supabase = createClient();
    if (supabase && id) {
      const { data, error } = await supabase.from('skills').update(cleanPartial).eq('id', id).select().single();
      if (!error && data) {
        const updatedList = current.map((s) => (s.id === id ? data : s));
        this.setStorage('skills', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }

    if (!target) throw new Error(`Skill ${id} not found`);
    const updated = { ...target, ...cleanPartial };
    const updatedList = current.map((s) => (s.id === id ? updated : s));
    this.setStorage('skills', updatedList);
    this.triggerRevalidation('/');
    return updated;
  }

  async saveSkill(skill: Skill): Promise<Skill> {
    if (skill.id) return this.patchSkill(skill.id, skill);
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('skills').insert(skill).select().single();
      if (data) {
        const current = await this.getSkills();
        const updatedList = [...current, data];
        this.setStorage('skills', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }
    const current = await this.getSkills();
    const newSkill = { ...skill, id: `skill-${Date.now()}` };
    const updatedList = [...current, newSkill];
    this.setStorage('skills', updatedList);
    this.triggerRevalidation('/');
    return newSkill;
  }

  async deleteSkill(id: string): Promise<void> {
    const supabase = createClient();
    if (supabase) await supabase.from('skills').delete().eq('id', id);
    const current = await this.getSkills();
    this.setStorage('skills', current.filter((s) => s.id !== id));
    this.triggerRevalidation('/');
  }

  // ==========================================
  // EXPERIENCES (ATOMIC PARTIAL UPDATE)
  // ==========================================
  async getExperiences(): Promise<Experience[]> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('experiences').select('*').order('display_order', { ascending: true });
      if (data && data.length > 0) {
        this.setStorage('experiences', data);
        return data;
      }
    }
    return this.getStorage<Experience[]>('experiences', initialExperiences);
  }

  async patchExperience(id: string, partial: Partial<Experience>): Promise<Experience> {
    const current = await this.getExperiences();
    const target = current.find((e) => e.id === id);
    const cleanPartial = Object.fromEntries(Object.entries(partial).filter(([_, v]) => v !== undefined));

    const supabase = createClient();
    if (supabase && id) {
      const { data, error } = await supabase.from('experiences').update(cleanPartial).eq('id', id).select().single();
      if (!error && data) {
        const updatedList = current.map((e) => (e.id === id ? data : e));
        this.setStorage('experiences', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }

    if (!target) throw new Error(`Experience ${id} not found`);
    const updated = { ...target, ...cleanPartial };
    const updatedList = current.map((e) => (e.id === id ? updated : e));
    this.setStorage('experiences', updatedList);
    this.triggerRevalidation('/');
    return updated;
  }

  async saveExperience(exp: Experience): Promise<Experience> {
    if (exp.id) return this.patchExperience(exp.id, exp);
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('experiences').insert(exp).select().single();
      if (data) {
        const current = await this.getExperiences();
        const updatedList = [...current, data];
        this.setStorage('experiences', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }
    const current = await this.getExperiences();
    const item = { ...exp, id: `exp-${Date.now()}` };
    const updatedList = [...current, item];
    this.setStorage('experiences', updatedList);
    this.triggerRevalidation('/');
    return item;
  }

  async deleteExperience(id: string): Promise<void> {
    const supabase = createClient();
    if (supabase) await supabase.from('experiences').delete().eq('id', id);
    const current = await this.getExperiences();
    this.setStorage('experiences', current.filter((e) => e.id !== id));
    this.triggerRevalidation('/');
  }

  // ==========================================
  // EDUCATIONS (ATOMIC PARTIAL UPDATE)
  // ==========================================
  async getEducations(): Promise<Education[]> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('educations').select('*').order('display_order', { ascending: true });
      if (data && data.length > 0) {
        this.setStorage('educations', data);
        return data;
      }
    }
    return this.getStorage<Education[]>('educations', initialEducations);
  }

  async patchEducation(id: string, partial: Partial<Education>): Promise<Education> {
    const current = await this.getEducations();
    const target = current.find((e) => e.id === id);
    const cleanPartial = Object.fromEntries(Object.entries(partial).filter(([_, v]) => v !== undefined));

    const supabase = createClient();
    if (supabase && id) {
      const { data, error } = await supabase.from('educations').update(cleanPartial).eq('id', id).select().single();
      if (!error && data) {
        const updatedList = current.map((e) => (e.id === id ? data : e));
        this.setStorage('educations', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }

    if (!target) throw new Error(`Education ${id} not found`);
    const updated = { ...target, ...cleanPartial };
    const updatedList = current.map((e) => (e.id === id ? updated : e));
    this.setStorage('educations', updatedList);
    this.triggerRevalidation('/');
    return updated;
  }

  async saveEducation(edu: Education): Promise<Education> {
    if (edu.id) return this.patchEducation(edu.id, edu);
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('educations').insert(edu).select().single();
      if (data) {
        const current = await this.getEducations();
        const updatedList = [...current, data];
        this.setStorage('educations', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }
    const current = await this.getEducations();
    const item = { ...edu, id: `edu-${Date.now()}` };
    const updatedList = [...current, item];
    this.setStorage('educations', updatedList);
    this.triggerRevalidation('/');
    return item;
  }

  async deleteEducation(id: string): Promise<void> {
    const supabase = createClient();
    if (supabase) await supabase.from('educations').delete().eq('id', id);
    const current = await this.getEducations();
    this.setStorage('educations', current.filter((e) => e.id !== id));
    this.triggerRevalidation('/');
  }

  // ==========================================
  // CERTIFICATES (ATOMIC PARTIAL UPDATE)
  // ==========================================
  async getCertificates(): Promise<Certificate[]> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('certificates').select('*').order('display_order', { ascending: true });
      if (data && data.length > 0) {
        this.setStorage('certificates', data);
        return data;
      }
    }
    return this.getStorage<Certificate[]>('certificates', initialCertificates);
  }

  async patchCertificate(id: string, partial: Partial<Certificate>): Promise<Certificate> {
    const current = await this.getCertificates();
    const target = current.find((c) => c.id === id);
    const cleanPartial = Object.fromEntries(Object.entries(partial).filter(([_, v]) => v !== undefined));

    const supabase = createClient();
    if (supabase && id) {
      const { data, error } = await supabase.from('certificates').update(cleanPartial).eq('id', id).select().single();
      if (!error && data) {
        const updatedList = current.map((c) => (c.id === id ? data : c));
        this.setStorage('certificates', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }

    if (!target) throw new Error(`Certificate ${id} not found`);
    const updated = { ...target, ...cleanPartial };
    const updatedList = current.map((c) => (c.id === id ? updated : c));
    this.setStorage('certificates', updatedList);
    this.triggerRevalidation('/');
    return updated;
  }

  async saveCertificate(cert: Certificate): Promise<Certificate> {
    if (cert.id) return this.patchCertificate(cert.id, cert);
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('certificates').insert(cert).select().single();
      if (data) {
        const current = await this.getCertificates();
        const updatedList = [...current, data];
        this.setStorage('certificates', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }
    const current = await this.getCertificates();
    const item = { ...cert, id: `cert-${Date.now()}` };
    const updatedList = [...current, item];
    this.setStorage('certificates', updatedList);
    this.triggerRevalidation('/');
    return item;
  }

  async deleteCertificate(id: string): Promise<void> {
    const supabase = createClient();
    if (supabase) await supabase.from('certificates').delete().eq('id', id);
    const current = await this.getCertificates();
    this.setStorage('certificates', current.filter((c) => c.id !== id));
    this.triggerRevalidation('/');
  }

  // ==========================================
  // SERVICES (ATOMIC PARTIAL UPDATE)
  // ==========================================
  async getServices(): Promise<Service[]> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('services').select('*').order('display_order', { ascending: true });
      if (data && data.length > 0) {
        this.setStorage('services', data);
        return data;
      }
    }
    return this.getStorage<Service[]>('services', initialServices);
  }

  async patchService(id: string, partial: Partial<Service>): Promise<Service> {
    const current = await this.getServices();
    const target = current.find((s) => s.id === id);
    const cleanPartial = Object.fromEntries(Object.entries(partial).filter(([_, v]) => v !== undefined));

    const supabase = createClient();
    if (supabase && id) {
      const { data, error } = await supabase.from('services').update(cleanPartial).eq('id', id).select().single();
      if (!error && data) {
        const updatedList = current.map((s) => (s.id === id ? data : s));
        this.setStorage('services', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }

    if (!target) throw new Error(`Service ${id} not found`);
    const updated = { ...target, ...cleanPartial };
    const updatedList = current.map((s) => (s.id === id ? updated : s));
    this.setStorage('services', updatedList);
    this.triggerRevalidation('/');
    return updated;
  }

  async saveService(srv: Service): Promise<Service> {
    if (srv.id) return this.patchService(srv.id, srv);
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('services').insert(srv).select().single();
      if (data) {
        const current = await this.getServices();
        const updatedList = [...current, data];
        this.setStorage('services', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }
    const current = await this.getServices();
    const item = { ...srv, id: `srv-${Date.now()}` };
    const updatedList = [...current, item];
    this.setStorage('services', updatedList);
    this.triggerRevalidation('/');
    return item;
  }

  async deleteService(id: string): Promise<void> {
    const supabase = createClient();
    if (supabase) await supabase.from('services').delete().eq('id', id);
    const current = await this.getServices();
    this.setStorage('services', current.filter((s) => s.id !== id));
    this.triggerRevalidation('/');
  }

  // ==========================================
  // SOCIALS (ATOMIC PARTIAL UPDATE)
  // ==========================================
  async getSocials(): Promise<SocialLink[]> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('social_links').select('*').order('display_order', { ascending: true });
      if (data && data.length > 0) {
        this.setStorage('socials', data);
        return data;
      }
    }
    return this.getStorage<SocialLink[]>('socials', initialSocials);
  }

  async patchSocial(id: string, partial: Partial<SocialLink>): Promise<SocialLink> {
    const current = await this.getSocials();
    const target = current.find((s) => s.id === id);
    const cleanPartial = Object.fromEntries(Object.entries(partial).filter(([_, v]) => v !== undefined));

    const supabase = createClient();
    if (supabase && id) {
      const { data, error } = await supabase.from('social_links').update(cleanPartial).eq('id', id).select().single();
      if (!error && data) {
        const updatedList = current.map((s) => (s.id === id ? data : s));
        this.setStorage('socials', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }

    if (!target) throw new Error(`Social ${id} not found`);
    const updated = { ...target, ...cleanPartial };
    const updatedList = current.map((s) => (s.id === id ? updated : s));
    this.setStorage('socials', updatedList);
    this.triggerRevalidation('/');
    return updated;
  }

  async saveSocial(soc: SocialLink): Promise<SocialLink> {
    if (soc.id) return this.patchSocial(soc.id, soc);
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('social_links').insert(soc).select().single();
      if (data) {
        const current = await this.getSocials();
        const updatedList = [...current, data];
        this.setStorage('socials', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }
    const current = await this.getSocials();
    const item = { ...soc, id: `soc-${Date.now()}` };
    const updatedList = [...current, item];
    this.setStorage('socials', updatedList);
    this.triggerRevalidation('/');
    return item;
  }

  async deleteSocial(id: string): Promise<void> {
    const supabase = createClient();
    if (supabase) await supabase.from('social_links').delete().eq('id', id);
    const current = await this.getSocials();
    this.setStorage('socials', current.filter((s) => s.id !== id));
    this.triggerRevalidation('/');
  }

  // ==========================================
  // MESSAGES
  // ==========================================
  async getMessages(): Promise<Message[]> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (data) {
        this.setStorage('messages', data);
        return data;
      }
    }
    return this.getStorage<Message[]>('messages', [
      {
        id: 'msg-1',
        name: 'Budi Santoso',
        email: 'budi.santoso@company.co.id',
        whatsapp: '+6281987654321',
        subject: 'Penawaran Project Web Application Enterprise',
        message: 'Halo Mas Taufik, kami tertarik untuk membuat aplikasi audit internal dan inventory management di perusahaan kami. Mohon infokan ketersediaan waktu untuk diskusi via Google Meet.',
        is_read: false,
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: 'msg-2',
        name: 'Sarah Wijaya',
        email: 'sarah@startup.io',
        whatsapp: '+628571234567',
        subject: 'Kerjasama Development Landing Page',
        message: 'Selamat siang Taufik. Saya melihat portfolio Next.js Anda sangat menarik. Apakah Anda available untuk penanganan revamp landing page startup kami?',
        is_read: true,
        created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      }
    ]);
  }

  async sendMessage(msg: Omit<Message, 'id' | 'is_read' | 'created_at'>): Promise<Message> {
    const newMsg: Message = {
      ...msg,
      id: `msg-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('messages').insert({
        name: msg.name,
        email: msg.email,
        whatsapp: msg.whatsapp,
        subject: msg.subject,
        message: msg.message,
      }).select().single();
      if (data) {
        const current = await this.getMessages();
        const updated = [data, ...current];
        this.setStorage('messages', updated);
        return data;
      }
    }
    const current = this.getStorage<Message[]>('messages', []);
    const updated = [newMsg, ...current];
    this.setStorage('messages', updated);
    return newMsg;
  }

  async toggleReadMessage(id: string): Promise<void> {
    const current = await this.getMessages();
    const target = current.find(m => m.id === id);
    if (!target) return;
    const isRead = !target.is_read;

    const supabase = createClient();
    if (supabase) {
      await supabase.from('messages').update({ is_read: isRead }).eq('id', id);
    }
    const updated = current.map(m => m.id === id ? { ...m, is_read: isRead } : m);
    this.setStorage('messages', updated);
  }

  async deleteMessage(id: string): Promise<void> {
    const supabase = createClient();
    if (supabase) await supabase.from('messages').delete().eq('id', id);
    const current = await this.getMessages();
    this.setStorage('messages', current.filter(m => m.id !== id));
  }

  // ==========================================
  // TESTIMONIALS (ATOMIC PARTIAL UPDATE)
  // ==========================================
  async getTestimonials(): Promise<Testimonial[]> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });
      if (data && data.length > 0) {
        this.setStorage('testimonials', data);
        return data;
      }
    }
    return this.getStorage<Testimonial[]>('testimonials', initialTestimonials);
  }

  async patchTestimonial(id: string, partial: Partial<Testimonial>): Promise<Testimonial> {
    const current = await this.getTestimonials();
    const target = current.find((t) => t.id === id);
    const cleanPartial = Object.fromEntries(Object.entries(partial).filter(([_, v]) => v !== undefined));

    const supabase = createClient();
    if (supabase && id) {
      const { data, error } = await supabase.from('testimonials').update(cleanPartial).eq('id', id).select().single();
      if (!error && data) {
        const updatedList = current.map((t) => (t.id === id ? data : t));
        this.setStorage('testimonials', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }

    if (!target) throw new Error(`Testimonial ${id} not found`);
    const updated = { ...target, ...cleanPartial };
    const updatedList = current.map((t) => (t.id === id ? updated : t));
    this.setStorage('testimonials', updatedList);
    this.triggerRevalidation('/');
    return updated;
  }

  async saveTestimonial(item: Testimonial): Promise<Testimonial> {
    if (item.id) return this.patchTestimonial(item.id, item);
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('testimonials').insert(item).select().single();
      if (data) {
        const current = await this.getTestimonials();
        const updatedList = [...current, data];
        this.setStorage('testimonials', updatedList);
        this.triggerRevalidation('/');
        return data;
      }
    }
    const current = await this.getTestimonials();
    const newItem = { ...item, id: `test-${Date.now()}` };
    const updatedList = [...current, newItem];
    this.setStorage('testimonials', updatedList);
    this.triggerRevalidation('/');
    return newItem;
  }

  async deleteTestimonial(id: string): Promise<void> {
    const supabase = createClient();
    if (supabase) await supabase.from('testimonials').delete().eq('id', id);
    const current = await this.getTestimonials();
    this.setStorage('testimonials', current.filter((t) => t.id !== id));
    this.triggerRevalidation('/');
  }

  // ==========================================
  // SITE SETTINGS (ATOMIC PARTIAL UPDATE)
  // ==========================================
  async getSettings(): Promise<SiteSettings> {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.from('site_settings').select('*').limit(1).single();
      if (data) {
        this.setStorage('settings', data);
        return data;
      }
    }
    return this.getStorage<SiteSettings>('settings', initialSettings);
  }

  async patchSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSettings();
    const cleanPartial = Object.fromEntries(Object.entries(partial).filter(([_, v]) => v !== undefined));

    const supabase = createClient();
    if (supabase && current.id) {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ ...cleanPartial, updated_at: new Date().toISOString() })
        .eq('id', current.id)
        .select()
        .single();

      if (!error && data) {
        this.setStorage('settings', data);
        this.triggerRevalidation('/');
        return data;
      }
    }

    const updated = { ...current, ...cleanPartial, updated_at: new Date().toISOString() };
    this.setStorage('settings', updated);
    this.triggerRevalidation('/');
    return updated;
  }

  async updateSettings(settings: SiteSettings): Promise<SiteSettings> {
    return this.patchSettings(settings);
  }
}

export const dataService = new DataService();
