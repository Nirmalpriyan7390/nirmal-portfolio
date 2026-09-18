import React from 'react';
import { motion } from 'framer-motion';

export default function ToolsMarquee() {
  const items = [
    'Figma',
    'React',
    'Tailwind CSS',
    'Android',
    'Design Systems',
    'Fintech UX',
    'Healthcare SaaS',
    'Point-of-Sale (POS)',
    'User Research',
    'Local-First Architecture',
    'Information Architecture',
    'Mobile UX',
    'GST Invoicing',
    'Wireframing & Prototyping',
  ];

  return (
    <div className="w-full py-8 border-y border-white/[0.06] bg-[#0a0c12]/40 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#08090d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#08090d] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 28,
        }}
        className="flex items-center gap-8 whitespace-nowrap"
      >
        {[...items, ...items, ...items].map((tool, idx) => (
          <div
            key={idx}
            className="flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-slate-400/80 hover:text-white transition-colors"
          >
            <span className="text-brand-400 font-sans text-sm">✦</span>
            <span>{tool}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
