import React from 'react';
import { Terminal, Code, Cpu, Sparkles, ArrowRight, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';

export default function DesignAndTech() {
  const data = portfolioData.designAndTech;
  if (!data) return null;

  const flow = data.bridgeFlow || ["DESIGN", "UX", "UI", "PROTOTYPE", "AI", "DEVELOPMENT"];

  const advantages = [
    {
      title: "Technical Architecture Empathy",
      desc: "With a B.Sc. in Information Technology, I design with a clear understanding of database schemas, API latencies, authentication flows, and component hierarchies. My designs don't break during implementation.",
      tag: "B.Sc. Information Technology"
    },
    {
      title: "AI-Assisted Code Scaffolding",
      desc: "Using modern AI tools like Antigravity, Claude, and Lovable, I build interactive prototypes and functional code scaffolding that let teams test realistic edge cases before committing engineering hours.",
      tag: "Rapid Validation"
    },
    {
      title: "Seamless Engineering Handoff",
      desc: "I speak the language of developers. From design tokens to CSS flexbox layouts and responsive breakpoint logic, handoffs are clean, exact, and free of ambiguity.",
      tag: "Zero Redundancy"
    }
  ];

  return (
    <section id="design-and-tech" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>BRIDGING DESIGN &amp; CODE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {data.headline}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Bridge Flow Stepper */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#0c1017] border border-slate-800/90 shadow-xl">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-6 font-bold flex items-center justify-between">
            <span>The End-to-End Product Continuum</span>
            <span className="text-cyan-400 font-semibold">Bridged by AI &amp; IT Foundation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {flow.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col items-center justify-center text-center group hover:border-cyan-500/50 transition-all"
              >
                <span className="text-[10px] font-mono text-slate-500 mb-1">0{idx + 1}</span>
                <span className="text-xs font-mono font-bold text-white tracking-wider group-hover:text-cyan-300 transition-colors">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((item, idx) => (
            <TiltCard key={idx} maxTilt={6} className="h-full">
              <div className="p-7 rounded-3xl bg-[#0c1017] hover:bg-[#10141f] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between h-full shadow-lg group">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-[11px] font-mono text-cyan-400 font-medium mb-4">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Production-Ready Mindset</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
