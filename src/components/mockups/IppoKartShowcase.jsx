import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  LayoutGrid, 
  ExternalLink,
  Laptop,
  CheckCircle2,
  Sparkles,
  ArrowUp,
  RotateCcw,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  User,
  Filter,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../../utils/soundEffects';

export default function IppoKartShowcase({ project, className = '' }) {
  const screens = project?.screens || [];
  const [activeTab, setActiveTab] = useState(0); // 0..4 or 'all'
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [viewMode, setViewMode] = useState('laptop'); // 'laptop' | 'all'
  const [isScrolled, setIsScrolled] = useState(false);
  const viewportRef = useRef(null);

  const isAllMode = viewMode === 'all';
  const numericIndex = typeof activeTab === 'number' ? activeTab : 0;
  const currentScreen = screens[numericIndex] || screens[0];

  // Screen icons mapping
  const getScreenIcon = (id) => {
    switch (id) {
      case 'storefront-home': return ShoppingBag;
      case 'catalog-filters': return Filter;
      case 'cart-inventory': return ShoppingCart;
      case 'checkout-payment': return CreditCard;
      case 'account-profile': return User;
      default: return Layers;
    }
  };

  const handleSelectTab = (idx) => {
    soundFx.playClick();
    setActiveTab(idx);
    setIsScrolled(false);
    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0;
    }
  };

  // Track internal viewport scroll to toggle scroll-to-top indicator
  const handleScroll = (e) => {
    if (e.target.scrollTop > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const scrollToTop = () => {
    soundFx.playClick();
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      {/* Top Header & Tab Navigation Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-[#0c1017] p-3 rounded-2xl border border-white/10 shadow-xl">
        {/* Screen Tabs List */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar py-0.5">
          {screens.map((screen, idx) => {
            const Icon = getScreenIcon(screen.id);
            const isActive = !isAllMode && activeTab === idx;
            return (
              <button
                key={screen.id || idx}
                type="button"
                onClick={() => {
                  setViewMode('laptop');
                  handleSelectTab(idx);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-orange-600/90 text-white font-semibold shadow-md shadow-orange-600/30 border border-orange-400/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-orange-400'}`} />
                <span className="font-mono text-[11px] opacity-70">0{idx + 1}</span>
                <span>{screen.name.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Switcher: Device Mockup vs Full Flow Grid */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-white/10 shrink-0 self-end lg:self-auto">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setViewMode('laptop');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === 'laptop'
                ? 'bg-orange-500/20 text-orange-300 font-semibold border border-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Interactive MacBook Device Mockup"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Laptop Mockup</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setViewMode('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              viewMode === 'all'
                ? 'bg-orange-500/20 text-orange-300 font-semibold border border-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
            title="View All 5 Screens Stack"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All 5 Views</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: HERO INTERACTIVE MACBOOK PRO DEVICE MOCKUP */}
      {!isAllMode && currentScreen && (
        <div className="space-y-6">
          {/* Ambient Glow Canvas Wrapper */}
          <div className="relative pt-4 pb-8 px-3 sm:px-8 rounded-3xl bg-gradient-to-b from-[#150e09] via-[#0a0d14] to-[#06080d] border border-orange-950/40 shadow-2xl overflow-hidden">
            {/* Ambient Warm Radial Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-600/15 via-orange-950/5 to-transparent pointer-events-none blur-2xl" />

            {/* REALISTIC MACBOOK PRO HARDWARE FRAME */}
            <div className="relative max-w-5xl mx-auto flex flex-col items-center">
              {/* Laptop Lid & Screen Bezel */}
              <div className="w-full rounded-t-2xl sm:rounded-t-3xl bg-[#141822] p-2.5 sm:p-3.5 border-t border-x border-slate-600/80 shadow-2xl shadow-black ring-1 ring-white/10 flex flex-col">
                {/* Top Notch Camera Dot with Status LED */}
                <div className="flex items-center justify-center gap-1.5 pb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a0d14] border border-slate-700/80 shadow-inner" />
                  <span className="w-1 h-1 rounded-full bg-emerald-500/80 animate-pulse" title="Camera Active" />
                </div>

                {/* macOS Safari Browser Chassis inside the laptop display */}
                <div className="rounded-xl overflow-hidden bg-[#0a0d14] border border-white/10 shadow-2xl flex flex-col">
                  {/* Browser Window Header & Address Bar */}
                  <div className="px-3.5 py-2.5 bg-[#0e131d]/95 border-b border-white/[0.08] flex items-center justify-between gap-3 shrink-0 select-none">
                    {/* Traffic Lights Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => soundFx.playClick()}
                        className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 hover:opacity-80 transition-opacity"
                        title="Close"
                      />
                      <button
                        type="button"
                        onClick={() => soundFx.playClick()}
                        className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 hover:opacity-80 transition-opacity"
                        title="Minimize"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setZoomedIndex(numericIndex);
                        }}
                        className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 hover:opacity-80 transition-opacity"
                        title="Full screen"
                      />
                    </div>

                    {/* Centered Route URL Pill */}
                    <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/90 border border-white/[0.08] text-[11px] font-mono text-slate-300 shadow-inner">
                      <Lock className="w-3 h-3 text-orange-400 shrink-0" />
                      <span className="text-slate-500 hidden sm:inline text-[10px]">https://</span>
                      <span className="font-medium text-slate-200 truncate">{currentScreen.route}</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0 hidden sm:inline" />
                    </div>

                    {/* Window Badges & Action Buttons */}
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-800/50 hidden md:inline">
                        {currentScreen.badge}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setZoomedIndex(numericIndex);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                        title="View Fullscreen Lightbox"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Browser Viewport with Interactive Scroll Container */}
                  <div className="relative group/viewport">
                    <div
                      ref={viewportRef}
                      onScroll={handleScroll}
                      className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] overflow-y-auto overflow-x-hidden bg-[#080a0f] scroll-smooth select-none cursor-default"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(234, 88, 12, 0.4) transparent'
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentScreen.image}
                          src={currentScreen.image}
                          alt={currentScreen.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-auto object-contain object-top block"
                          loading="lazy"
                        />
                      </AnimatePresence>

                      {/* Specular Glass Sheen Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.04] pointer-events-none" />
                    </div>

                    {/* Prev / Next Chevrons on Hover */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const prev = (numericIndex - 1 + screens.length) % screens.length;
                        handleSelectTab(prev);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white flex items-center justify-center transition-all opacity-0 group-hover/viewport:opacity-100 shadow-xl backdrop-blur-sm"
                      title="Previous Screen"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const next = (numericIndex + 1) % screens.length;
                        handleSelectTab(next);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/20 text-white flex items-center justify-center transition-all opacity-0 group-hover/viewport:opacity-100 shadow-xl backdrop-blur-sm"
                      title="Next Screen"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Interactive Scroll Hint Badge */}
                    {numericIndex <= 1 && !isScrolled && (
                      <div className="absolute bottom-3 right-3 pointer-events-none animate-bounce">
                        <div className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-orange-500/40 text-[10px] font-mono text-orange-300 shadow-xl backdrop-blur-md flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                          <span>Scroll inside to explore full page</span>
                        </div>
                      </div>
                    )}

                    {/* Scroll to Top Quick Button */}
                    {isScrolled && (
                      <button
                        type="button"
                        onClick={scrollToTop}
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-orange-600/90 hover:bg-orange-500 text-white shadow-xl backdrop-blur-md transition-all flex items-center gap-1 text-[11px] font-mono"
                        title="Scroll to Top"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span className="pr-1">Top</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Laptop Hinge Bar */}
              <div className="w-[101%] h-2 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-t-sm border-t border-slate-600/40" />

              {/* Laptop Aluminum Keyboard Deck Base with Thumb Notch */}
              <div className="w-[105%] h-3 sm:h-4 bg-gradient-to-b from-[#242a38] via-[#1a1f2c] to-[#10131c] rounded-b-xl sm:rounded-b-2xl border-x border-b border-slate-700/80 shadow-2xl flex items-start justify-center relative">
                {/* Thumb Opening Notch in Center */}
                <div className="w-16 sm:w-24 h-1 bg-slate-600/70 rounded-b-md" />
              </div>

              {/* Laptop Desk Shadow & Ambient Glow Under Chassis */}
              <div className="w-[90%] h-4 bg-orange-950/40 blur-md rounded-full mt-1 pointer-events-none" />
            </div>
          </div>

          {/* Active Screen UX Breakdown & Highlights Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1017] border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-orange-950/80 border border-orange-800/50 text-orange-400">
                  {React.createElement(getScreenIcon(currentScreen.id), { className: "w-4 h-4" })}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-800/50">
                      SCREEN 0{numericIndex + 1} OF 05
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {currentScreen.route}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                    {currentScreen.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    const prev = (numericIndex - 1 + screens.length) % screens.length;
                    handleSelectTab(prev);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Previous Screen"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-400 px-2">
                  0{numericIndex + 1} / 0{screens.length}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const next = (numericIndex + 1) % screens.length;
                    handleSelectTab(next);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Next Screen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Screen Caption & Design Solution */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentScreen.caption}
            </p>
          </div>
        </div>
      )}

      {/* VIEW 2: PRODUCTION SCREENS FLOW (ALL 5 SCREENS IN DEDICATED BROWSER MOCKUPS) */}
      {isAllMode && (
        <div className="space-y-10 pt-2">
          {screens.map((screen, idx) => {
            const Icon = getScreenIcon(screen.id);
            return (
              <div key={screen.id || idx} className="space-y-4">
                {/* macOS Safari Browser Frame Mockup */}
                <div className="relative rounded-2xl bg-[#0a0d14] border border-white/10 shadow-2xl shadow-black/90 overflow-hidden flex flex-col group/browser">
                  {/* Browser Window Titlebar */}
                  <div className="px-4 py-2.5 bg-[#0f131c]/95 border-b border-white/[0.08] flex items-center justify-between gap-3 shrink-0 select-none">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-sm" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-sm" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-sm" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline font-medium">
                        Screen 0{idx + 1}: {screen.name}
                      </span>
                    </div>

                    {/* Centered Route URL Pill */}
                    <div className="flex-1 max-w-sm mx-auto flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-white/[0.08] text-[11px] font-mono text-slate-300 shadow-inner">
                      <Lock className="w-3 h-3 text-orange-400 shrink-0" />
                      <span className="text-slate-500 hidden sm:inline text-[10px]">https://</span>
                      <span className="font-medium text-slate-200 truncate">{screen.route}</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0 hidden sm:inline" />
                    </div>

                    {/* Badge & Zoom Trigger */}
                    <div className="flex items-center gap-2 text-slate-400">
                      {screen.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-800/50 hidden md:inline">
                          {screen.badge}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setZoomedIndex(idx);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                        title="View Fullscreen Lightbox"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Mockup Viewport Canvas */}
                  <div
                    onClick={() => {
                      soundFx.playClick();
                      setZoomedIndex(idx);
                    }}
                    className="relative overflow-hidden bg-[#07090e] max-h-[620px] overflow-y-auto cursor-pointer custom-scrollbar group/img"
                  >
                    <img
                      src={screen.image}
                      alt={screen.name}
                      className="w-full h-auto object-contain object-top select-none group-hover/img:scale-[1.005] transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Hover Zoom Prompt Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/browser:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="px-4 py-2 rounded-full bg-slate-900/90 border border-white/20 text-xs text-white font-medium shadow-xl flex items-center gap-2 backdrop-blur-md">
                        <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
                        <span>Click to view full resolution</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Caption Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-slate-800/80 text-xs sm:text-sm text-slate-300 flex items-start gap-3 shadow-md">
                  <span className="p-1.5 rounded-lg bg-orange-950/80 border border-orange-800/40 text-orange-400 shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <strong className="text-white font-semibold mr-1.5">
                      Screen 0{idx + 1} · {screen.name}:
                    </strong>
                    <span className="leading-relaxed">
                      {screen.caption}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {zoomedIndex !== null && screens[zoomedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 z-10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-orange-950/90 border border-orange-800/60 text-orange-300 text-xs font-mono">
                  Screen 0{zoomedIndex + 1} of 0{screens.length}
                </span>
                <span className="text-sm font-semibold text-white truncate max-w-md hidden sm:inline">
                  {screens[zoomedIndex].name}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedIndex(null);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82vh] overflow-y-auto max-w-6xl mx-auto rounded-2xl border border-white/15 bg-[#080a0f] shadow-2xl p-1"
            >
              <img
                src={screens[zoomedIndex].image}
                alt={screens[zoomedIndex].name}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between gap-4 z-10 max-w-6xl mx-auto w-full pt-2">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs font-mono text-slate-300">
                  https://{screens[zoomedIndex].route}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const prev = (zoomedIndex - 1 + screens.length) % screens.length;
                    setZoomedIndex(prev);
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs font-mono"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const next = (zoomedIndex + 1) % screens.length;
                    setZoomedIndex(next);
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs font-mono"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
