-- ==========================================
-- SUPABASE RELATIONAL DATABASE SCHEMA & SEED
-- Portfolio & Admin Dashboard: Taufik Rahman
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL DEFAULT 'Taufik Rahman',
    avatar_url TEXT DEFAULT '',
    headline TEXT DEFAULT 'Full Stack Web Developer & Information Systems Graduate',
    bio TEXT DEFAULT 'Passionate Full Stack Developer with expertise in building scalable, modern web applications, clean UI/UX designs, and secure IT infrastructures.',
    email TEXT DEFAULT 'taufikrahman.dev@gmail.com',
    whatsapp TEXT DEFAULT '+6281234567890',
    location TEXT DEFAULT 'Indonesia',
    availability_status TEXT DEFAULT 'Available for Work',
    cv_url TEXT DEFAULT '#',
    roles TEXT[] DEFAULT ARRAY['Full Stack Web Developer', 'Information Systems Graduate', 'Web Developer', 'IT & Cybersecurity Enthusiast'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    thumbnail_url TEXT DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Web Application',
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    project_year TEXT DEFAULT '2024',
    live_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    is_featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PROJECT IMAGES GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Frontend',
    level INT DEFAULT 85,
    icon TEXT DEFAULT 'Code',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    position TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. EDUCATIONS TABLE
CREATE TABLE IF NOT EXISTS public.educations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university TEXT NOT NULL,
    major TEXT NOT NULL,
    year TEXT NOT NULL,
    gpa TEXT DEFAULT '',
    description TEXT DEFAULT '',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    year TEXT NOT NULL,
    credential_id TEXT DEFAULT '',
    credential_url TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'Layout',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT DEFAULT 'Globe',
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT DEFAULT '',
    subject TEXT DEFAULT '',
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_color TEXT DEFAULT 'violet',
    accent_color TEXT DEFAULT 'cyan',
    background_theme TEXT DEFAULT 'dark',
    font_family TEXT DEFAULT 'Inter',
    border_radius TEXT DEFAULT '0.75rem',
    default_mode TEXT DEFAULT 'dark',
    hero_gradient TEXT DEFAULT 'from-violet-600/20 via-indigo-600/20 to-cyan-500/20',
    button_style TEXT DEFAULT 'rounded-full',
    site_title TEXT DEFAULT 'Taufik Rahman - Full Stack Developer Portfolio',
    meta_description TEXT DEFAULT 'Portfolio profesional Taufik Rahman, Full Stack Web Developer & Information Systems Graduate.',
    meta_keywords TEXT DEFAULT 'Taufik Rahman, Portfolio, Full Stack Developer, Next.js, React, Laravel, Tailwind CSS, Developer Indonesia',
    og_image_url TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Everyone can read published/active data)
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Public Read Project Images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Educations" ON public.educations FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Social Links" ON public.social_links FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);

-- PUBLIC INSERT POLICY FOR CONTACT MESSAGES
CREATE POLICY "Public Insert Messages" ON public.messages FOR INSERT WITH CHECK (true);

-- AUTHENTICATED ADMIN FULL ACCESS (ALL OPERATIONS)
CREATE POLICY "Admin All Profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Project Images" ON public.project_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Experiences" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Educations" ON public.educations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Certificates" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Social Links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Messages" ON public.messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- STORAGE BUCKETS SETUP
-- ==========================================

INSERT INTO storage.buckets (id, name, public) VALUES ('profile', 'profile', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('projects', 'projects', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Bucket Storage Read" ON storage.objects FOR SELECT USING (bucket_id IN ('profile', 'projects', 'certificates', 'site-assets'));
CREATE POLICY "Admin Bucket Storage Insert" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin Bucket Storage Update" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Bucket Storage Delete" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');

-- ==========================================
-- INITIAL SEED DATA
-- ==========================================

INSERT INTO public.profiles (name, headline, bio, email, whatsapp, location, availability_status, roles)
VALUES (
    'Taufik Rahman',
    'Full Stack Web Developer & Information Systems Graduate',
    'Passionate Full Stack Web Developer with a strong foundation in Information Systems, modern frontend framework engineering, enterprise backend architectures, and cybersecurity best practices.',
    'taufikrahman.dev@gmail.com',
    '+6281234567890',
    'Indonesia',
    'Available for Work',
    ARRAY['Full Stack Web Developer', 'Information Systems Graduate', 'Web Developer', 'IT & Cybersecurity Enthusiast']
) ON CONFLICT DO NOTHING;

INSERT INTO public.site_settings (primary_color, accent_color, site_title)
VALUES ('violet', 'cyan', 'Taufik Rahman - Professional Developer Portfolio')
ON CONFLICT DO NOTHING;
