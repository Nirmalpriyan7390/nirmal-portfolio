import React from 'react';
import { Smartphone, Layout, ShieldAlert, Cpu, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import TiltCard from './TiltCard';

export default function ExpertiseSection() {
  const capabilities = [
    {
      num: '01',
      icon: Smartphone,
      title: 'End-to-End 0→1 Product Design',
      desc: 'Taking ideas from user research and wireframing all the way to production app store listings. Shipped 7 live products in the last year at J7 Technology Solutions.',
    },
    {
      num: '02',
      icon: Layout,
      title: 'Dashboard & Enterprise SaaS',
      desc: 'Specializing in complex B2B platforms like IppoBill (GST billing), Setter (US hospital appointment scheduling), and CareZhen (hospital management).',
    },
    {
      num: '03',
      icon: ShieldAlert,
      title: 'Fintech UX & Trust Architecture',
      desc: 'Designing interfaces where visual confusion costs capital. Card layouts engineered for 2-second decision speed, with clear risk/reward hierarchies.',
    },
    {
      num: '04',
      icon: Cpu,
      title: 'Design Systems Architecture',
      desc: 'Building reusable, component-based design systems that scale effortlessly. The Index Waves design system was adopted for two sibling products without redesign.',
    },
    {
      num: '05',
      icon: Sparkles,
      title: 'Point-of-Sale & Speed Optimization',
      desc: 'Designing for busy counter environments where every extra second creates queue anxiety. 4-tap checkout flows with automated GST compliance.',
    },
    {
      num: '06',
      icon: Terminal,
      title: 'Frontend Logic & Code Literacy',
      desc: 'Built this portfolio from scratch in HTML, CSS, and JavaScript. Understanding how products are coded makes every Figma component technically sound and developer-friendly.',
    },
  ];

  return (
    <section id="expertise" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>CORE EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How I <span className="font-serif italic font-normal text-brand-300">Add Value</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Delivering thoughtful UX solutions that simplify complexity, enhance usability, and support real business goals.
          </p>
        </div>

        {/* 6 Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <TiltCard key={item.num} maxTilt={6} className="h-full">
                <div className="p-7 rounded-3xl bg-[#0e1118]/80 hover:bg-[#121620] border border-white/[0.08] hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between h-full shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-brand-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-slate-500 font-bold">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                    <span>Production Experience</span>
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
