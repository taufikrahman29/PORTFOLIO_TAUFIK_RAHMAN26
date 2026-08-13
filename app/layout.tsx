import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ToastProvider } from '@/components/ui/toast';
import { LanguageProvider } from '@/lib/language-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taufik Rahman - Full Stack Developer Portfolio',
  description: 'Portfolio profesional Taufik Rahman, Full Stack Web Developer & Information Systems Graduate. Spesialisasi Next.js, React, Laravel, & Tailwind CSS.',
  keywords: ['Taufik Rahman', 'Portfolio', 'Full Stack Developer', 'Next.js', 'React', 'Laravel', 'Tailwind CSS', 'Sistem Informasi', 'Indonesia'],
  authors: [{ name: 'Taufik Rahman' }],
  openGraph: {
    title: 'Taufik Rahman - Full Stack Developer Portfolio',
    description: 'Portfolio profesional Taufik Rahman, Full Stack Web Developer & Information Systems Graduate.',
    url: 'https://taufikrahman.dev',
    siteName: 'Taufik Rahman Portfolio',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taufik Rahman - Full Stack Developer Portfolio',
    description: 'Full Stack Web Developer & Information Systems Graduate',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
