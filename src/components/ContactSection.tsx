'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  MessageCircle,
  Mail,
  MapPin,
  ArrowUp,
  Check,
  Copy
} from 'lucide-react';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-24 relative bg-black border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Editorial CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="clean-panel p-8 sm:p-12 rounded-2xl text-center relative mb-16"
        >
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4">
            HUBUNGI SAYA
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-4 font-serif">
            MARI BEKERJA <span className="text-stroke-outline">SAMA</span>
          </h2>

          <p className="max-w-xl mx-auto text-zinc-400 text-xs sm:text-sm font-normal mb-8 leading-relaxed">
            Membutuhkan desain grafis berdampak tinggi, produksi konten video, identitas brand, atau antarmuka web? hubungi saya yaa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={PERSONAL_INFO.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black" />
              <span>Mulai Chat WhatsApp</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white font-medium text-xs hover:border-zinc-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>{copiedEmail ? 'Email Tersalin!' : 'Salin Alamat Email'}</span>
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
            </button>
          </div>
        </motion.div>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          
          <div className="clean-panel p-4 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">WHATSAPP</span>
            <a
              href={PERSONAL_INFO.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white hover:text-zinc-300 transition-colors block"
            >
              {PERSONAL_INFO.contact.whatsapp}
            </a>
          </div>

          <div className="clean-panel p-4 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">LINKEDIN</span>
            <a
              href={PERSONAL_INFO.contact.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white hover:text-zinc-300 transition-colors block"
            >
              {PERSONAL_INFO.contact.linkedin}
            </a>
          </div>

          <div className="clean-panel p-4 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">EMAIL</span>
            <span className="text-xs font-bold text-white block truncate">
              {PERSONAL_INFO.contact.email}
            </span>
          </div>

          <div className="clean-panel p-4 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">LOKASI</span>
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-400" />
              {PERSONAL_INFO.location}
            </span>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-900 text-[11px] text-zinc-500 font-mono">
          <span>© 2026 {PERSONAL_INFO.name}. Seluruh Hak Cipta Dilindungi.</span>

          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.contact.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {PERSONAL_INFO.contact.website}
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
