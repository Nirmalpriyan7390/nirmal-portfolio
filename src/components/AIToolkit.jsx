import React from 'react';
import { Cpu, Sparkles, Wrench, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function AIToolkit() {
  const toolkit = portfolioData.aiToolkit;
  if (!toolkit) return null;

  return (
    <section id="toolkit" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300 mb-3">
              <Cpu className="w-3.5 h-3.5 text-brand-400" />
              <span>WORKFLOW STACK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {toolkit.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              {toolkit.subtitle}
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 max-w-xs text-right hidden sm:block">
            Tools change. Product judgment remains.
          </div>
        </div>

        {/* 5 Workflow Tool Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolkit.categories.map((cat, idx) => (
            <TiltCard key={idx} maxTilt={6} className="h-full">
              <div className="p-7 rounded-3xl bg-[#0c1017] hover:bg-[#101522] border border-slate-800/80 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between h-full shadow-lg group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-brand-400 font-bold tracking-wider">
                      0{idx + 1} · {cat.name}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 transition-colors" />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Tool Badges */}
                <div className="pt-4 border-t border-slate-800/60">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Primary Tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 group-hover:border-slate-700 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}

          {/* Philosophy Card filling the 6th slot */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-brand-950/30 to-slate-900/60 border border-brand-800/40 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-300 font-bold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                The Guiding Principle
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                "The tools are secondary. The products are primary."
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether using ChatGPT, Claude, Figma, or Cursor, my goal is never to showcase tool proficiency — it is to validate user problems and ship reliable digital experiences.
              </p>
            </div>
            <div className="pt-4 border-t border-brand-800/40 text-[11px] font-mono text-brand-300">
              Pragmatic · Human-Centered · Shipped
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
