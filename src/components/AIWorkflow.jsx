import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck, Cpu, CheckCircle, Lightbulb, Compass, Code, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/soundEffects';

export default function AIWorkflow({ comparison, summary, title, subtitle }) {
  const defaultStages = [
    {
      id: 'problem',
      step: '01',
      name: 'Problem',
      tagline: 'Understanding real human & business friction',
      aiRole: 'Synthesizing market context, competitor teardowns, and user inquiry checklists.',
      designerRole: 'Field observation, stakeholder interviews, framing core constraints, and defining success metrics.'
    },
    {
      id: 'prompt',
      step: '02',
      name: 'Prompt & Explore',
      tagline: 'Divergent idea generation without boundaries',
      aiRole: 'Generating 20+ divergent workflow paths, simulated edge cases, and unexpected interaction models.',
      designerRole: 'Curating prompts, grounding exploration in physical realities, and rejecting superficial ideas.'
    },
    {
      id: 'concepts',
      step: '03',
      name: 'Concepts',
      tagline: 'Structural product architectures',
      aiRole: 'Drafting alternative user journey structures, logic branches, and edge-case fallbacks.',
      designerRole: 'Filtering architectural noise, prioritizing user flow simplicity, and selecting viable directions.'
    },
    {
      id: 'evaluation',
      step: '04',
      name: 'Evaluation',
      tagline: 'Critical product thinking & trade-off decisions',
      aiRole: 'Simulating user hesitation points and calculating time-to-decision metrics across paths.',
      designerRole: 'Human judgment: evaluating emotional trust, cognitive load, business viability, and ethics.'
    },
    {
      id: 'ux',
      step: '05',
      name: 'UX Refinement',
      tagline: 'Ergonomics, navigation, and information architecture',
      aiRole: 'Generating responsive grid permutations and contextual microcopy variations.',
      designerRole: 'Crafting the definitive user journey, minimizing steps to action, and tuning thumb zones.'
    },
    {
      id: 'ui',
      step: '06',
      name: 'UI Design',
      tagline: 'Design systems, visual hierarchy & craft',
      aiRole: 'Scaffolding design tokens, color contrast checks, and component variant structures.',
      designerRole: 'Editorial typography, visual restraint, brand soul, micro-interactions, and visual harmony.'
    },
    {
      id: 'prototype',
      step: '07',
      name: 'Prototype',
      tagline: 'Interactive tactile validation',
      aiRole: 'Writing interactive state machines, mock database fixtures, and component logic sandboxes.',
      designerRole: 'Testing real interaction rhythms, observing user confusion, and refining transition pacing.'
    },
    {
      id: 'product',
      step: '08',
      name: 'Working Product',
      tagline: 'AI-assisted code handoff & production delivery',
      aiRole: 'Translating design tokens into production-ready React views and responsive styles.',
      designerRole: 'Design QA, pixel verification, cross-device polish, and continuous post-launch iteration.'
    }
  ];

  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = defaultStages[activeStageIndex];

  return (
    <section id="ai-workflow" className="py-24 border-t border-white/[0.06] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>AI-POWERED PRODUCT DESIGN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {title || (
                <>
                  How I Design with <span className="font-serif italic font-normal text-brand-300">AI</span>
                </>
              )}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              {subtitle || summary || "AI is my research, exploration, and prototyping engine. Product thinking and human judgment are the steering wheel."}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive 8-Stage Pipeline</span>
          </div>
        </div>

        {/* 8-Stage Pipeline Horizontal Stepper */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center gap-2 min-w-[760px]">
            {defaultStages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveStageIndex(idx);
                  }}
                  className={`flex-1 min-w-[88px] p-3 rounded-xl border text-left transition-all relative ${
                    isActive
                      ? 'bg-slate-900 border-brand-500/80 shadow-lg shadow-brand-950/50'
                      : 'bg-[#0b0e14]/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-brand-300' : 'text-slate-500'}`}>
                      {stage.step}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                    )}
                  </div>
                  <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {stage.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Active Stage Deep Dive */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#0c1017] border border-slate-800/90 shadow-2xl mb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
              <div>
                <span className="text-xs font-mono text-brand-400 font-bold uppercase tracking-wider">
                  Stage {activeStage.step} of 08
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
                  {activeStage.name}
                </h3>
              </div>
              <p className="text-sm font-medium text-slate-300 max-w-md italic">
                "{activeStage.tagline}"
              </p>
            </div>

            {/* Side-by-side Role Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* AI Role */}
              <div className="p-5 rounded-2xl bg-[#07090d] border border-slate-800/70 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>AI ASSISTED · SPEED &amp; EXPLORATION</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeStage.aiRole}
                </p>
              </div>

              {/* Designer Role */}
              <div className="p-5 rounded-2xl bg-[#07090d] border border-brand-500/30 space-y-3 shadow-inner">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-300 font-bold">
                  <UserCheck className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>DESIGNER DECISION · JUDGMENT &amp; HUMAN NEED</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {activeStage.designerRole}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project-Specific Comparison Table (when passed) or Core Principle Comparison */}
        {comparison && comparison.length > 0 ? (
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold">
              Project-Specific AI Workflow Breakdown
            </h4>
            <div className="space-y-3">
              {comparison.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0c1017] border border-slate-800/90 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
                >
                  <div className="md:col-span-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                      Phase
                    </span>
                    <span className="text-sm font-bold text-white">
                      {item.phase}
                    </span>
                  </div>
                  <div className="md:col-span-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                      AI Accelerated
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.aiRole}
                    </p>
                  </div>
                  <div className="md:col-span-5 p-3.5 rounded-xl bg-brand-950/25 border border-brand-800/40 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-brand-300 font-bold block">
                      Designer Judgment
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {item.designerRole}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* The Core Principle Card */
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0d121c] via-[#090d14] to-[#0d121c] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-300 font-bold flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-brand-400" />
                The Core Principle
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                "I design products with AI, not just screens with AI."
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                AI accelerates rapid discovery, stress-tests edge cases, and bridges design to working code. But understanding user psychology, business constraints, and making hard trade-offs is where product design happens.
              </p>
            </div>
            <a
              href="#work"
              onClick={() => soundFx.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-brand-400 hover:text-white text-xs font-bold tracking-tight transition-all shrink-0 shadow-lg"
            >
              <span>See Products in Action</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
