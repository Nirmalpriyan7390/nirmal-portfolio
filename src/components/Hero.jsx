import React from 'react';
import { ArrowDown, ArrowRight, ExternalLink, Sparkles, ShieldCheck, Zap, Layers, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import AnimatedCounter from './AnimatedCounter';
import { soundFx } from '../utils/soundEffects';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* UVP & Role Pill */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-[#0e1118] border border-white/10 text-xs text-slate-300 backdrop-blur-md shadow-inner hover:border-brand-500/40 transition-colors">
            <span className="font-mono text-brand-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              AI-Powered Product Designer
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              6 Shipped in Production
            </span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">B.Sc. IT Background</span>
          </div>
        </motion.div>

        {/* Headline: Editorial & Minimalist */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-6"
        >
          Designing digital products <br className="hidden sm:inline" />
          with{' '}
          <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-200 to-white">
            AI.
          </span>
        </motion.h1>

        {/* Subheadline Supporting Copy */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-slate-200 font-normal max-w-3xl leading-relaxed mb-6 tracking-tight"
        >
          {portfolioData.meta.subheadline}
        </motion.p>

        {/* Supporting Line / Tags */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-10">
          {portfolioData.meta.supportingLine.split('·').map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400"
            >
              {item.trim()}
            </span>
          ))}
        </motion.div>
        {/* Dynamic CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <motion.a
            href="#work"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-slate-950 hover:bg-brand-400 hover:text-white font-bold text-sm transition-all duration-200 shadow-xl shadow-white/5 hover:shadow-brand-500/40"
          >
            <span>View my work</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0e1118] hover:bg-[#141822] border border-white/10 hover:border-brand-500/40 text-slate-200 hover:text-white text-sm font-semibold transition-all shadow-md"
          >
            <span>Let's talk</span>
            <ArrowRight className="w-4 h-4 text-brand-400" />
          </motion.a>
        </motion.div>

        {/* Real Proof Metrics Bar with Animated Counters */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white flex items-center gap-2">
              <span>6</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Shipped in Production
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white">
              <span>2+</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Years in IT / Product Design
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white">
              <span>0→1</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Idea to Working Product
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white">
              <span>B.Sc.</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Information Technology
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
