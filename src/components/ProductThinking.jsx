import React from 'react';
import { HelpCircle, Sparkles, CheckCircle, ArrowRight, Lightbulb, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function ProductThinking() {
  const data = portfolioData.productThinking;
  if (!data) return null;

  return (
    <section id="product-thinking" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300">
            <Compass className="w-3.5 h-3.5 text-brand-400" />
            <span>PRODUCT MINDSET</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {data.headline}
          </h2>
          <p className="text-xl sm:text-2xl text-slate-200 font-serif italic">
            "{data.subheadline}"
          </p>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* 6 Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.questions.map((item, idx) => (
            <TiltCard key={idx} maxTilt={6} className="h-full">
              <div className="p-7 rounded-3xl bg-[#0c1017] hover:bg-[#101522] border border-slate-800/80 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between h-full shadow-lg group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-brand-400 font-bold bg-brand-950/60 px-2.5 py-1 rounded border border-brand-900/40">
                      Question 0{idx + 1}
                    </span>
                    <HelpCircle className="w-4 h-4 text-slate-600 group-hover:text-brand-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-brand-300 transition-colors leading-snug">
                    {item.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800/60 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Clarified before design</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-950/30 via-slate-900 to-slate-900 border border-brand-800/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse shrink-0" />
            <span className="text-sm sm:text-base font-mono font-bold text-white">
              {data.closingStatement}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Frictionless UX · High Product Value
          </span>
        </div>
      </div>
    </section>
  );
}
