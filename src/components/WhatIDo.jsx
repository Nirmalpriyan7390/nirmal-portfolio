import React from 'react';
import { Layers, Sparkles, Box, Cpu, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import { portfolioData } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function WhatIDo() {
  const pillars = portfolioData.whatIDo || [];
  const icons = [Box, Cpu, Zap, Layers];

  return (
    <section id="what-i-do" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              What I <span className="font-serif italic font-normal text-brand-300">Do</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              I combine product thinking, interface design, and modern AI acceleration to turn ambiguous ideas into functional digital products.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 max-w-xs text-right hidden sm:block">
            "Design the product, not just the interface."
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <TiltCard key={pillar.number} maxTilt={6} className="h-full">
                <div className="p-8 rounded-3xl bg-[#0c1017] hover:bg-[#10141f] border border-slate-800/80 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between h-full shadow-lg group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-brand-400 group-hover:border-brand-500/40 transition-colors shadow-inner">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-mono font-black text-slate-600 group-hover:text-brand-400 transition-colors">
                        {pillar.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-brand-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-medium text-brand-400/90 mb-4 font-mono">
                      {pillar.subtitle}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>Pillar {pillar.number}</span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Quote Callout */}
        {portfolioData.whatIDoQuote && (
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800/80 text-center space-y-2">
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-serif italic max-w-3xl mx-auto leading-relaxed">
              "{portfolioData.whatIDoQuote}"
            </p>
            <div className="text-xs font-mono uppercase tracking-widest text-brand-400 pt-2 font-bold">
              Product Thinking First · Interface Second
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
