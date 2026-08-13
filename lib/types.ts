export interface Profile {
  id: string;
  name: string;
  avatar_url: string;
  headline: string;
  bio: string;
  email: string;
  whatsapp: string;
  location: string;
  availability_status: string;
  cv_url: string;
  roles: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  thumbnail_url: string;
  category: string;
  technologies: string[];
  project_year: string;
  live_url: string;
  github_url: string;
  is_featured: boolean;
  published: boolean;
  display_order: number;
  gallery_images?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  display_order: number;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database & DevOps' | 'Tools & Methods' | string;
  level: number; // 0 - 100
  icon: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: string;
  university: string;
  major: string;
  year: string;
  gpa: string;
  description: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credential_id: string;
  credential_url: string;
  image_url: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id?: string;
  primary_color: string;
  accent_color: string;
  background_theme: string;
  font_family: string;
  border_radius: string;
  default_mode: string;
  hero_gradient: string;
  button_style: string;
  site_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image_url: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar_url: string;
  content: string;
  rating: number;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}
