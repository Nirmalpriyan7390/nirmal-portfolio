import React from 'react';
import { ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

export default function ImpactPhilosophy() {
  const cards = [
    {
      icon: ShieldCheck,
      tag: 'FINTECH & TRUST',
      tagColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
      title: 'UX and trust are the same problem.',
      description:
        'In fintech, a confusing UI doesn’t just frustrate — it makes people doubt their money. When a buy signal lands at 9am, every visual decision either builds confidence or quietly destroys it.',
      accent: 'from-emerald-500/10 to-transparent',
    },
    {
      icon: Zap,
      tag: 'POS & POINT OF SALE',
      tagColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40',
      title: 'Speed at the counter is the product.',
      description:
        'A shop owner billing a customer while people wait cannot read error dialogs or fumble through dropdowns. Every interaction must be instant or invisible. Compliance without friction.',
      accent: 'from-cyan-500/10 to-transparent',
    },
    {
      icon: Layers,
      tag: 'SYSTEMS THINKING',
      tagColor: 'text-brand-400 bg-brand-950/40 border-brand-800/40',
      title: 'Design systems that clients reuse twice.',
      description:
        'The clearest signal a design system works: the client commissioned two sibling products (MCX Premier & Equity Emphas) within six months without asking to redesign.',
      accent: 'from-brand-500/10 to-transparent',
    },
  ];

  return (
    <section className="py-24 relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>DESIGN PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Designing for <span className="font-serif italic font-normal text-brand-300">Real-World Impact</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            I design for people who don’t read release notes, don’t attend design critiques, and don’t have time to figure out where a button moved.
          </p>
        </div>

        {/* 3 Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <TiltCard key={idx} maxTilt={6} className="h-full">
                <div className="p-8 rounded-3xl bg-[#0e1118]/80 hover:bg-[#121620] border border-white/[0.08] hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between h-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-white shadow-inner">
                        <Icon className="w-5 h-5 text-brand-400" />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${card.tagColor}`}>
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-3 leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>0{idx + 1} / Real Impact</span>
                    <span className="text-brand-400 font-bold">Production-Ready</span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
