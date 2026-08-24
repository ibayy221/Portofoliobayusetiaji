'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tentang', href: '/#about', targetId: 'about' },
    { name: 'Pengalaman', href: '/#journey', targetId: 'journey' },
    { name: 'Karya', href: '/#work', targetId: 'work' },
    { name: 'Kontak', href: '/#contact', targetId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800/80 py-3' : 'bg-transparent'
        }`}
      >
        {/* Brand Name (Clean Editorial) */}
        <Link
          href="/#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center font-semibold text-xs text-white">
            BS
          </div>
          <span className="text-sm font-semibold tracking-wider text-white group-hover:text-zinc-400 transition-colors uppercase">
            {PERSONAL_INFO.name}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.targetId)}
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors tracking-widest uppercase relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <a
            href={PERSONAL_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full border border-zinc-700 hover:border-zinc-400 text-white transition-all duration-200"
          >
            <span>Hubungi Saya</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.targetId)}
              className="text-sm font-medium text-zinc-300 hover:text-white py-1 uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={PERSONAL_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full bg-white text-black mt-2"
          >
            <span>Chat via WhatsApp</span>
          </a>
        </motion.div>
      )}
    </header>
  );
}
