import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  LayoutGrid, 
  ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../../utils/soundEffects';

export default function BrowserMockup({
  url = 'app.carezhen.com/dashboard',
  screens = [],
  activeScreenIndex = 'all',
  onSelectScreen,
  image,
  alt = 'Web application mockup',
  className = '',
  aspectRatio = 'aspect-[16/9]',
  showTabs = true,
  allowZoom = true,
  allTabLabel = 'All Images',
}) {
  const [internalActive, setInternalActive] = useState(activeScreenIndex);
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [allLayoutMode, setAllLayoutMode] = useState('stack'); // 'stack' | 'grid'

  // Sync internal state if controlled from parent
  useEffect(() => {
    setInternalActive(activeScreenIndex);
  }, [activeScreenIndex]);

  const currentActive = onSelectScreen !== undefined ? activeScreenIndex : internalActive;
  const isAllMode = currentActive === 'all';
  const numericIndex = typeof currentActive === 'number' ? currentActive : 0;

  const handleSelect = (val) => {
    soundFx.playClick();
    if (onSelectScreen) {
      onSelectScreen(val);
    } else {
      setInternalActive(val);
    }
  };

  const currentScreen = screens.length > 0 ? (screens[numericIndex] || screens[0]) : null;
  const singleImage = currentScreen ? currentScreen.image : image;
  const singleUrl = currentScreen ? (currentScreen.route || url) : url;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (zoomedIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoomedIndex(null);
      if (screens.length > 1) {
        if (e.key === 'ArrowRight') {
          setZoomedIndex((prev) => (prev + 1) % screens.length);
        }
        if (e.key === 'ArrowLeft') {
          setZoomedIndex((prev) => (prev - 1 + screens.length) % screens.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedIndex, screens.length]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Header & Tab Controls (rendered when multiple screens exist) */}
      {showTabs && screens.length > 1 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0c1017] p-2.5 rounded-2xl border border-white/10 shadow-lg">
          {/* Tabs List */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar py-0.5">
            {/* 1. FIRST DEFAULT BUTTON: All Images */}
            <button
              type="button"
              onClick={() => handleSelect('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                isAllMode
                  ? 'bg-cyan-600/90 text-white font-semibold shadow-md shadow-cyan-600/30 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{allTabLabel}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                isAllMode ? 'bg-black/40 text-cyan-200' : 'bg-slate-800 text-slate-400'
              }`}>
                {screens.length}
              </span>
            </button>

            {/* Individual Screen Buttons */}
            {screens.map((screen, idx) => {
              const isActive = !isAllMode && currentActive === idx;
              return (
                <button
                  key={screen.id || idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-70">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{screen.name}</span>
                  {screen.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono hidden md:inline-block ${
                      isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {screen.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side controls: Stack vs Grid layout toggle when in 'All Images' mode */}
          {isAllMode && (
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setAllLayoutMode('stack');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  allLayoutMode === 'stack'
                    ? 'bg-white/10 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Full Flow Stack"
              >
                <span>Full Flow</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setAllLayoutMode('grid');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  allLayoutMode === 'grid'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="2-Column Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">2-Col Grid</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 1: ALL IMAGES VIEW (Displays all five images) */}
      {isAllMode && screens.length > 0 ? (
        <div className={allLayoutMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8' : 'space-y-10'}>
          {screens.map((screen, idx) => (
            <div key={screen.id || idx} className="space-y-3">
              {/* Individual macOS Safari Browser Frame */}
              <div className="relative rounded-2xl bg-[#0a0d14] border border-white/10 shadow-2xl shadow-black/80 overflow-hidden flex flex-col group/browser">
                {/* Titlebar */}
                <div className="px-4 py-2.5 bg-[#0f131c]/95 border-b border-white/[0.08] flex items-center justify-between gap-3 shrink-0 select-none">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-sm" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-sm" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-sm" />
                    <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline font-medium">
                      {screens.length === 1 ? screen.name : `Screen ${String(idx + 1).padStart(2, '0')}: ${screen.name}`}
                    </span>
                  </div>

                  {/* Centered Route Pill */}
                  <div className="flex-1 max-w-sm mx-auto flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-white/[0.08] text-[11px] font-mono text-slate-300 shadow-inner">
                    <Lock className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="text-slate-500 hidden sm:inline text-[10px]">https://</span>
                    <span className="font-medium text-slate-200 truncate">{screen.route || url}</span>
                    <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0 hidden sm:inline" />
                  </div>

                  {/* Actions & Badge */}
                  <div className="flex items-center gap-2 text-slate-500">
                    {screen.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 hidden md:inline">
                        {screen.badge}
                      </span>
                    )}
                    {allowZoom && (
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setZoomedIndex(idx);
                        }}
                        className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
                        title="View full resolution"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Viewport Image */}
                <div
                  onClick={() => {
                    if (allowZoom) {
                      soundFx.playClick();
                      setZoomedIndex(idx);
                    }
                  }}
                  className={`relative overflow-hidden bg-[#07090e] ${aspectRatio} flex items-center justify-center cursor-pointer`}
                >
                  <img
                    src={screen.image}
                    alt={screen.name}
                    className="w-full h-full object-contain object-top select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
                  {allowZoom && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/browser:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-4 py-2 rounded-full bg-slate-900/90 border border-white/20 text-xs text-white font-medium shadow-xl flex items-center gap-2 backdrop-blur-md">
                        <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Click to view full screen</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Screen Caption card */}
              {screen.caption && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs sm:text-sm text-slate-300 flex items-start gap-3 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 animate-pulse" />
                  <p className="leading-relaxed">
                    <strong className="text-white font-semibold mr-1.5">
                      {screens.length === 1 ? screen.name : `Screen ${String(idx + 1).padStart(2, '0')} · ${screen.name}`}:
                    </strong>
                    {screen.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* VIEW MODE 2: SINGLE SCREEN FOCUS */
        <div className="space-y-4">
          <div className="relative rounded-2xl bg-[#0a0d14] border border-white/10 shadow-2xl shadow-black/80 overflow-hidden flex flex-col group/browser">
            {/* macOS Safari Window Titlebar */}
            <div className="px-4 py-2.5 bg-[#0f131c]/95 border-b border-white/[0.08] flex items-center justify-between gap-3 shrink-0 select-none">
              {/* Traffic light controls */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-sm" />
                {currentScreen && (
                  <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline font-medium">
                    {String(numericIndex + 1).padStart(2, '0')} · {currentScreen.name}
                  </span>
                )}
              </div>

              {/* Centered URL Address Pill */}
              <div className="flex-1 max-w-sm mx-auto flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-white/[0.08] text-[11px] font-mono text-slate-300 shadow-inner">
                <Lock className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="text-slate-500 hidden sm:inline text-[10px]">https://</span>
                <span className="font-medium text-slate-200 truncate">{singleUrl}</span>
                <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0 hidden sm:inline" />
              </div>

              {/* Window action icons */}
              <div className="flex items-center gap-2 text-slate-500">
                {currentScreen?.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 hidden md:inline">
                    {currentScreen.badge}
                  </span>
                )}
                {allowZoom && (
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setZoomedIndex(numericIndex);
                    }}
                    className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
                    title="View full resolution"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Viewport Screen Content */}
            <div className={`relative overflow-hidden bg-[#07090e] ${aspectRatio} flex items-center justify-center`}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={singleImage}
                  src={singleImage}
                  alt={alt}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full object-contain object-top select-none"
                  loading="lazy"
                />
              </AnimatePresence>

              {/* Specular glare reflection across the glass */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />

              {/* Prev / Next Chevrons on Single View */}
              {screens.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const prev = (numericIndex - 1 + screens.length) % screens.length;
                      handleSelect(prev);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white flex items-center justify-center transition-all opacity-0 group-hover/browser:opacity-100 shadow-xl backdrop-blur-sm"
                    title="Previous Screen"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = (numericIndex + 1) % screens.length;
                      handleSelect(next);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white flex items-center justify-center transition-all opacity-0 group-hover/browser:opacity-100 shadow-xl backdrop-blur-sm"
                    title="Next Screen"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Hover zoom affordance */}
              {allowZoom && (
                <div
                  onClick={() => {
                    soundFx.playClick();
                    setZoomedIndex(numericIndex);
                  }}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover/browser:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none group-hover/browser:pointer-events-auto"
                >
                  <div className="px-4 py-2 rounded-full bg-slate-900/90 border border-white/20 text-xs text-white font-medium shadow-xl flex items-center gap-2 backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Click to view full screen</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Single Screen Caption */}
          {currentScreen?.caption && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3 shadow-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 animate-pulse" />
              <p className="leading-relaxed">
                <strong className="text-white font-semibold mr-1.5">
                  Screen {String(numericIndex + 1).padStart(2, '0')} · {currentScreen.name}:
                </strong>
                {currentScreen.caption}
              </p>
            </div>
          )}
        </div>
      )}

      {/* High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {zoomedIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomedIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl max-h-[94vh] z-10 flex flex-col bg-[#0c1017] rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            >
              {/* Lightbox Header */}
              <div className="p-3.5 bg-slate-900/95 border-b border-white/10 flex items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="font-mono text-xs text-slate-300 ml-2 font-medium">
                    {screens[zoomedIndex]?.name || 'Preview'}
                  </span>
                  {screens[zoomedIndex]?.route && (
                    <span className="text-[10px] font-mono text-cyan-400 bg-black/40 px-2 py-0.5 rounded border border-cyan-800/40 hidden sm:inline">
                      https://{screens[zoomedIndex].route}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {screens.length > 1 && (
                    <span className="text-[11px] font-mono text-slate-400 mr-2">
                      {zoomedIndex + 1} of {screens.length}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setZoomedIndex(null)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    Close [Esc]
                  </button>
                </div>
              </div>

              {/* Lightbox Body with Left/Right Nav */}
              <div className="relative overflow-auto p-2 sm:p-4 bg-[#08090d] flex items-center justify-center min-h-[50vh]">
                <img
                  src={screens[zoomedIndex]?.image || singleImage}
                  alt={screens[zoomedIndex]?.name || alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />

                {screens.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setZoomedIndex((prev) => (prev - 1 + screens.length) % screens.length);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/20 text-white flex items-center justify-center transition-all shadow-xl"
                      title="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setZoomedIndex((prev) => (prev + 1) % screens.length);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/20 text-white flex items-center justify-center transition-all shadow-xl"
                      title="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
