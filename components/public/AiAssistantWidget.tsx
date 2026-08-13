'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export function AiAssistantWidget() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize Welcome Message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeText = t(
        'Halo! Saya Asisten AI Taufik Rahman, S.Kom. Saya dapat berbicara dan menjawab pertanyaan seputar 11 Sertifikat Keamanan Siber & IT, 8 Pengalaman Kerja (Mabes TNI, Lapas, Polsek), Skillset (Next.js, CapCut, Cybersecurity), atau jadwal kontak. Ada yang bisa saya bantu?',
        'Hello! I am Taufik Rahman’s AI Voice Assistant. I can speak and answer questions about his 11 Verified IT/Cybersecurity Certificates, 8 Work Experiences (Mabes TNI, Lapas, Police Dept), Skillset, or contact options. How can I assist you today?'
      );
      setMessages([
        {
          sender: 'ai',
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      if (voiceEnabled) speakText(welcomeText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Auto-scroll chat feed
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  // Text-To-Speech (AI Voice Synthesis)
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Speech-To-Text (Voice Mic Recognition)
  const toggleListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Browser Anda belum mendukung Speech Recognition. Gunakan Google Chrome atau Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setInputQuery(transcript);
        handleSendQuery(transcript);
      }
    };

    recognition.start();
  };

  // Pre-trained Portfolio AI Knowledge Base Engine
  const generateAiReply = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('sertifikat') || q.includes('certificate') || q.includes('lisensi') || q.includes('csirt') || q.includes('tni')) {
      return t(
        'Taufik Rahman memiliki 11 Sertifikat Resmi terverifikasi, antara lain: 1) Apresiasi CILACAPKAB-CSIRT (2026), 2) Penghargaan DANSATSIBER Mabes TNI (2026), 3) Apresiasi CSIRT-BMKG (2026), 4) MSIB Angkatan 7 Digital Forensik, 5) Google IT Support Professional (5 Courses), 6) TOEFL Test Skor 607 dari Elskill, 7) Microsoft & InfraDigital Cyber Resilience, 8) Pemagangan KEMNAKER & Lapas Kelas IIA Bekasi (Sangat Baik), 9) Pelatihan Kewirausahaan Disnaker Kab. Bandung, 10) Diskominfo Jabar Akselerasi Digital, dan 11) Candradimuka Jabar Coding Camp 2022 Predikat Master.',
        'Taufik Rahman holds 11 Verified Official Certificates, including: 1) CILACAPKAB-CSIRT Award (2026), 2) DANSATSIBER Mabes TNI Cyber Award (2026), 3) CSIRT-BMKG Appreciation (2026), 4) MSIB Batch 7 Digital Forensics, 5) Google IT Support Professional (5 Courses), 6) TOEFL Score 607 from Elskill, 7) Microsoft & InfraDigital Cyber Resilience, 8) KEMNAKER & Lapas Bekasi Internship (Grade: Very Good), 9) Disnaker Bandung Entrepreneurship Training, 10) Diskominfo Jabar Digital Transformation, and 11) Candradimuka Jabar Coding Camp 2022 Master Predicate.'
      );
    }

    if (q.includes('pengalaman') || q.includes('kerja') || q.includes('experience') || q.includes('lapas') || q.includes('polri') || q.includes('polsek')) {
      return t(
        'Taufik Rahman memiliki 8 Pengalaman Kerja Profesional: 1) Peserta Magang Manajemen Fasilitas Umum di Lapas Kelas IIA Bekasi (2025-2026), 2) Peserta Magang Digital Forensik di PT Analyst Forensik Digital (2024), 3) Analis Keamanan Siber di Kepolisian Negara Republik Indonesia (2021-2025), 4) Humas & Publikasi Media di Polsek Pacet Polresta Bandung (2021-2025), 5) Pengembang Full Stack di Polsek Cikancung, 6) UI/UX Designer di Truelancer, 7) Teknisi Dukungan TI di CV Ebahero Majalaya, dan 8) Junior/Madya Software Developer di Sportbet.',
        'Taufik Rahman has 8 Professional Work Experiences: 1) General Facilities Management Intern at Lapas Class IIA Bekasi (2025-2026), 2) Digital Forensics Intern at PT Analyst Forensik Digital (2024), 3) Cybersecurity Analyst at Indonesian National Police / POLRI (2021-2025), 4) Public Relations & Media Officer at Polsek Pacet Polresta Bandung (2021-2025), 5) Full Stack Developer at Polsek Cikancung, 6) UI/UX Designer at Truelancer, 7) IT Support Technician at CV Ebahero Majalaya, and 8) Software Developer at Sportbet.'
      );
    }

    if (q.includes('toefl') || q.includes('bahasa') || q.includes('inggris') || q.includes('english')) {
      return t(
        'Taufik Rahman meraih Skor TOEFL 607 pada Test of English Proficiency and Academic (Listening: 61, Structure: 54, Reading: 67) dari Elskill English Course, valid hingga Oktober 2027.',
        'Taufik Rahman achieved a TOEFL Score of 607 on the Test of English Proficiency and Academic (Listening: 61, Structure: 54, Reading: 67) from Elskill English Course, valid through October 2027.'
      );
    }

    if (q.includes('skill') || q.includes('keahlian') || q.includes('tools') || q.includes('capcut') || q.includes('photoshop') || q.includes('next.js') || q.includes('laravel')) {
      return t(
        'Skillset teknis Taufik mencakup: Next.js (90%), React.js (92%), TypeScript (88%), Tailwind CSS (95%), Laravel (88%), PHP (90%), MySQL & PostgreSQL (88%), Supabase (85%), CapCut Video Editor (92%), Adobe Photoshop (90%), Adobe Illustrator (88%), Figma UI/UX (90%), Canva (95%), serta FTK & Digital Forensics (88%).',
        'Taufik’s technical skillset includes: Next.js (90%), React.js (92%), TypeScript (88%), Tailwind CSS (95%), Laravel (88%), PHP (90%), MySQL & PostgreSQL (88%), Supabase (85%), CapCut Video Editor (92%), Adobe Photoshop (90%), Adobe Illustrator (88%), Figma UI/UX (90%), Canva (95%), and FTK Digital Forensics (88%).'
      );
    }

    if (q.includes('kontak') || q.includes('hubungi') || q.includes('email') || q.includes('whatsapp') || q.includes('contact')) {
      return t(
        'Anda dapat menghubungi Taufik Rahman secara langsung melalui WhatsApp (+6281234567890) atau Email Official di taufikrahman.dev@gmail.com. Anda juga dapat mengisi formulir pesan di bagian bawah website.',
        'You can reach Taufik Rahman directly via WhatsApp (+6281234567890) or Official Email at taufikrahman.dev@gmail.com. You can also fill out the contact form at the bottom of the website.'
      );
    }

    if (q.includes('siapa') || q.includes('siapa taufik') || q.includes('who is') || q.includes('bio') || q.includes('profile')) {
      return t(
        'Taufik Rahman, S.Kom adalah seorang Lulusan Sistem Informasi & Full Stack Web Developer serta Praktisi Keamanan Siber Indonesia yang berpengalaman mengembangkan aplikasi web enterprise berskala besar, sistem informasi kepolisian, dan pengujian kerentanan siber.',
        'Taufik Rahman, S.Kom is an Information Systems Graduate, Full Stack Web Developer, and Cybersecurity Practitioner from Indonesia with proven experience developing large-scale enterprise web systems and conducting cyber vulnerability analysis.'
      );
    }

    return t(
      `Terima kasih atas pertanyaannya! Taufik Rahman S.Kom adalah Full Stack Developer & Spesialis Keamanan Siber dengan 11 Sertifikat Resmi (termasuk Mabes TNI, BMKG, Cilacap CSIRT, Google IT, MSIB) dan 8 Pengalaman Kerja (Lapas Bekasi, Polri, Polsek Pacet). Silakan hubungi beliau via WhatsApp (+6281234567890) atau Email: taufikrahman.dev@gmail.com!`,
      `Thank you for asking! Taufik Rahman S.Kom is a Full Stack Developer & Cybersecurity Specialist with 11 Verified Certificates (including Mabes TNI, BMKG, Cilacap CSIRT, Google IT) and 8 Work Experiences. Feel free to contact him via WhatsApp (+6281234567890) or Email: taufikrahman.dev@gmail.com!`
    );
  };

  const handleSendQuery = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setThinking(true);

    setTimeout(() => {
      const reply = generateAiReply(query);
      const aiMessage: Message = {
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setThinking(false);

      if (voiceEnabled) {
        speakText(reply);
      }
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendQuery();
    }
  };

  const quickPrompts = [
    { label: t('11 Sertifikat Resmi', '11 Verified Certificates'), query: 'Apa saja sertifikat resmi Taufik?' },
    { label: t('Pengalaman Mabes TNI & Lapas', 'Mabes TNI & Lapas Experience'), query: 'Bagaimana pengalaman kerja Taufik di Mabes TNI dan Lapas?' },
    { label: t('Skor TOEFL 607', 'TOEFL Score 607'), query: 'Berapa skor TOEFL Taufik?' },
    { label: t('Keahlian CapCut & Code', 'CapCut & Code Skills'), query: 'Apa saja skill CapCut dan pemrograman Taufik?' },
  ];

  return (
    <>
      {/* Floating AI Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            if (isSpeaking) stopSpeaking();
          }}
          className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-primary via-indigo-600 to-accent text-white shadow-2xl hover:shadow-primary/50 transition-all duration-300 border border-white/20"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md">
            <Bot className="w-5 h-5 text-white animate-bounce" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-primary animate-ping" />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide hidden sm:inline">
            {t('Tanya AI Taufik 🤖', 'Ask AI Taufik 🤖')}
          </span>
          {isSpeaking && (
            <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-400 text-black font-extrabold text-[10px] animate-pulse">
              <Volume2 className="w-3 h-3" />
              <span>Speaking</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* AI Voice & Chat Interactive Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[80vh] h-[560px] rounded-3xl border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Widget Header */}
            <div className="p-4 border-b border-border/60 bg-gradient-to-r from-primary/10 via-indigo-500/10 to-accent/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-md">
                  <Bot className="w-6 h-6" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-card" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <span>Asisten AI Taufik Rahman</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {isSpeaking ? (
                      <span className="text-emerald-500 font-semibold flex items-center gap-1">
                        <Volume2 className="w-3 h-3 animate-pulse" />
                        <span>{t('Berbicara (Voice Output)...', 'Speaking Voice Output...')}</span>
                      </span>
                    ) : (
                      t('Voice & Chat Assistant (S.Kom AI)', 'Voice & Chat Assistant (S.Kom AI)')
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Voice Mute/Unmute Toggle Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (isSpeaking) stopSpeaking();
                    setVoiceEnabled(!voiceEnabled);
                  }}
                  className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground"
                  title={voiceEnabled ? 'Matikan Suara AI' : 'Aktifkan Suara AI'}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
                </Button>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 space-y-1 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted/80 text-foreground border border-border/60 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                    <span className="text-[9px] opacity-70 block text-right font-mono">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="flex justify-start">
                  <div className="bg-muted/80 border border-border/60 rounded-2xl rounded-bl-none p-3 flex items-center gap-2 text-muted-foreground text-xs">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                    <span>{t('AI sedang berpikir & menyiapkan jawaban...', 'AI is thinking & preparing answer...')}</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts Pills */}
            <div className="px-3 py-2 border-t border-border/40 bg-muted/30 flex gap-2 overflow-x-auto">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendQuery(p.query)}
                  className="px-2.5 py-1 rounded-full bg-card border border-border/70 text-[10px] font-semibold text-muted-foreground hover:text-primary hover:border-primary shrink-0 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input & Voice Controls Footer */}
            <div className="p-3 border-t border-border/60 bg-card flex items-center gap-2">
              {/* Mic Speech-to-Text Button */}
              <Button
                type="button"
                variant={isListening ? 'destructive' : 'outline'}
                size="icon"
                onClick={toggleListening}
                className="rounded-full w-9 h-9 shrink-0"
                title={isListening ? 'Mendengarkan suara Anda...' : 'Bicara dengan Mikrofon'}
              >
                {isListening ? <MicOff className="w-4 h-4 animate-ping" /> : <Mic className="w-4 h-4 text-primary" />}
              </Button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={isListening ? t('Mendengarkan...', 'Listening...') : t('Tanyakan sesuatu tentang Taufik...', 'Ask something about Taufik...')}
                className="flex-1 bg-muted/60 border border-border/60 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              />

              <Button
                type="button"
                variant="gradient"
                size="icon"
                onClick={() => handleSendQuery()}
                disabled={!inputQuery.trim()}
                className="rounded-full w-9 h-9 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
