import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Lightbulb, AlertTriangle, Cpu, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import BrowserMockup from './mockups/BrowserMockup';
import PhoneMockup from './mockups/PhoneMockup';

export default function ShortCaseModal({ item, onClose }) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

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

  if (!item) return null;

  const hasScreens = item.screens && item.screens.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`relative w-full ${
          hasScreens ? 'max-w-4xl' : 'max-w-2xl'
        } bg-[#0c1017] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-900/70 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-brand-950/80 text-brand-300 border border-brand-800/50">
                {item.tag}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {item.role}
              </span>
              {item.aiCraftInsight && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Built with AI Tools</span>
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {item.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto">
          {/* Real UI Interactive Browser Mockup (If Screens Available) */}
          {hasScreens && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Interactive Production UI Mockup</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {activeScreenIndex + 1} of {item.screens.length} screens
                </span>
              </div>

              {/* Realistic Mockup Frame: Phone or Browser */}
              {item.mockupType === 'phone' ? (
                <PhoneMockup
                  screens={item.screens}
                  activeScreenIndex={activeScreenIndex}
                  onSelectScreen={setActiveScreenIndex}
                  alt={`${item.title} - ${item.screens[activeScreenIndex]?.name}`}
                  showTabs={true}
                  allowZoom={true}
                  enableFlowView={true}
                />
              ) : (
                <>
                  <BrowserMockup
                    screens={item.screens}
                    activeScreenIndex={activeScreenIndex}
                    onSelectScreen={setActiveScreenIndex}
                    alt={`${item.title} - ${item.screens[activeScreenIndex]?.name}`}
                    aspectRatio="aspect-[16/9]"
                    showTabs={true}
                    allowZoom={true}
                  />

                  {/* Active Screen Caption Note */}
                  {item.screens[activeScreenIndex]?.caption && (
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                      <p className="leading-relaxed">
                        <strong className="text-white font-semibold mr-1">
                          {item.screens[activeScreenIndex].name}:
                        </strong>
                        {item.screens[activeScreenIndex].caption}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* AI Craft & Client Requirements Callout */}
          {item.aiCraftInsight && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/40 via-slate-900 to-slate-900 border border-brand-800/40 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-300 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>AI Collaborative Engineering · Client Delivery</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {item.aiCraftInsight}
              </p>
            </div>
          )}

          {/* The Problem */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              The Problem
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {item.problem}
            </p>
          </div>

          {/* What I Designed */}
          <div className="space-y-2 p-5 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold">
              What I Designed
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {item.designed}
            </p>
          </div>

          {/* Key Decision */}
          <div className="space-y-2 p-5 rounded-xl bg-brand-950/25 border border-brand-800/40">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-300 font-bold flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-brand-400" />
              Key Decision
            </h4>
            <p className="text-sm text-brand-100 leading-relaxed">
              {item.keyDecision}
            </p>
          </div>

          {/* What this project proved (for Trackgle) */}
          {item.provenInsight && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30">
              <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-1">
                What this project proved
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                {item.provenInsight}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-500">
            {hasScreens ? 'Click screen to open high-res lightbox' : ''}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
