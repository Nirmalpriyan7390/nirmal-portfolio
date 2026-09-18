import React, { useState } from 'react';
import { Sparkles, ArrowRight, Cpu, UserCheck, CheckCircle } from 'lucide-react';
import TiltCard from './TiltCard';
import { portfolioData } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function ProcessSection() {
  const steps = portfolioData.process || [];
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="process" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>THE PROCESS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              How I Design <span className="font-serif italic font-normal text-brand-300">with AI</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              A 6-step discipline pairing AI acceleration with deep product thinking and human empathy.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 italic max-w-xs text-right hidden sm:block">
            "{portfolioData.processStatement}"
          </div>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((item, idx) => (
            <TiltCard key={item.number} maxTilt={6} className="h-full">
              <div className="p-7 rounded-3xl bg-[#0c1017] hover:bg-[#101522] border border-slate-800/80 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between h-full shadow-lg group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-mono font-black text-slate-700 group-hover:text-brand-400 transition-colors">
                      {item.number}
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-brand-300 transition-colors">
                    {item.step}
                  </h3>
                  <div className="text-xs text-brand-400/90 font-mono mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 space-y-2">
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-cyan-400 font-mono block mb-0.5 text-[10px]">AI Accelerated:</strong>
                    {item.aiRole}
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed pt-1 border-t border-slate-800/40">
                    <strong className="text-brand-300 font-mono block mb-0.5 text-[10px]">Designer Judgment:</strong>
                    {item.designerRole}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Process Statement Callout */}
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold">
              The Guiding Philosophy
            </span>
            <p className="text-lg sm:text-xl font-bold text-white">
              "{portfolioData.processStatement}"
            </p>
          </div>
          <a
            href="#ai-workflow"
            onClick={() => soundFx.playClick()}
            className="px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-brand-400 hover:text-white text-xs font-bold transition-all shrink-0 shadow-md"
          >
            Explore 8-Stage Pipeline →
          </a>
        </div>
      </div>
    </section>
  );
}
