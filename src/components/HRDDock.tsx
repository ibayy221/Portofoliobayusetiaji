'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { MessageCircle, Mail, FolderKanban, Check, Copy } from 'lucide-react';

export default function HRDDock() {
  const [visible, setVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling down 200px
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-full bg-black/95 border border-zinc-700/80 backdrop-blur-xl shadow-2xl shadow-black text-xs">
            


            {/* WhatsApp Direct CTA (Monochrome High-Contrast White) */}
            <a
              href={PERSONAL_INFO.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-extrabold transition-all shadow-md uppercase tracking-wider"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black text-black" />
              <span>WhatsApp</span>
            </a>

            {/* Copy Email CTA */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-white text-white font-semibold transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-300" />
              <span className="hidden sm:inline">{copiedEmail ? 'Email Tersalin' : 'Salin Email'}</span>
              {copiedEmail ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-zinc-500" />}
            </button>

            {/* Selected Works CTA */}
            <a
              href="#work"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-white text-white font-semibold transition-all"
            >
              <FolderKanban className="w-3.5 h-3.5 text-zinc-300" />
              <span>Karya</span>
            </a>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
