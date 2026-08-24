'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/data/portfolioData';
import { usePortfolio } from '@/context/PortfolioContext';
import { getYouTubeId } from '@/utils/youtube';
import { Eye, X, ArrowRight } from 'lucide-react';

export default function ProjectShowcase() {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectedWorksProjects = projects.filter((p) => p.inSelectedWorks === true || (p.featured === true && p.inSelectedWorks !== false));

  return (
    <section id="work" className="py-20 relative bg-black border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-10 border-b border-zinc-800 pb-5">
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-serif">
            KARYA PILIHAN
          </h2>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          <AnimatePresence>
            {selectedWorksProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="group clean-panel rounded-3xl p-4 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-4 group-hover:border-white transition-colors aspect-[4/5]">
                    {getYouTubeId(project.image) ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(project.image)}?rel=0`}
                        className="w-full h-full rounded-xl border-0 pointer-events-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : project.image.endsWith('.mp4') ? (
                      <video src={project.image} className="w-full h-full object-cover rounded-xl" controls={false} />
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={500}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-300 filter contrast-[1.05]"
                        unoptimized
                      />
                    )}

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/90 text-[10px] font-mono text-white border border-zinc-800 uppercase backdrop-blur-md z-10 shadow-md font-bold">
                      {project.categoryLabel}
                    </span>

                    {/* Price Badge */}
                    {project.details?.price && (
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-xs font-bold border border-zinc-700 backdrop-blur-md z-10 font-mono shadow-md">
                        {project.details.price}
                      </span>
                    )}

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 backdrop-blur-[2px] rounded-2xl">
                      <span className="text-[10px] font-mono text-zinc-300 font-medium">
                        {project.client}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-black font-bold bg-white px-3 py-1 rounded-full shadow-lg">
                        <Eye className="w-3.5 h-3.5 text-black" /> Lihat
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="px-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-zinc-300 transition-colors mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="px-1 pt-2.5 border-t border-zinc-800 flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Large Prominent View All Button Below Grid */}
        <div className="pt-10 flex justify-center">
          <a
            href="/gallery"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-zinc-200 transition-all uppercase tracking-wider shadow-2xl shadow-white/15 flex items-center justify-center gap-2 group border border-white"
          >
            <span>Lihat Semua Karya &amp; Galeri Visual</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors z-20 border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-xs font-mono text-white border border-zinc-700 font-bold uppercase">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 font-serif">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Klien: {selectedProject.client || 'Karya Mandiri'}
                </p>
              </div>

              {/* Lightbox Full Poster Image Container */}
              <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden relative flex items-center justify-center p-2 min-h-[340px] aspect-video">
                {getYouTubeId(selectedProject.image) ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(selectedProject.image)}?autoplay=1`}
                    className="w-full h-full min-h-[340px] rounded-xl border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : selectedProject.image.endsWith('.mp4') ? (
                  <video src={selectedProject.image} className="w-full h-auto max-h-[70vh] object-contain rounded-xl" controls autoPlay />
                ) : (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={700}
                    height={900}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-xl filter contrast-[1.05]"
                    unoptimized
                  />
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-1 font-bold">Detail</h4>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    {selectedProject.description}
                  </p>
                  {selectedProject.details?.specs && (
                    <p className="text-xs text-zinc-300 font-mono mt-2 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                      <strong>Spesifikasi:</strong> {selectedProject.details.specs}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedProject.tags.map((tag) => (
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
