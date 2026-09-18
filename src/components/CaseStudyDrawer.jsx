import React, { useEffect, useState, useRef } from 'react';
import { X, ArrowUpRight, CheckCircle2, AlertCircle, Sparkles, User, ShieldCheck, ChevronRight, Layers, Lightbulb, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CaseStudyDrawer({ study, onClose }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      setScrollProgress((scrollTop / total) * 100);
    }
  };

  if (!study) return null;

  const { sections, meta } = study;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop with fade animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel with Spring Animation */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
        className="relative w-full max-w-3xl bg-[#0a0d14] text-slate-100 h-full overflow-hidden border-l border-slate-800 shadow-2xl flex flex-col z-10"
      >
        {/* Dynamic Reading Progress Bar */}
        <div className="h-1 w-full bg-slate-900 sticky top-0 z-30">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-150 ease-out shadow-[0_0_8px_rgb(var(--brand-500))]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#0c1017]/95 backdrop-blur-md px-6 py-4 border-b border-slate-800/90 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-brand-950/80 text-brand-300 border border-brand-800/50">
                {study.tag}
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                {meta.platform}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              {study.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body with Scroll Tracking */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12"
        >
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-mono block text-[10px]">Role</span>
              <span className="font-medium text-slate-200">{meta.role}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-mono block text-[10px]">Platform</span>
              <span className="font-medium text-slate-200">{meta.platform}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-mono block text-[10px]">Company</span>
              <span className="font-medium text-slate-200">{meta.company}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-mono block text-[10px]">Status</span>
              <span className="font-medium text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {meta.status}
              </span>
            </div>
          </div>

          {/* Subtitle & Curiosity Hook */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-200">
              {study.subtitle}
            </h3>
            <div className="p-4 rounded-xl bg-brand-950/25 border border-brand-800/40 text-sm sm:text-base text-brand-200 leading-relaxed italic border-l-4 border-l-brand-500">
              "{study.oneLiner}"
            </div>
          </div>

          {/* 01 The Problem */}
          {sections.problem && (
            <section className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold">
                {sections.problem.title}
              </h4>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {sections.problem.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {sections.problem.brief && (
                <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs font-mono font-bold text-brand-400 block mb-1">THE BRIEF</span>
                  <p className="text-sm font-medium text-white">{sections.problem.brief}</p>
                </div>
              )}
            </section>
          )}

          {/* 02 The Users / Core Constraint / Real Problem / Philosophy */}
          {sections.users && (
            <section className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold">
                {sections.users.title}
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {sections.users.personas.map((persona, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <User className="w-4 h-4 text-brand-400" />
                      {persona.role}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {persona.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {sections.constraint && (
            <section className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                {sections.constraint.title}
              </h4>
              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {sections.constraint.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {sections.realProblem && (
            <section className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                {sections.realProblem.title}
              </h4>
              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {sections.realProblem.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {sections.philosophy && (
            <section className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                {sections.philosophy.title}
              </h4>
              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {sections.philosophy.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {/* 03 The Design Challenge (if exists) */}
          {sections.challenge && (
            <section className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold">
                {sections.challenge.title}
              </h4>
              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {sections.challenge.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {/* 04 Key Decisions */}
          {sections.decisions && (
            <section className="space-y-5">
              <h4 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-brand-400" />
                {sections.decisions.title}
              </h4>
              <div className="space-y-4">
                {sections.decisions.items.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                      {item.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 05 The Full App (for Index Waves) */}
          {sections.fullApp && (
            <section className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-400" />
                {sections.fullApp.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                {sections.fullApp.intro}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {sections.fullApp.surfaces.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-sm text-white">{s.name}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 06 Outcome */}
          {sections.outcome && (
            <section className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-800/40">
              <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                {sections.outcome.title}
              </h4>
              <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                {sections.outcome.content.map((p, idx) => (
                  <p key={idx} className="font-medium">{p}</p>
                ))}
              </div>
            </section>
          )}

          {/* 07 What I'd Fix */}
          {sections.whatToFix && (
            <section className="space-y-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                {sections.whatToFix.title}
              </h4>
              {sections.whatToFix.intro && (
                <p className="text-xs sm:text-sm text-slate-400">
                  {sections.whatToFix.intro}
                </p>
              )}
              <div className="space-y-3">
                {sections.whatToFix.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {item.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
              {sections.whatToFix.closingNote && (
                <div className="pt-3 border-t border-slate-800 text-xs sm:text-sm text-slate-300 italic">
                  "{sections.whatToFix.closingNote}"
                </div>
              )}
            </section>
          )}

          {/* Bottom Close Button */}
          <div className="pt-6 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
            >
              Close case study
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
