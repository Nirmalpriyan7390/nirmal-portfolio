import React, { useState, useEffect } from 'react';
import { Mail, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import LinkedinIcon from './icons/LinkedinIcon';
import BehanceIcon from './icons/BehanceIcon';
import NLogo from './icons/NLogo';
import { portfolioData } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
                AI-Powered Product Designer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-300">
            <a href="#what-i-do" onClick={() => soundFx.playClick()} className="hover:text-white transition-colors">
              What I Do
            </a>
            <a href="#work" onClick={() => soundFx.playClick()} className="hover:text-white transition-colors">
              Selected Work
            </a>
            <a href="#ai-workflow" onClick={() => soundFx.playClick()} className="hover:text-white transition-colors">
              How I Design with AI
            </a>
            <a href="#product-thinking" onClick={() => soundFx.playClick()} className="hover:text-white transition-colors">
              Mindset
            </a>
            <a href="#experience" onClick={() => soundFx.playClick()} className="hover:text-white transition-colors">
              Experience
            </a>
            <a href="#about" onClick={() => soundFx.playClick()} className="hover:text-white transition-colors">
              About
            </a>
          </nav>

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
              className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="max-w-5xl mx-auto mt-2 pointer-events-auto lg:hidden">
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
