import React from 'react';
import { ArrowRight, Layers, ExternalLink, Sparkles, Lock, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import { soundFx } from '../utils/soundEffects';

export default function MoreWorkGrid({ onOpenShortCase, activeCategory = 'all' }) {
  const allSecondary = portfolioData.secondaryProducts || portfolioData.moreShippedWork || [];
  const filteredItems = allSecondary.filter((item) => {
    if (!activeCategory || activeCategory === 'all') return true;
    return item.category?.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory === 'all';
  });

  return (
    <section id="more-work" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 mb-3">
            <Layers className="w-3.5 h-3.5 text-brand-400" />
            <span>SHORTER CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            More shipped work
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-2">
            Additional shipped products — shorter stories, same level of care.
          </p>
        </motion.div>

        {/* Grid of Tiles with 3D Tilt and Motion Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <TiltCard maxTilt={8} glareOpacity={0.12} className="h-full">
                  <a
                    href={`#/project/${item.id}`}
                    onClick={() => soundFx.playClick()}
                    className="group bg-[#0c1017] hover:bg-[#111722] p-6 rounded-2xl border border-slate-800/80 hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-xl hover:shadow-brand-950/30 h-full block text-left"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-medium text-brand-400 bg-brand-950/60 px-2.5 py-0.5 rounded border border-brand-900/40">
                          {item.tag.split('·')[0].trim()}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {item.role}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-brand-300 transition-colors truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium mb-4 line-clamp-2 min-h-[2.5rem]">
                        {item.subtitle}
                      </p>

                      {/* Unified Mockup Preview Canvas for All Shipped Cards */}
                      {item.screens && item.screens.length > 0 && (
                        <div className="mb-4 rounded-xl overflow-hidden border border-white/10 bg-[#0a0d14] shadow-lg group-hover:border-brand-500/40 transition-colors pointer-events-none flex flex-col">
                          {/* Standard macOS Titlebar across both Mobile and Web */}
                          <div className="px-3 py-2 bg-[#0d111a] border-b border-white/[0.08] flex items-center justify-between gap-2 shrink-0 select-none">
                            {/* Window dots */}
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            </div>

                            {/* Centered Route URL pill */}
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-white/[0.06] text-[10px] font-mono text-slate-300 max-w-[170px] truncate">
                              {item.mockupType === 'phone' ? (
                                <Smartphone className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                              ) : item.id === 'ippokart' ? (
                                <Lock className="w-2.5 h-2.5 text-orange-400 shrink-0" />
                              ) : (
                                <Lock className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                              )}
                              <span className="text-slate-500 text-[9px] hidden sm:inline">https://</span>
                              <span className="font-medium text-slate-200 truncate">{item.screens[0]?.route || item.title.toLowerCase()}</span>
                            </div>

                            {/* Platform Badge */}
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                              item.mockupType === 'phone'
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50'
                                : item.id === 'ippokart'
                                ? 'bg-orange-950/80 text-orange-300 border-orange-800/50'
                                : 'bg-cyan-950/80 text-cyan-300 border-cyan-800/50'
                            }`}>
                              {item.mockupType === 'phone' ? 'iOS App' : 'Web App'}
                            </span>
                          </div>

                          {/* Preview Viewport Canvas (Identical aspect-[16/10] across all cards) */}
                          {item.mockupType === 'phone' ? (
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#0c141d] via-[#080c14] to-[#05070c] flex items-center justify-center p-2.5">
                              {/* Ambient emerald radial glow */}
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent pointer-events-none" />

                              {/* Mobile Device Presentation */}
                              <div className="relative flex items-center justify-center h-full w-full">
                                {/* Secondary Phone (offset behind) */}
                                {item.screens[1] && (
                                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 -rotate-6 h-[86%] aspect-[9/19.5] rounded-[16px] bg-black p-[2px] border border-slate-700/60 shadow-xl shadow-black/80 opacity-60 scale-95 overflow-hidden">
                                    <img
                                      src={item.screens[1].image}
                                      alt="Detail screen"
                                      className="w-full h-full object-cover object-top"
                                      loading="lazy"
                                    />
                                  </div>
                                )}

                                {/* Primary Phone (Storefront Home, in front) */}
                                <div className="relative z-10 h-[92%] aspect-[9/19.5] rounded-[18px] bg-black p-[2.5px] border-2 border-slate-600/90 shadow-2xl shadow-black/90 ring-1 ring-white/15 overflow-hidden flex flex-col group-hover:scale-[1.02] transition-transform duration-500">
                                  {/* Dynamic Island */}
                                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-black rounded-full z-20" />
                                  {/* Screen */}
                                  <div className="relative flex-1 rounded-[14px] overflow-hidden bg-black">
                                    <img
                                      src={item.screens[0].image}
                                      alt={item.title}
                                      className="w-full h-full object-cover object-top"
                                      loading="lazy"
                                    />
                                  </div>
                                  {/* Home Indicator */}
                                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white/40 rounded-full z-20" />
                                </div>

                                {/* Floating Screens Count Badge */}
                                <div className="absolute right-2 bottom-1.5 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/95 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 shadow-lg">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>{item.mobileScreens?.length || item.screens?.length || 0} Screens</span>
                                </div>
                              </div>
                            </div>
                          ) : item.id === 'ippokart' ? (
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#140b04] via-[#090b11] to-[#04060b] flex items-center justify-center p-3">
                              {/* Ambient warm orange brand radial glow */}
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-orange-950/5 to-transparent pointer-events-none" />

                              {/* Desktop / Laptop Device Presentation Scene */}
                              <div className="relative flex items-center justify-center h-full w-full">
                                {/* Secondary Floating Layer: Cart Inventory Triage Card (Offset Top-Left) */}
                                <div className="absolute left-[3%] top-[8%] z-0 w-[44%] rounded-xl bg-[#0e131d]/95 border border-orange-500/30 p-1.5 shadow-2xl shadow-black/90 -rotate-3 opacity-75 scale-95 overflow-hidden pointer-events-none backdrop-blur-md">
                                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10 text-[8px] font-mono text-orange-300">
                                    <span className="flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                      <span>Stock Triage</span>
                                    </span>
                                    <span className="text-[7px] text-slate-400">Cart Defense</span>
                                  </div>
                                  <div className="rounded overflow-hidden bg-black/40 border border-white/5">
                                    <img
                                      src="/ippokart/03-cart-inventory.png"
                                      alt="Cart stock alert"
                                      className="w-full h-11 object-cover object-left-top"
                                      loading="lazy"
                                    />
                                  </div>
                                </div>

                                {/* Primary Device: Floating MacBook Pro Laptop Frame */}
                                <div className="relative z-10 w-[84%] max-w-[300px] flex flex-col items-center group-hover:scale-[1.03] transition-transform duration-500">
                                  {/* Laptop Display Lid & Bezel */}
                                  <div className="w-full rounded-t-xl bg-[#151923] p-[3px] border-t border-x border-slate-600/80 shadow-2xl shadow-black/95 ring-1 ring-white/10">
                                    {/* Web Camera Dot */}
                                    <div className="flex items-center justify-center pb-0.5">
                                      <span className="w-1 h-1 rounded-full bg-slate-900 border border-slate-700" />
                                    </div>
                                    {/* Screen Glass & Storefront UI */}
                                    <div className="relative rounded-t-md overflow-hidden bg-black aspect-[16/10] border border-white/10">
                                      <img
                                        src="/ippokart/thumbnail.png"
                                        alt="IppoKart Storefront"
                                        className="w-full h-full object-cover object-top select-none"
                                        loading="lazy"
                                      />
                                      {/* Specular glare reflection across the glass */}
                                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07] pointer-events-none" />
                                    </div>
                                  </div>

                                  {/* Laptop Keyboard Base & Hinge */}
                                  <div className="w-[104%] h-2.5 bg-gradient-to-b from-[#242a38] via-[#1a1f2b] to-[#0f1219] rounded-b-lg border-x border-b border-slate-700/90 shadow-xl flex items-start justify-center relative">
                                    {/* Thumb Opening Notch */}
                                    <div className="w-10 h-0.5 bg-slate-500/80 rounded-b" />
                                  </div>

                                  {/* Soft Desk Shadow under laptop */}
                                  <div className="w-[88%] h-2 bg-orange-950/40 blur-sm rounded-full mt-0.5 pointer-events-none" />
                                </div>

                                {/* Floating Screens Count Badge */}
                                <div className="absolute right-2 bottom-1.5 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/95 border border-orange-500/40 text-[9px] font-mono text-orange-300 shadow-lg">
                                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                  <span>{item.screens?.length || 5} Web Views</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#07090e]">
                              <img
                                src={item.featuredImage || item.screens[0].image}
                                alt={item.title}
                                className="w-full h-full object-cover object-top select-none group-hover:scale-[1.02] transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                            </div>
                          )}
                        </div>
                      )}

                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4 min-h-[3rem]">
                        {item.problem}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-brand-400 group-hover:text-brand-300 flex items-center gap-1">
                        <span>{item.sections ? 'Full Case Study' : item.screens ? 'Explore UI & Story' : 'Read story'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                      <div className="flex items-center gap-2">
                        {item.liveUrl && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                            Live Site ↗
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-slate-500">
                          {item.id === 'carezhen' ? 'AI Tool Built' : item.id === 'trackgle' ? 'AI Collaborator' : item.status === 'in-progress' || item.id === 'farm-produce' ? 'In Progress' : 'Production'}
                        </span>
                      </div>
                    </div>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-sm bg-slate-900/40 rounded-2xl border border-slate-800">
            No secondary projects match the selected category filter. Select "All Work" above to view all.
          </div>
        )}
      </div>
    </section>
  );
}
