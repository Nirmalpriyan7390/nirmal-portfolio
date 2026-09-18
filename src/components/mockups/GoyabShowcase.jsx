import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  LayoutGrid, 
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Lock,
  Share2,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../../utils/soundEffects';

export default function GoyabShowcase({
  screens = [],
  activeScreenIndex = 0,
  onSelectScreen,
  className = '',
  showTabs = true,
  allowZoom = true,
  enableFlowView = true,
  compact = false,
}) {
  const [internalIndex, setInternalIndex] = useState(activeScreenIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [viewMode, setViewMode] = useState('single'); // 'single' | 'flow'

  const currentIndex = onSelectScreen !== undefined ? activeScreenIndex : internalIndex;

  const handleSelect = (idx) => {
    soundFx.playClick();
    if (onSelectScreen) {
      onSelectScreen(idx);
    } else {
      setInternalIndex(idx);
    }
  };

  const currentScreen = screens.length > 0 ? screens[currentIndex] : null;

  const nextScreen = () => {
    if (screens.length === 0) return;
    const next = (currentIndex + 1) % screens.length;
    handleSelect(next);
  };

  const prevScreen = () => {
    if (screens.length === 0) return;
    const prev = (currentIndex - 1 + screens.length) % screens.length;
    handleSelect(prev);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isZoomed) return;
      if (e.key === 'Escape') setIsZoomed(false);
      if (e.key === 'ArrowRight') nextScreen();
      if (e.key === 'ArrowLeft') prevScreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, currentIndex, screens.length]);

  if (compact) {
    return (
      <div className={`relative w-full max-w-[260px] mx-auto py-2 ${className}`}>
        <div className="relative rounded-2xl overflow-hidden border border-lime-500/30 shadow-xl shadow-black/80 group">
          <img
            src={screens[0]?.image || '/goyab/reminders.webp'}
            alt="Goyab UI Preview"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
            <span className="text-[11px] font-mono text-lime-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>4 Production Screens</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Header & Tab Controls */}
      {showTabs && screens.length > 1 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0c1017] p-2.5 rounded-2xl border border-white/10 shadow-lg">
          {/* Screen Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar py-1">
            {screens.map((screen, idx) => {
              const isActive = currentIndex === idx && viewMode === 'single';
              return (
                <button
                  key={screen.id || idx}
                  type="button"
                  onClick={() => {
                    setViewMode('single');
                    handleSelect(idx);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-lime-600/90 text-white font-semibold shadow-md shadow-lime-600/30 border border-lime-400/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-80">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{screen.name}</span>
                  {screen.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono hidden md:inline-block ${
                      isActive ? 'bg-black/40 text-lime-200' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {screen.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          {enableFlowView && (
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setViewMode('single');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  viewMode === 'single'
                    ? 'bg-white/10 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Single Screen Focus"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Screen View</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setViewMode('flow');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  viewMode === 'flow'
                    ? 'bg-lime-500/20 text-lime-300 font-semibold border border-lime-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="View All 4 Screens Flow"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All 4 Screens Flow</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 1: SINGLE SCREEN SPOTLIGHT SHOWCASE */}
      {viewMode === 'single' && currentScreen && (
        <div className="relative flex flex-col items-center justify-center py-6 sm:py-8 bg-gradient-to-b from-[#0e140d] via-[#0a0f08] to-[#08090d] rounded-3xl border border-lime-500/20 shadow-2xl overflow-hidden">
          {/* Lime Green Ambient Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-lime-500/10 blur-3xl pointer-events-none -top-10 -left-10" />
          <div className="absolute w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none -bottom-10 -right-10" />

          {/* Navigation Arrows on Desktop */}
          {screens.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevScreen}
                className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 shadow-xl transition-all hover:scale-105 z-20 group"
                title="Previous Screen"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={nextScreen}
                className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 shadow-xl transition-all hover:scale-105 z-20 group"
                title="Next Screen"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {/* Featured Screen Card Container */}
          <div className="relative w-full max-w-[340px] sm:max-w-[370px] group/card select-none">
            <div className="relative rounded-[32px] overflow-hidden bg-[#0a0f08] border border-lime-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentScreen.image}
                  src={currentScreen.image}
                  alt={currentScreen.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="w-full h-auto object-contain select-none"
                  loading="eager"
                />
              </AnimatePresence>

              {/* Specular glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none" />

              {/* Click to Zoom Hover Overlay */}
              {allowZoom && (
                <div
                  onClick={() => {
                    soundFx.playClick();
                    setIsZoomed(true);
                  }}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-30"
                >
                  <div className="px-4 py-2 rounded-full bg-slate-900/90 border border-white/20 text-xs text-white font-medium shadow-2xl flex items-center gap-2 backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5 text-lime-400" />
                    <span>Tap to view full resolution</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Screen Caption & Rationale */}
          <motion.div
            key={currentScreen.id || currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-xl mx-auto px-4 text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-lime-400">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              <span className="uppercase tracking-wider font-bold">Screen {currentIndex + 1} of {screens.length}</span>
              <span>·</span>
              <span className="text-slate-300 font-semibold">{currentScreen.name}</span>
              {currentScreen.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-lime-950/60 text-lime-300 border border-lime-800/40">
                  {currentScreen.badge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentScreen.caption}
            </p>
          </motion.div>

          {/* Pagination dots */}
          {screens.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {screens.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx
                      ? 'w-6 bg-lime-400 shadow-sm shadow-lime-400/50'
                      : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Jump to screen ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: ALL 4 SCREENS FLOW GALLERY */}
      {viewMode === 'flow' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span>Goyab Complete Production UI System</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete mobile interaction design: 1-tap capture, user-controlled Smart Reminders, customizable save behavior, and end-to-end encrypted Google Drive backup.
              </p>
            </div>
            <span className="text-xs font-mono text-lime-400 bg-lime-950/60 px-3 py-1 rounded-lg border border-lime-800/50">
              4 Production Screens
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {screens.map((screen, idx) => (
              <motion.div
                key={screen.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => {
                  handleSelect(idx);
                  setViewMode('single');
                }}
                className="group cursor-pointer bg-[#0c1017] hover:bg-[#121622] p-3 rounded-2xl border border-slate-800 hover:border-lime-500/50 transition-all flex flex-col shadow-lg hover:shadow-xl hover:shadow-lime-950/30"
              >
                {/* Poster Card Thumbnail */}
                <div className="relative rounded-xl overflow-hidden bg-black border border-lime-500/20 mb-3">
                  <img
                    src={screen.image}
                    alt={screen.name}
                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                </div>

                {/* Card Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-lime-400 font-bold">0{idx + 1}</span>
                      <span className="text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded text-[10px]">{screen.badge}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white group-hover:text-lime-300 transition-colors">
                      {screen.name}
                    </h5>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal">
                      {screen.caption}
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-800/80 text-[11px] font-mono text-lime-400 flex items-center gap-1 group-hover:text-lime-300">
                    <span>Inspect Screen</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* LIGHTBOX FULLSCREEN MODAL */}
      <AnimatePresence>
        {isZoomed && currentScreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 bg-black/92 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative max-w-4xl max-h-[94vh] z-10 flex flex-col bg-[#0b0e14] rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-4 py-3 bg-slate-900/95 border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {currentScreen.name}
                  </span>
                  {currentScreen.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-950 text-lime-300 border border-lime-800/50">
                      {currentScreen.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {screens.length > 1 && (
                    <div className="flex items-center gap-1 mr-2 text-xs font-mono text-slate-400">
                      <button
                        onClick={prevScreen}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                        title="Previous (Left Arrow)"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-1.5">{currentIndex + 1} / {screens.length}</span>
                      <button
                        onClick={nextScreen}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                        title="Next (Right Arrow)"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsZoomed(false)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                  >
                    Close [Esc]
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-auto p-4 sm:p-6 bg-[#06080c] flex flex-col items-center justify-center">
                <div className="max-w-[380px] rounded-2xl overflow-hidden border border-lime-500/30 shadow-2xl">
                  <img
                    src={currentScreen.image}
                    alt={currentScreen.name}
                    className="w-full max-h-[72vh] object-contain"
                  />
                </div>

                {currentScreen.caption && (
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl text-center mt-4">
                    {currentScreen.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
