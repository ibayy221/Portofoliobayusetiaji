'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { EDUCATION, TECHNICAL_SKILLS, PERSONAL_INFO } from '@/data/portfolioData';
import {
  GraduationCap,
  Wrench,
  Phone,
  Mail,
  Globe,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

export default function BentoAboutSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="about" className="py-20 relative bg-black">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-zinc-800 pb-5 gap-4">
          <div>

            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-serif">
              KEAHLIAN &amp; LATAR BELAKANG
            </h2>
          </div>

        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Bento Card 1: Education (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-5 clean-panel p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-white" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">Pendidikan</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 font-bold">AKADEMIK</span>
              </div>

              <div className="space-y-4">
                {EDUCATION.map((edu, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-zinc-700 hover:border-white transition-colors">
                    <h4 className="text-sm font-bold text-white">{edu.institution}</h4>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{edu.location} • {edu.period}</p>
                    {edu.major && (
                      <p className="text-xs text-zinc-300 font-medium mt-1">
                        {edu.major}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Kombinasi: Desain + Kode</span>
              <span className="text-white font-semibold">Karawang, ID</span>
            </div>
          </motion.div>

          {/* Bento Card 2: Software & Tools Grid (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-7 clean-panel p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-white" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">Software &amp; Perangkat</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 font-bold">KEMAMPUAN</span>
              </div>

              <p className="text-xs text-zinc-400 mb-5 font-normal">
                Perangkat lunak utama untuk branding visual, editing video harian, retouching foto, dan rekayasa perangkat lunak.
              </p>

              {/* Glowing Skill Cards (Monochrome White) */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {TECHNICAL_SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 transition-all cursor-pointer group glow-mono"
                  >
                    <div className="w-10 h-10 rounded-lg p-1 flex items-center justify-center mb-1.5 relative overflow-hidden">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={36}
                        height={36}
                        className="object-contain filter grayscale contrast-[1.1] group-hover:grayscale-0 group-hover:scale-110 transition-all"
                        unoptimized
                      />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-300 text-center truncate w-full group-hover:text-white">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: Contact & Links (Span 12) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-12 clean-panel p-6 rounded-2xl"
          >
            <div className="mb-5 pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Kontak Langsung</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* WhatsApp */}
              <a
                href={PERSONAL_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white text-black shrink-0">
                  <Phone className="w-4 h-4 text-black fill-black" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-zinc-400 uppercase block font-mono font-bold">WhatsApp Langsung</span>
                  <span className="text-xs font-semibold text-white group-hover:text-zinc-200 transition-colors truncate block">
                    {PERSONAL_INFO.contact.whatsapp}
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.contact.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-zinc-800 text-white shrink-0">
                  <LinkedinIcon className="w-4 h-4 text-white" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-zinc-400 uppercase block font-mono font-bold">Profil LinkedIn</span>
                  <span className="text-xs font-semibold text-white group-hover:text-zinc-200 transition-colors truncate block">
                    {PERSONAL_INFO.contact.linkedin}
                  </span>
                </div>
              </a>

              {/* Email Copy */}
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-white transition-colors text-left group w-full"
              >
                <div className="p-2 rounded-lg bg-zinc-800 text-white shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-[10px] text-zinc-400 uppercase block font-mono font-bold">Salin Email</span>
                  <span className="text-xs font-semibold text-white truncate block">
                    {PERSONAL_INFO.contact.email}
                  </span>
                </div>
                {copiedEmail ? <Check className="w-4 h-4 text-white shrink-0" /> : <Copy className="w-3.5 h-3.5 text-zinc-500 shrink-0" />}
              </button>

              {/* Website */}
              <a
                href={PERSONAL_INFO.contact.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-zinc-800 text-white shrink-0">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-[10px] text-zinc-400 uppercase block font-mono font-bold">Live Portfolio</span>
                  <span className="text-xs font-semibold text-white group-hover:text-zinc-200 transition-colors truncate block">
                    {PERSONAL_INFO.contact.website}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
