'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project } from '@/data/portfolioData';
import { getYouTubeId, isYouTubeShorts } from '@/utils/youtube';
import {
  CheckCircle2,
  Eye,
  X,
  Building2,
  Dices
} from 'lucide-react';

export default function CareerJourney() {
  const { projects } = usePortfolio();
  const [selectedModalItem, setSelectedModalItem] = useState<Project | null>(null);

  // Filter for Featured Mercure Projects ONLY (Landing Page)
  const mercureProjects = projects.filter((p) => {
    if (!p.featured) return false;
    const clientLower = (p.client || '').toLowerCase();
    const titleLower = (p.title || '').toLowerCase();
    const idLower = (p.id || '').toLowerCase();
    return (
      clientLower.includes('mercure') ||
      clientLower.includes('kunoichi') ||
      titleLower.includes('ramen') ||
      titleLower.includes('shabu') ||
      idLower.includes('ramen') ||
      idLower.includes('shabu')
    );
  });

  // Filter for Featured Cue Corner Projects ONLY (Landing Page)
  const cueCornerProjects = projects.filter((p) => {
    if (!p.featured) return false;
    const clientLower = (p.client || '').toLowerCase();
    const titleLower = (p.title || '').toLowerCase();
    const idLower = (p.id || '').toLowerCase();
    return (
      clientLower.includes('cue corner') ||
      clientLower.includes('billiard') ||
      titleLower.includes('billiard') ||
      titleLower.includes('cue corner') ||
      idLower.includes('cue-corner')
    );
  });

  return (
    <section id="journey" className="py-20 relative bg-black border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-20">

        {/* Section Main Header */}
        <div className="border-b border-zinc-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-serif">
              PENGALAMAN KERJA
            </h2>
          </div>
        </div>

        {/* ========================================================
            JOURNEY SECTION 1: MERCURE KARAWANG (ACCOR GROUP) - MONOCHROME
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header Card Mercure */}
          <div className="clean-panel p-6 sm:p-8 rounded-3xl border-l-4 border-l-white relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-lg">
                  <Image
                    src="/Images/Mercure karawang.png"
                    alt="Logo Mercure Karawang"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-900 text-white border border-zinc-700 font-bold tracking-wider uppercase">
                      PENGALAMAN HOTEL 01
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                      HOTEL GLOBAL ACCOR
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-serif">
                    Mercure Karawang
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Perhotelan &amp; Outlet Restoran Mewah
                  </p>
                </div>
              </div>

              <div className="text-left md:text-right">
                <span className="text-xs font-bold text-white block bg-zinc-900 border border-zinc-700 px-4 py-1.5 rounded-full w-fit md:ml-auto shadow-md">
                  Graphic Designer
                </span>
                <span className="text-[11px] font-mono text-zinc-300 block mt-1 font-semibold">
                  Des 2025 – Apr 2026
                </span>
              </div>
            </div>

            {/* Mercure Responsibilities Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span><strong>Konsistensi Brand:</strong> Mengelola panduan identitas visual brand global Accor.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span><strong>Materi Pemasaran:</strong> Mendesain poster digital, layar LED, X-banner, dan menu restoran.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span><strong>Peningkatan UI:</strong> Membuat grafik antarmuka reservasi internal.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span><strong>Kolaborasi Kampanye:</strong> Bekerja sama dengan tim Sales &amp; Marketing untuk promosi makanan.</span>
              </div>
            </div>
          </div>

          {/* Mercure Project Showcase Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2 font-bold">
                <Building2 className="w-4 h-4 text-white" />
                Karya Visual Mercure Karawang
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mercureProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedModalItem(proj)}
                  className="group clean-panel rounded-2xl p-3.5 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-3 group-hover:border-white transition-colors aspect-[4/5]">
                      {getYouTubeId(proj.image) ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(proj.image)}?rel=0`}
                          className="w-full h-full rounded-lg border-0 pointer-events-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : proj.image.endsWith('.mp4') ? (
                        <video src={proj.image} className="w-full h-full object-cover rounded-lg" controls={false} />
                      ) : (
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          width={400}
                          height={500}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-300 filter contrast-[1.05]"
                          unoptimized
                        />
                      )}

                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-black/90 text-[10px] font-mono text-white border border-zinc-800 backdrop-blur-md z-10 shadow-md font-bold">
                        {proj.categoryLabel}
                      </span>

                      {proj.details?.price && (
                        <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-zinc-900 text-white text-[10px] font-bold border border-zinc-700 backdrop-blur-md z-10 font-mono shadow-md">
                          {proj.details.price}
                        </span>
                      )}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 backdrop-blur-[2px] rounded-xl">
                        <span className="text-[10px] font-mono text-zinc-300">Proyek Mercure</span>
                        <span className="flex items-center gap-1 text-xs text-black font-bold bg-white px-3 py-1 rounded-full">
                          <Eye className="w-3.5 h-3.5" /> Lihat
                        </span>
                      </div>
                    </div>

                    <h5 className="text-xs font-bold text-white mb-1 group-hover:text-zinc-300 transition-colors">{proj.title}</h5>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 mb-3">{proj.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-zinc-800">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Prominent Large View All Button Below Cards */}
            <div className="pt-2 flex justify-center">
              <a
                href="/gallery?filter=mercure"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-zinc-200 transition-all uppercase tracking-wider shadow-xl shadow-white/10 flex items-center justify-center gap-2 group border border-white"
              >
                <span>Lihat Semua Karya Mercure</span>
                <span className="text-black group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            JOURNEY SECTION 2: CUE CORNER (DISTRIBUTOR BILLIARD) - MONOCHROME
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8 pt-8 border-t border-zinc-900"
        >
          {/* Header Card Cue Corner */}
          <div className="clean-panel p-6 sm:p-8 rounded-3xl border-l-4 border-l-zinc-400 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-lg">
                  <Image
                    src="/Images/Cue corner_.png"
                    alt="Logo Cue Corner"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-900 text-white border border-zinc-700 font-bold tracking-wider uppercase">
                      PENGALAMAN DISTRIBUTOR 02
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                      PERALATAN BILIAR
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-serif">
                    Cue Corner
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Distributor Peralatan Biliar &amp; Rumah Konten
                  </p>
                </div>
              </div>

              <div className="text-left md:text-right">
                <span className="text-xs font-bold text-white block bg-zinc-900 border border-zinc-700 px-4 py-1.5 rounded-full w-fit md:ml-auto shadow-md">
                  Desainer &amp; Produsen Konten
                </span>
                <span className="text-[11px] font-mono text-zinc-300 block mt-1 font-semibold">
                  Karier Aktif
                </span>
              </div>
            </div>

            {/* Cue Corner Visual 4-Step Workflow Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-white transition-colors">
                <h4 className="text-xs font-bold text-white mb-1">1. Take Video (Shooting)</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">Videografi mandiri &amp; pengambilan sudut gambar stik biliar.</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-white transition-colors">
                <h4 className="text-xs font-bold text-white mb-1">2. Editing Video Harian</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">Editing video Reels &amp; TikTok promosi ber-engagement tinggi.</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-white transition-colors">
                <h4 className="text-xs font-bold text-white mb-1">3. Penulisan Naskah</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">Menyusun naskah ulasan produk dan hook cerita viral.</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-white transition-colors">
                <h4 className="text-xs font-bold text-white mb-1">4. Penjadwalan Upload</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">Mengatur linimasa rilis harian terstruktur di berbagai saluran.</p>
              </div>
            </div>
          </div>

          {/* Cue Corner Project Showcase */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2 font-bold">
                <Dices className="w-4 h-4 text-white" />
                Karya Produksi Cue Corner
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cueCornerProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedModalItem(proj)}
                  className="group clean-panel rounded-2xl p-3.5 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-3 group-hover:border-white transition-colors aspect-[4/5]">
                      {getYouTubeId(proj.image) ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(proj.image)}?rel=0`}
                          className="w-full h-full rounded-lg border-0 pointer-events-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : proj.image.endsWith('.mp4') ? (
                        <video src={proj.image} className="w-full h-full object-cover rounded-lg" controls={false} />
                      ) : (
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          width={400}
                          height={500}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-300 filter contrast-[1.05]"
                          unoptimized
                        />
                      )}

                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-black/90 text-[10px] font-mono text-white border border-zinc-800 backdrop-blur-md font-bold uppercase">
                        {proj.categoryLabel}
                      </span>

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 backdrop-blur-[2px]">
                        <span className="text-[10px] font-mono text-zinc-300">Karya Cue Corner</span>
                        <span className="flex items-center gap-1 text-xs text-black font-bold bg-white px-3 py-1 rounded-full">
                          <Eye className="w-3.5 h-3.5" /> Detail
                        </span>
                      </div>
                    </div>

                    <h5 className="text-sm font-bold text-white mb-1 group-hover:text-zinc-300 transition-colors">{proj.title}</h5>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed mb-3">{proj.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Prominent Large View All Button Below Cards */}
            <div className="pt-2 flex justify-center">
              <a
                href="/gallery?filter=cuecorner"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-zinc-200 transition-all uppercase tracking-wider shadow-xl shadow-white/10 flex items-center justify-center gap-2 group border border-white"
              >
                <span>Lihat Semua Karya Cue Corner</span>
                <span className="text-black group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Lightbox Detail Modal */}
      <AnimatePresence>
        {selectedModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedModalItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl max-w-xl w-full relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => setSelectedModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors z-20 border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-xs font-mono text-white border border-zinc-700 font-bold uppercase">
                  {selectedModalItem.client || 'Portfolio Work'}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 font-serif">
                  {selectedModalItem.title}
                </h3>
              </div>

              <div className={`w-full rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden relative flex items-center justify-center p-2 min-h-[300px] ${
                (selectedModalItem.aspectRatio === 'portrait' || isYouTubeShorts(selectedModalItem.image))
                  ? 'aspect-[9/16] max-w-xs sm:max-w-sm mx-auto'
                  : 'aspect-video'
              }`}>
                {getYouTubeId(selectedModalItem.image) ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(selectedModalItem.image)}?autoplay=1`}
                    className="w-full h-full rounded-xl border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : selectedModalItem.image.endsWith('.mp4') ? (
                  <video src={selectedModalItem.image} className="w-full h-auto max-h-[60vh] object-contain rounded-xl" controls autoPlay />
                ) : (
                  <Image
                    src={selectedModalItem.image}
                    alt={selectedModalItem.title}
                    width={600}
                    height={800}
                    className="w-full h-auto max-h-[60vh] object-contain rounded-xl filter contrast-[1.05]"
                    unoptimized
                  />
                )}
              </div>

              <div className="space-y-3">
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {selectedModalItem.description}
                </p>
                {selectedModalItem.details?.specs && (
                  <p className="text-xs text-zinc-300 font-mono bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                    <strong>Specs &amp; Deliverables:</strong> {selectedModalItem.details.specs}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedModalItem.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
