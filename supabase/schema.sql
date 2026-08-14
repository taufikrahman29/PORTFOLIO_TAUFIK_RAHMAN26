-- ==========================================
-- SUPABASE RELATIONAL DATABASE SCHEMA & SEED
-- Portfolio & Admin Dashboard: Taufik Rahman
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (TEXT PRIMARY KEY for flexible string/UUID IDs)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL DEFAULT 'Taufik Rahman',
    avatar_url TEXT DEFAULT '',
    headline TEXT DEFAULT 'Full Stack Web Developer & Information Systems Graduate',
    bio TEXT DEFAULT 'Lulusan Sistem Informasi & Full Stack Developer yang berfokus pada pembuatan aplikasi web enterprise modern.',
    email TEXT DEFAULT 'taufikrahman.dev@gmail.com',
    whatsapp TEXT DEFAULT '+6281234567890',
    location TEXT DEFAULT 'Indonesia',
    availability_status TEXT DEFAULT 'Available for Work',
    cv_url TEXT DEFAULT '#',
    roles TEXT[] DEFAULT ARRAY['Full Stack Web Developer', 'Information Systems Graduate'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
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
    gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PROJECT IMAGES GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.project_images (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
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
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
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
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
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
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
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
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'Layout',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    role TEXT DEFAULT '',
    company TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    content TEXT NOT NULL,
    rating INT DEFAULT 5,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT DEFAULT 'Globe',
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT DEFAULT '',
    subject TEXT DEFAULT '',
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
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
    meta_keywords TEXT DEFAULT 'Taufik Rahman, Portfolio, Full Stack Developer',
    og_image_url TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Disable or Allow Full Access for Seamless Admin Operations
-- ==========================================

ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings DISABLE ROW LEVEL SECURITY;
