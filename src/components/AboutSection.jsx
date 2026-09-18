import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, ShieldCheck, Sparkles, Terminal, Compass, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import LinkedinIcon from './icons/LinkedinIcon';
import NLogo from './icons/NLogo';
import { portfolioData } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function AboutSection() {
  const [copied, setCopied] = useState(false);
  const about = portfolioData.about;

  const handleCopy = (e) => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(portfolioData.meta.email);
    setCopied(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x, y },
      colors: ['#8b5cf6', '#10b981', '#38bdf8'],
      disableForReducedMotion: true,
    });

    setTimeout(() => setCopied(false), 2400);
  };

  const paragraphs = about.intro ? about.intro.split('\n\n') : [];

  return (
    <section id="about" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Philosophies */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <NLogo size={42} variant="badge" glow={true} />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                <span>ABOUT NIRMAL</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {about.headline}
            </h2>

            {/* 3 Core Design Philosophies */}
            <div className="space-y-3 pt-3">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold block">
                Three Design Philosophies
              </span>
              {about.philosophies?.map((phi, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0c1017] border border-slate-800/80 hover:border-brand-500/40 transition-all space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    <span>0{idx + 1} · {phi.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {phi.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Verbatim Story & Currently Exploring */}
          <div className="lg:col-span-7 space-y-8">
            {/* Story Paragraphs */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0c1017] border border-slate-800/80 space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed shadow-xl">
              {paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? "text-white font-medium text-lg sm:text-xl" : ""}>
                  {p}
                </p>
              ))}

              {/* Background badge */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  {portfolioData.meta.background}
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  {portfolioData.meta.experience}
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  {portfolioData.meta.location}
                </span>
              </div>
            </div>

            {/* Currently Exploring Tags */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-300 font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span>Currently Exploring</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {about.currentlyExploring?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-[#0c1017] border border-slate-800 text-xs font-mono text-slate-200 hover:border-brand-500/50 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#contact"
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-brand-400 hover:text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Let's talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{portfolioData.meta.email}</span>
                  </>
                )}
              </button>

              <a
                href={portfolioData.meta.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-transparent hover:bg-white/5 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition-all"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
