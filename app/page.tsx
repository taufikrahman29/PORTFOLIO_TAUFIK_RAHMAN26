'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { About } from '@/components/public/About';
import { SkillsSection } from '@/components/public/SkillsSection';
import { ProjectsSection } from '@/components/public/ProjectsSection';
import { ExperienceTimeline } from '@/components/public/ExperienceTimeline';
import { CertificatesSection } from '@/components/public/CertificatesSection';
import { ServicesSection } from '@/components/public/ServicesSection';
import { TestimonialsSection } from '@/components/public/TestimonialsSection';
import { ContactSection } from '@/components/public/ContactSection';
import { Footer } from '@/components/public/Footer';
import { AiAssistantWidget } from '@/components/public/AiAssistantWidget';
import { dataService, initialProfile, initialSkills, initialProjects, initialExperiences, initialEducations, initialCertificates, initialServices, initialSocials, initialTestimonials } from '@/lib/data-store';
import { Profile, Skill, Project, Experience, Education, Certificate, Service, SocialLink, Testimonial } from '@/lib/types';

export default function HomePage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [educations, setEducations] = useState<Education[]>(initialEducations);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [socials, setSocials] = useState<SocialLink[]>(initialSocials);
  const [loading, setLoading] = useState(true);

  const loadAllData = async () => {
    try {
      const [
        profileData,
        skillsData,
        projectsData,
        expData,
        eduData,
        certData,
        srvData,
        testData,
        socData,
      ] = await Promise.all([
        dataService.getProfile(),
        dataService.getSkills(),
        dataService.getProjects(),
        dataService.getExperiences(),
        dataService.getEducations(),
        dataService.getCertificates(),
        dataService.getServices(),
        dataService.getTestimonials(),
        dataService.getSocials(),
      ]);

      setProfile(profileData);
      setSkills(skillsData);
      setProjects(projectsData);
      setExperiences(expData);
      setEducations(eduData);
      setCertificates(certData);
      setServices(srvData);
      setTestimonials(testData);
      setSocials(socData);
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();

    // LISTEN TO INSTANT DATA SYNC EVENTS FROM ADMIN
    const handleSync = () => {
      loadAllData();
    };
    window.addEventListener('tr_data_sync', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('tr_data_sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  return (
    <main className="min-h-screen relative selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero profile={profile} socials={socials} />
      <About
        profile={profile}
        projectCount={projects.length}
        skillCount={skills.length}
        experienceCount={experiences.length}
        certCount={certificates.length}
      />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceTimeline experiences={experiences} educations={educations} />
      <CertificatesSection certificates={certificates} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection profile={profile} socials={socials} />
      <Footer socials={socials} />
      <AiAssistantWidget />
    </main>
  );
}
