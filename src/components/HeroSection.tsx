'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { FolderKanban, ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center bg-black overflow-hidden"
    >
      {/* Subtle Monochrome Glow Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-zinc-800/15 via-zinc-900/10 to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ========================================================
              LEFT COLUMN: PUNCHY VISUAL HEADLINE & HRD QUICK SCAN (BLACK & WHITE)
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >


            {/* Main Headline */}
            <div className="select-none space-y-1">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-tight uppercase leading-[0.92] font-serif text-white">
                <span className="block text-stroke-outline">VISUAL</span>
                <span className="block text-white -mt-1 sm:-mt-2">DESIGNER</span>
              </h1>
            </div>

            {/* Pure Typographic Editorial Overview (0 Icons) */}
            <div className="bg-zinc-950/90 p-6 rounded-3xl border border-zinc-800 space-y-6 shadow-2xl backdrop-blur-xl">
              {/* Header Status Bar */}
              <div className="border-b border-zinc-800/80 pb-4">
                <span className="text-xs font-mono text-zinc-300 font-extrabold uppercase tracking-widest">
                  KARIER
                </span>
              </div>

              {/* Pure Typography Editorial Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-left">
                {/* Item 1 */}
                <div className="space-y-1 border-l-2 border-zinc-700 pl-3.5 hover:border-white transition-colors group">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold block group-hover:text-zinc-300 transition-colors">
                    01. SPESIALISASI
                  </span>
                  <h3 className="text-sm font-bold text-white font-serif tracking-tight">
                    Desainer Grafis &amp; Software Eng
                  </h3>
                </div>

                {/* Item 2 */}
                <div className="space-y-1 border-l-2 border-zinc-700 pl-3.5 hover:border-white transition-colors group">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold block group-hover:text-zinc-300 transition-colors">
                    02. LOKASI UTAMA
                  </span>
                  <h3 className="text-sm font-bold text-white font-serif tracking-tight">
                    Karawang, Jawa Barat, ID
                  </h3>
                </div>

                {/* Item 3 */}
                <div className="space-y-1 border-l-2 border-zinc-700 pl-3.5 hover:border-white transition-colors group">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold block group-hover:text-zinc-300 transition-colors">
                    03. INDUSTRI PERHOTELAN
                  </span>
                  <h3 className="text-sm font-bold text-white font-serif tracking-tight">
                    Mercure Karawang <span className="text-xs font-sans text-zinc-400 font-normal">(Grup Hotel Accor)</span>
                  </h3>
                </div>

                {/* Item 4 */}
                <div className="space-y-1 border-l-2 border-zinc-700 pl-3.5 hover:border-white transition-colors group">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold block group-hover:text-zinc-300 transition-colors">
                    04. BRAND DISTRIBUTOR
                  </span>
                  <h3 className="text-sm font-bold text-white font-serif tracking-tight">
                    Cue Corner Billiard <span className="text-xs font-sans text-zinc-400 font-normal">(Distributor Resmi)</span>
                  </h3>
                </div>
              </div>
            </div>



            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 uppercase tracking-wider"
              >
                <FolderKanban className="w-4 h-4" />
                <span>Jelajahi Karya Visual</span>
              </a>
              <a
                href={PERSONAL_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900 border border-zinc-700 hover:border-white text-white font-bold text-xs transition-colors shadow-lg uppercase tracking-wider"
              >
                <span>WhatsApp Langsung</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-300" />
              </a>
            </div>

          </motion.div>

          {/* ========================================================
              RIGHT COLUMN: HIGH CONTRAST PORTRAIT WITH BRAND LOGOS
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center"
          >
            <div className="relative w-full max-w-sm">
              
              {/* Outer Glow Card Container */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl group">
                <Image
                  src="/Images/Bayu.png"
                  alt="Bayu Setiaji - Graphic Designer"
                  fill
                  className="object-cover object-top filter contrast-[1.08] grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                  unoptimized
                />



                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-between text-xs">
                  <div>
                    <h3 className="text-base font-extrabold text-white tracking-wide font-serif">Bayu Setiaji</h3>
                    <span className="text-[11px] font-mono text-zinc-400 block">Graphic Designer &amp; Producer</span>
                  </div>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-white font-semibold">
                    Karawang, ID
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
