import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Palette, Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/soundEffects';
import { ambientMusic } from '../utils/ambientMusic';

export default function InteractiveDock({ currentTheme, onThemeChange }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [themeTooltip, setThemeTooltip] = useState('');

  useEffect(() => {
    // Keep internal state synced
    setIsPlayingMusic(ambientMusic.isPlaying);
  }, []);

  const toggleMusic = () => {
    soundFx.playClick();
    const active = ambientMusic.toggle();
    setIsPlayingMusic(active);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  const themes = [
    { id: 'purple', name: 'Fintech Purple', color: '#8b5cf6' },
    { id: 'emerald', name: 'Trading Emerald', color: '#10b981' },
    { id: 'cyan', name: 'SaaS Cyan', color: '#06b6d4' },
    { id: 'amber', name: 'Productivity Amber', color: '#f59e0b' },
  ];

  const handleThemeSelect = (theme) => {
    soundFx.playPop(520, 0.06);
    onThemeChange(theme.id);
    setThemeTooltip(theme.name);
    setTimeout(() => setThemeTooltip(''), 2200);
  };

  return (
    <motion.aside
      aria-label="Interactive portfolio controls"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring' }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-full bg-[#0e1118]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 flex items-center gap-3 text-xs"
    >
      {/* Interactive indicator */}
      <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px] pr-2.5 border-r border-white/10">
        <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '9s' }} />
        <span className="hidden sm:inline font-medium">Controls</span>
      </div>

      {/* Music Play / Pause Speaker Button */}
      <div className="relative">
        <button
          onClick={toggleMusic}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all font-mono text-[11px] font-semibold ${
            isPlayingMusic
              ? 'bg-brand-500/25 border border-brand-500/60 text-brand-300 shadow-[0_0_15px_var(--brand-glow)]'
              : 'hover:bg-white/5 border border-transparent text-slate-400 hover:text-white'
          }`}
          title={isPlayingMusic ? 'Pause background music' : 'Play ambient background music'}
        >
          {isPlayingMusic ? (
            <>
              {/* Animated Equalizer Waveform */}
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <motion.span
                  animate={{ height: ['4px', '14px', '6px', '12px'] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                  className="w-0.5 bg-brand-400 rounded-full"
                />
                <motion.span
                  animate={{ height: ['12px', '5px', '14px', '7px'] }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut', delay: 0.1 }}
                  className="w-0.5 bg-brand-400 rounded-full"
                />
                <motion.span
                  animate={{ height: ['6px', '13px', '4px', '11px'] }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut', delay: 0.2 }}
                  className="w-0.5 bg-brand-400 rounded-full"
                />
              </div>
              <span className="text-[11px]">Ambient Music</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline text-[11px]">Play Music</span>
            </>
          )}
        </button>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -38 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-1/2 -translate-x-1/2 -top-2 whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-[10px] font-mono text-brand-300 shadow-lg pointer-events-none"
            >
              {isPlayingMusic ? '♫ Playing Ambient Chill Synth' : 'Audio Paused'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Color Theme Switcher */}
      <div className="relative flex items-center gap-1.5 pl-2.5 border-l border-white/10">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider hidden md:inline mr-1">
          Theme:
        </span>
        {themes.map((t) => {
          const isActive = currentTheme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleThemeSelect(t)}
              className={`relative p-0.5 rounded-full transition-transform ${
                isActive ? 'scale-125' : 'hover:scale-110 opacity-70 hover:opacity-100'
              }`}
              title={`Switch to ${t.name}`}
            >
              <div
                className="w-4 h-4 rounded-full shadow-md"
                style={{ backgroundColor: t.color }}
              />
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full ring-2 ring-white/60 animate-pulse"
                />
              )}
            </button>
          );
        })}

        {/* Theme Toast Tooltip */}
        <AnimatePresence>
          {themeTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -38 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 -top-2 whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-900 border border-brand-500/40 text-[10px] font-mono text-brand-300 shadow-lg pointer-events-none flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              <span>{themeTooltip} Active</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
