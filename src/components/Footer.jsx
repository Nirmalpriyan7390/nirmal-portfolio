import React from 'react';
import { ArrowUp, Mail, Sparkles } from 'lucide-react';
import LinkedinIcon from './icons/LinkedinIcon';
import BehanceIcon from './icons/BehanceIcon';
import NLogo from './icons/NLogo';
import { portfolioData } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function Footer() {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 border-t border-white/[0.06] bg-[#07090e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <NLogo size={36} variant="badge" glow={true} />
            <div>
              <div className="text-sm font-bold text-white">Nirmal Priyadarshan</div>
              <div className="text-xs text-slate-400">
                Product Designer · Tamil Nadu, India (Remote &amp; Global)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              6 Shipped in Production
            </span>
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.meta.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.meta.behanceUrl || "https://www.behance.net/nirmalpriyada"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Behance"
              >
                <BehanceIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.meta.email}`}
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Nirmal Priyadarshan. All rights reserved.</span>
          <span className="font-mono text-[11px] text-brand-400">
            "{portfolioData.meta.uvp}"
          </span>
        </div>
      </div>
    </footer>
  );
}
