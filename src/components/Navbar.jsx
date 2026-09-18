import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowUpRight, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LinkedinIcon from './icons/LinkedinIcon';
import BehanceIcon from './icons/BehanceIcon';
import NLogo from './icons/NLogo';
import { portfolioData } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { label: 'What I Do', href: '#what-i-do', desc: '4 Pillars of Product Design' },
    { label: 'Selected Work', href: '#work', desc: '6 Shipped in Production' },
    { label: 'How I Design with AI', href: '#ai-workflow', desc: '8-Stage Design Pipeline' },
    { label: 'Mindset', href: '#product-thinking', desc: 'Product Thinking ("More Than UI")' },
    { label: 'Experience', href: '#experience', desc: 'Work History & Timeline' },
    { label: 'About', href: '#about', desc: 'About Nirmal & Philosophy' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Capsule Bar */}
        <div className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-[#0c0e15]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 transition-all duration-300">
          {/* Brand */}
          <a
            href="#"
            onClick={() => soundFx.playClick()}
            className="flex items-center gap-2.5 group"
          >
            <NLogo size={32} variant="badge" glow={true} />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-brand-300 transition-colors">
                Nirmal Priyadarshan
              </span>
              <span className="text-[10px] text-brand-400 font-mono hidden sm:inline leading-none">
                Product Designer
              </span>
            </div>
          </a>

          {/* Header Navigation Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => {
                soundFx.playClick();
                setDropdownOpen(!dropdownOpen);
              }}
              aria-expanded={dropdownOpen}
              aria-label="Navigation Menu"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-slate-200 hover:text-white border border-white/10 hover:border-brand-500/40 text-xs font-semibold tracking-tight transition-all duration-200 shadow-sm hover:scale-105"
            >
              <span>Explore</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180 text-brand-400' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 p-2 rounded-2xl bg-[#0c0e15]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 z-50"
                >
                  <div className="py-1 space-y-0.5">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          soundFx.playClick();
                          setDropdownOpen(false);
                        }}
                        className="group flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                            {item.label}
                          </span>
                          <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-mono transition-colors">
                            {item.desc}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 transition-colors" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-2">
            <a
              href={portfolioData.meta.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors hidden sm:flex"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={portfolioData.meta.behanceUrl || "https://www.behance.net/nirmalpriyada"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              aria-label="View Behance Profile"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#121622] hover:bg-[#1a2030] text-slate-200 hover:text-white border border-white/10 hover:border-brand-500/40 text-xs font-semibold tracking-tight transition-all duration-200 shadow-sm hover:scale-105"
            >
              <BehanceIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>View Behance</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="#contact"
              onClick={() => soundFx.playClick()}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-slate-950 hover:bg-brand-400 hover:text-white text-xs font-bold tracking-tight transition-all duration-200 shadow-md hover:shadow-brand-500/30 hover:scale-105"
            >
              <span>Let's talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="max-w-5xl mx-auto mt-2 pointer-events-auto md:hidden">
          <div className="rounded-3xl bg-[#0c0e15]/95 backdrop-blur-xl border border-white/10 p-5 space-y-3 shadow-2xl text-xs font-medium">
            <a
              href="#what-i-do"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-slate-200 hover:bg-white/5"
            >
              What I Do (4 Pillars)
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-slate-200 hover:bg-white/5"
            >
              Selected Work (6 Shipped Live)
            </a>
            <a
              href="#ai-workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-slate-200 hover:bg-white/5"
            >
              How I Design with AI (8-Stage Pipeline)
            </a>
            <a
              href="#product-thinking"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-slate-200 hover:bg-white/5"
            >
              Product Thinking ("More Than UI")
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-slate-200 hover:bg-white/5"
            >
              Experience
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-slate-200 hover:bg-white/5"
            >
              About Nirmal
            </a>
            <a
              href={portfolioData.meta.behanceUrl || "https://www.behance.net/nirmalpriyada"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-blue-400 hover:bg-blue-500/10 font-semibold"
            >
              <span className="flex items-center gap-2">
                <BehanceIcon className="w-3.5 h-3.5" />
                View Behance
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-white font-bold bg-white/10"
            >
              Contact →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
