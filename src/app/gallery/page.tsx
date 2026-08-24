'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project } from '@/data/portfolioData';
import { getYouTubeId, isYouTubeShorts, getAspectClass } from '@/utils/youtube';
import { ArrowLeft, X, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'next/navigation';

function GalleryContent() {
  const { projects } = usePortfolio();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'all' | 'photo' | 'video'>('all');
  const [openDropdown, setOpenDropdown] = useState<'mercure' | 'cuecorner' | null>(null);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);

  const activeFilter = selectedFilter ?? filterParam ?? 'all';

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const filteredProjects = projects.filter((item) => {
    // 1. Company Filter
    let matchCompany = true;
    if (activeFilter === 'mercure') {
      const clientLower = (item.client || '').toLowerCase();
      const titleLower = (item.title || '').toLowerCase();
      const idLower = (item.id || '').toLowerCase();
      matchCompany = (
        clientLower.includes('mercure') ||
        clientLower.includes('kunoichi') ||
        titleLower.includes('ramen') ||
        titleLower.includes('shabu') ||
        idLower.includes('ramen') ||
        idLower.includes('shabu')
      );
    } else if (activeFilter === 'cuecorner') {
      const clientLower = (item.client || '').toLowerCase();
      const titleLower = (item.title || '').toLowerCase();
      const idLower = (item.id || '').toLowerCase();
      matchCompany = (
        clientLower.includes('cue corner') ||
        clientLower.includes('billiard') ||
        titleLower.includes('billiard') ||
        idLower.includes('cue-corner')
      );
    }

    if (!matchCompany) return false;

    // 2. Format Filter (Foto vs Video)
    const isVideo = item.category === 'video' || item.image.endsWith('.mp4');
    if (mediaType === 'photo' && isVideo) return false;
    if (mediaType === 'video' && !isVideo) return false;

    return true;
  });

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-8 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/"
              className="text-xs font-mono text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              ARSIP KARYA KREATIF
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-serif">
            GALERI VISUAL
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light">
          Galeri visual bersih dan lengkap berisi poster, foto, dan produksi video.
        </p>
      </div>

      {/* Filter Bar with Dropdown Buttons */}
      <div className="flex flex-wrap items-center gap-3 relative z-30 pb-3">
        {/* ALL WORKS */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFilter('all');
            setMediaType('all');
            setOpenDropdown(null);
          }}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
            activeFilter === 'all'
              ? 'bg-white text-black shadow-lg shadow-white/20 font-extrabold'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
          }`}
        >
          Semua Karya
        </button>

        {/* MERCURE KARAWANG DROPDOWN BUTTON */}
        <div className="relative shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFilter('mercure');
              setOpenDropdown((prev) => (prev === 'mercure' ? null : 'mercure'));
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'mercure'
                ? 'bg-white text-black shadow-lg shadow-white/20 font-extrabold'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
            }`}
          >
            <span>
              {activeFilter === 'mercure' && mediaType !== 'all'
                ? `MERCURE (${mediaType === 'photo' ? 'FOTO' : 'VIDEO'})`
                : 'MERCURE KARAWANG'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'mercure' ? 'rotate-180' : ''}`} />
          </button>

          {/* Mercure Floating Dropdown Menu */}
          <AnimatePresence>
            {openDropdown === 'mercure' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-2 w-48 bg-zinc-950 border border-zinc-800 rounded-2xl p-1.5 shadow-2xl z-50 space-y-1 font-mono text-xs"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter('mercure');
                    setMediaType('all');
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors font-bold uppercase ${
                    activeFilter === 'mercure' && mediaType === 'all'
                      ? 'bg-white text-black font-extrabold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Semua Media
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter('mercure');
                    setMediaType('photo');
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors font-bold uppercase ${
                    activeFilter === 'mercure' && mediaType === 'photo'
                      ? 'bg-white text-black font-extrabold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Foto
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter('mercure');
                    setMediaType('video');
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors font-bold uppercase ${
                    activeFilter === 'mercure' && mediaType === 'video'
                      ? 'bg-white text-black font-extrabold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Video
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CUE CORNER BILLIARD DROPDOWN BUTTON */}
        <div className="relative shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFilter('cuecorner');
              setOpenDropdown((prev) => (prev === 'cuecorner' ? null : 'cuecorner'));
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'cuecorner'
                ? 'bg-white text-black shadow-lg shadow-white/20 font-extrabold'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
            }`}
          >
            <span>
              {activeFilter === 'cuecorner' && mediaType !== 'all'
                ? `CUE CORNER (${mediaType === 'photo' ? 'FOTO' : 'VIDEO'})`
                : 'CUE CORNER BILLIARD'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'cuecorner' ? 'rotate-180' : ''}`} />
          </button>

          {/* Cue Corner Floating Dropdown Menu */}
          <AnimatePresence>
            {openDropdown === 'cuecorner' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-2 w-48 bg-zinc-950 border border-zinc-800 rounded-2xl p-1.5 shadow-2xl z-50 space-y-1 font-mono text-xs"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter('cuecorner');
                    setMediaType('all');
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors font-bold uppercase ${
                    activeFilter === 'cuecorner' && mediaType === 'all'
                      ? 'bg-white text-black font-extrabold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Semua Media
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter('cuecorner');
                    setMediaType('photo');
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors font-bold uppercase ${
                    activeFilter === 'cuecorner' && mediaType === 'photo'
                      ? 'bg-white text-black font-extrabold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Foto
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter('cuecorner');
                    setMediaType('video');
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors font-bold uppercase ${
                    activeFilter === 'cuecorner' && mediaType === 'video'
                      ? 'bg-white text-black font-extrabold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Video
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Clean Pure Masonry Grid (No Text Overlays on Images) */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <AnimatePresence>
          {filteredProjects.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedItem(item)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-white cursor-pointer transition-all duration-300 min-h-[200px] flex items-center justify-center p-1"
            >
              {/* Pure Clean Media Element */}
              {getYouTubeId(item.image) ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(item.image)}?rel=0`}
                  className={`w-full ${getAspectClass(item.image, item.aspectRatio)} rounded-xl border-0 pointer-events-none`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : item.image.endsWith('.mp4') ? (
                <video src={item.image} className="w-full h-auto object-cover rounded-xl" controls={false} />
              ) : (
                <Image
                  src={item.image}
                  alt={item.title || 'Gallery item'}
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                  unoptimized
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* PURE FULLSIZE LIGHTBOX MODAL — NO TEXT AT ALL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6 overflow-hidden"
          >
            {/* Minimal Floating Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900/90 text-zinc-300 hover:text-white border border-zinc-700 hover:border-white transition-all z-50 shadow-2xl group"
              title="Close Fullscreen View"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Pure Fullsize Media Element Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[95vw] max-h-[92vh] w-full flex items-center justify-center select-none"
            >
              {getYouTubeId(selectedItem.image) ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(selectedItem.image)}?autoplay=1`}
                  className={`${
                    (selectedItem.aspectRatio === 'portrait' || isYouTubeShorts(selectedItem.image))
                      ? 'w-[360px] sm:w-[420px] aspect-[9/16] max-h-[85vh]'
                      : 'w-full max-w-4xl aspect-video'
                  } rounded-2xl shadow-2xl border border-zinc-800`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : selectedItem.image.endsWith('.mp4') ? (
                <video
                  src={selectedItem.image}
                  className="max-w-[95vw] max-h-[92vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-zinc-800"
                  controls
                  autoPlay
                />
              ) : (
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title || 'Gallery Fullsize'}
                  width={900}
                  height={1200}
                  className="max-w-[95vw] max-h-[92vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-zinc-800"
                  unoptimized
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Navbar />
      <Suspense fallback={<div className="pt-40 text-center font-mono text-xs text-zinc-500">Loading gallery...</div>}>
        <GalleryContent />
      </Suspense>
    </div>
  );
}
