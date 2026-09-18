import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Wifi, 
  BatteryMedium, 
  Signal, 
  Sparkles,
  LayoutGrid,
  Smartphone,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../../utils/soundEffects';

export default function PhoneMockup({
  screens = [],
  activeScreenIndex = 0,
  onSelectScreen,
  image,
  alt = 'Mobile application mockup',
  className = '',
  showTabs = true,
  allowZoom = true,
  enableFlowView = true,
  compact = false,
  flowTitle = 'Complete Mobile Experience Flow',
  flowSubtitle = 'Inspect all mobile views and user workflows.',
  allTabLabel = 'All Images',
  defaultMode = 'flow',
}) {
  const [internalIndex, setInternalIndex] = useState(activeScreenIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [viewMode, setViewMode] = useState(defaultMode || 'flow'); // 'single' | 'flow'

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
  const currentImage = currentScreen ? currentScreen.image : image;

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
    // Compact preview for grid cards (MoreWorkGrid)
    return (
      <div className={`relative w-full max-w-[240px] mx-auto py-2 ${className}`}>
        <div className="relative rounded-[36px] bg-[#10131b] p-2 border-[3px] border-slate-700/80 shadow-xl shadow-black/60 overflow-hidden ring-1 ring-white/15">
          {/* Dynamic Island mini */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800 ml-auto mr-2" />
          </div>

          {/* Screen */}
          <div className="relative rounded-[28px] overflow-hidden bg-black aspect-[9/19.5]">
            <img
              src={image || (screens[0] && screens[0].image)}
              alt={alt}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
          </div>

          {/* Home indicator bar mini */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/40 rounded-full z-20" />
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Controls Bar: Screen Selector Tabs + View Mode Toggle */}
      {showTabs && screens.length > 1 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0c1017] p-2.5 rounded-2xl border border-white/10 shadow-lg">
          {/* Interactive Screen Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar py-1">
            {/* First Default Button: All Images */}
            {enableFlowView && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setViewMode('flow');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  viewMode === 'flow'
                    ? 'bg-cyan-600/90 text-white font-semibold shadow-md shadow-cyan-600/30 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{allTabLabel}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  viewMode === 'flow' ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {screens.length}
                </span>
              </button>
            )}
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
                      ? 'bg-brand-500 text-white font-semibold shadow-md shadow-brand-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-80">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{screen.name}</span>
                  {screen.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono hidden md:inline-block ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {screen.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Flow Gallery vs Single Phone Toggle */}
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
                title="Single Device View"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Device View</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setViewMode('flow');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  viewMode === 'flow'
                    ? 'bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={`View ${allTabLabel}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{allTabLabel === 'All Images' ? 'Flow View' : allTabLabel}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 1: SINGLE HIGH-FIDELITY IPHONE 16 PRO DEVICE MOCKUP */}
      {viewMode === 'single' && (
        <div className="relative flex flex-col items-center justify-center py-6 sm:py-10 bg-gradient-to-b from-[#0e121b] via-[#090b10] to-[#08090d] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Subtle ambient light aura behind the phone matching brand theme */}
          <div className="absolute w-80 h-80 rounded-full bg-brand-500/10 blur-3xl pointer-events-none -top-10 -left-10" />
          <div className="absolute w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none -bottom-10 -right-10" />

          {/* Navigation Arrows on Desktop */}
          {screens.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevScreen}
                className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 shadow-xl transition-all hover:scale-105 z-20 group"
                title="Previous Screen"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={nextScreen}
                className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 shadow-xl transition-all hover:scale-105 z-20 group"
                title="Next Screen"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {/* Authentic iPhone 16 Pro Titanium Chassis */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] group/phone select-none">
            {/* Outer Titanium Frame */}
            <div className="relative rounded-[50px] p-[10px] bg-gradient-to-b from-[#3a3f4d] via-[#1a1d26] to-[#0f1117] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.18)] ring-1 ring-black">
              {/* Subtle Side Button Outlines */}
              {/* Left side: Action Button + Volume Up/Down */}
              <div className="absolute -left-[3px] top-24 w-[3px] h-7 bg-[#2d313d] rounded-l-sm" />
              <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-[#2d313d] rounded-l-sm" />
              <div className="absolute -left-[3px] top-52 w-[3px] h-12 bg-[#2d313d] rounded-l-sm" />
              {/* Right side: Power Button */}
              <div className="absolute -right-[3px] top-36 w-[3px] h-16 bg-[#2d313d] rounded-r-sm" />

              {/* Inner Dark Bezel */}
              <div className="relative rounded-[42px] overflow-hidden bg-black p-1 shadow-inner border border-white/5">
                {/* Viewport Display (Aspect Ratio for modern iPhone 19.5:9) */}
                <div className="relative rounded-[38px] overflow-hidden bg-[#07090e] aspect-[9/19.5] flex items-center justify-center">
                  
                  {/* iOS Authentic Top Status Bar Overlay */}
                  <div className="absolute top-0 left-0 right-0 h-10 z-30 px-6 flex items-center justify-between text-white text-[12px] font-semibold tracking-tight pointer-events-none select-none">
                    {/* Timestamp (11:11 matches screenshots) */}
                    <span className="font-mono text-[11px] font-medium tracking-normal text-white">11:11</span>

                    {/* Dynamic Island pill */}
                    <div className="w-[88px] h-[24px] bg-black rounded-full flex items-center justify-end px-2 shadow-sm ring-1 ring-white/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#121620] ring-1 ring-white/10" />
                    </div>

                    {/* Cellular, WiFi, Battery icons */}
                    <div className="flex items-center gap-1.5 text-slate-100">
                      <Signal className="w-3 h-3 text-white" />
                      <Wifi className="w-3 h-3 text-white" />
                      <div className="w-5 h-2.5 rounded-sm border border-white/80 p-[1px] flex items-center">
                        <div className="w-full h-full bg-emerald-400 rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* Active Screen Image with Framer Motion Transition */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={currentImage}
                      alt={currentScreen ? currentScreen.name : alt}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                    />
                  </AnimatePresence>

                  {/* Specular Diagonal Sheen / Screen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />

                  {/* Bottom iOS Home Swipe Bar */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/70 rounded-full z-20 pointer-events-none shadow-sm" />

                  {/* Hover affordance to trigger Fullscreen Lightbox Zoom */}
                  {allowZoom && (
                    <div
                      onClick={() => {
                        soundFx.playClick();
                        setIsZoomed(true);
                      }}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover/phone:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-30"
                    >
                      <div className="px-4 py-2 rounded-full bg-slate-900/90 border border-white/20 text-xs text-white font-medium shadow-2xl flex items-center gap-2 backdrop-blur-md">
                        <Maximize2 className="w-3.5 h-3.5 text-brand-400" />
                        <span>Tap to inspect high-res</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Screen Caption & Information Card */}
          {currentScreen && (
            <motion.div
              key={currentScreen.id || currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 max-w-xl mx-auto px-4 text-center space-y-1.5"
            >
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-brand-400">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                <span className="uppercase tracking-wider font-bold">Screen {currentIndex + 1} of {screens.length}</span>
                <span>·</span>
                <span className="text-slate-300 font-semibold">{currentScreen.name}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentScreen.caption}
              </p>
            </motion.div>
          )}

          {/* Quick pagination dots */}
          {screens.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {screens.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx
                      ? 'w-6 bg-brand-400 shadow-sm shadow-brand-400/50'
                      : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Jump to screen ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: MOBILE UI SCREENS FLOW GALLERY (COMPLETE USER JOURNEY) */}
      {viewMode === 'flow' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{flowTitle}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {flowSubtitle}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              {screens.length} Screens Total
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
                className="group cursor-pointer bg-[#0c1017] hover:bg-[#121622] p-3 rounded-2xl border border-slate-800 hover:border-brand-500/50 transition-all flex flex-col shadow-lg hover:shadow-xl hover:shadow-brand-950/30"
              >
                {/* Mini Device Bezel */}
                <div className="relative rounded-[32px] p-2 bg-gradient-to-b from-[#2a2f3a] to-[#0c1017] border border-white/10 shadow-inner mb-3 overflow-hidden">
                  {/* Dynamic Island Mini */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-10 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-slate-800 ml-auto mr-1.5" />
                  </div>

                  {/* Screen View */}
                  <div className="relative rounded-[24px] overflow-hidden bg-black aspect-[9/19.5]">
                    <img
                      src={screen.image}
                      alt={screen.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-brand-400 font-bold">0{idx + 1}</span>
                      <span className="text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded text-[10px]">{screen.badge}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
                      {screen.name}
                    </h5>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal">
                      {screen.caption}
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-800/80 text-[11px] font-mono text-brand-400 flex items-center gap-1 group-hover:text-brand-300">
                    <span>Inspect Screen</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* FULL-RESOLUTION LIGHTBOX ZOOM MODAL */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 bg-black/92 backdrop-blur-xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative max-w-4xl max-h-[94vh] z-10 flex flex-col bg-[#0b0e14] rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-4 py-3 bg-slate-900/95 border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {currentScreen ? currentScreen.name : 'Farm Produce UI'}
                  </span>
                  {currentScreen?.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800/50">
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

              {/* Modal Body: Large High-Res Screen View */}
              <div className="overflow-auto p-4 sm:p-8 bg-[#06080c] flex flex-col items-center justify-center">
                <div className="max-w-[380px] rounded-[44px] p-2 bg-[#1b1f2b] border border-white/20 shadow-2xl overflow-hidden">
                  <img
                    src={currentImage}
                    alt={currentScreen?.name || alt}
                    className="w-full max-h-[72vh] object-contain rounded-[36px]"
                  />
                </div>

                {currentScreen?.caption && (
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
