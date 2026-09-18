import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Users,
  Layers,
  Lightbulb,
  TrendingUp,
  Check,
  Copy,
  ChevronRight,
  ArrowUpRight,
  Printer,
  Calendar,
  Bell,
  Smartphone,
  CheckCircle,
  User,
  AlertCircle,
  Play,
  Pause,
  Cpu,
  UserCheck,
  Globe,
  ZoomIn,
  X,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import BrowserMockup from '../components/mockups/BrowserMockup';
import PhoneMockup from '../components/mockups/PhoneMockup';
import GoyabShowcase from '../components/mockups/GoyabShowcase';
import IppoKartShowcase from '../components/mockups/IppoKartShowcase';
import AIWorkflow from '../components/AIWorkflow';
import NLogo from '../components/icons/NLogo';
import { portfolioData } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

export default function ProjectDetailPage({ projectId, onBack }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCarezhenTab, setActiveCarezhenTab] = useState('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [zoomedIndexWavesScreen, setZoomedIndexWavesScreen] = useState(null);

  // Trackle Interactive State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(142);


  const allProjects = [
    ...(portfolioData.featuredProducts || []),
    ...(portfolioData.secondaryProducts || [])
  ];

  const projectIndex = allProjects.findIndex((p) => p.id === projectId);
  const project = allProjects[projectIndex] || allProjects[0] || {};

  const prevProject = allProjects[(projectIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(projectIndex + 1) % allProjects.length];

  const formatLiveDisplay = (url) => {
    if (!url) return '';
    if (url.includes('play.google.com')) return 'Google Play Store';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  };

  // Scroll to top on project load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setScrollProgress(0);
    setActiveCarezhenTab('all');
  }, [projectId]);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trackle Timer
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Index Waves mobile screens keyboard navigation
  useEffect(() => {
    if (zoomedIndexWavesScreen === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoomedIndexWavesScreen(null);
      if (project.mobileScreens && project.mobileScreens.length > 1) {
        if (e.key === 'ArrowRight') {
          soundFx.playClick();
          setZoomedIndexWavesScreen((prev) => (prev + 1) % project.mobileScreens.length);
        }
        if (e.key === 'ArrowLeft') {
          soundFx.playClick();
          setZoomedIndexWavesScreen((prev) => (prev - 1 + project.mobileScreens.length) % project.mobileScreens.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedIndexWavesScreen, project.mobileScreens]);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  const handleCopyEmail = (e) => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(portfolioData.meta.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { x: 0.5, y: 0.7 },
      colors: ['#8b5cf6', '#10b981', '#38bdf8']
    });
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const isFeatured = Boolean(project.sections);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Dynamic Reading Progress Bar at the very top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-brand-500 via-brand-400 to-cyan-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgb(var(--brand-500))]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Standalone Top Sticky Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-[#0c0e15]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              soundFx.playClick();
              if (onBack) onBack();
              else window.location.hash = '';
            }}
            className="flex items-center gap-2 group flex-shrink-0"
            title="Nirmal Priyadarshan — Home"
          >
            <NLogo size={28} variant="badge" glow={false} />
          </a>

          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              soundFx.playClick();
              if (onBack) onBack();
              else window.location.hash = '#work';
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700/80 transition-all hover:border-brand-500/50 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all products</span>
          </a>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-white font-bold">{project.title}</span>
            <span>·</span>
            <span className="truncate max-w-[240px] text-slate-400">{project.subtitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={() => {
              if (onBack) onBack();
              window.location.hash = '#contact';
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-slate-950 hover:bg-brand-400 hover:text-white text-xs font-bold transition-all shadow-md"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full space-y-16">
        {/* Project Hero Header */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-xs font-semibold text-brand-300">
              {project.tag}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-400">
              {project.role}
            </span>
            {project.status !== 'in-progress' && project.id !== 'farm-produce' && (
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-800/40 font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live in Production</span>
              </span>
            )}
            {project.aiWorkflowSummary && (
              <span className="px-2.5 py-1 rounded-md bg-brand-950/50 border border-brand-800/50 font-mono text-xs text-brand-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>AI-Assisted Workflow</span>
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 font-medium leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>

          {/* Curiosity One-Liner Quote */}
          {project.oneLiner && (
            <div className="p-6 rounded-2xl bg-brand-950/20 border border-brand-800/30 text-base sm:text-lg text-brand-200 leading-relaxed italic border-l-4 border-l-brand-500 shadow-xl">
              "{project.oneLiner}"
            </div>
          )}

          {/* Metadata Grid Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0c1017] border border-slate-800 text-xs shadow-lg">
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-mono block text-[10px] mb-0.5">Role</span>
              <span className="font-semibold text-slate-200">{project.role}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-mono block text-[10px] mb-0.5">Category</span>
              <span className="font-semibold text-slate-200">{project.category}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-mono block text-[10px] mb-0.5">
                {project.liveUrl || project.dashboardUrl ? 'Live Production' : 'Platform'}
              </span>
              <div className="flex flex-col gap-1">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>{formatLiveDisplay(project.liveUrl)}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {project.dashboardUrl && (
                  <a
                    href={project.dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-violet-400 hover:text-violet-300 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>{formatLiveDisplay(project.dashboardUrl)}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                {!project.liveUrl && !project.dashboardUrl && (
                  <span className="font-semibold text-slate-200 font-mono">
                    {project.mockupType === 'phone' ? 'Mobile App' : 'Product Design'}
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-mono block text-[10px] mb-0.5">
                {project.developer ? 'Publisher / Dev' : 'Status'}
              </span>
              {project.developer ? (
                <span className="font-semibold text-white flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{project.developer}</span>
                </span>
              ) : project.status === 'in-progress' || project.id === 'farm-produce' ? (
                <span className="font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>In Progress</span>
                </span>
              ) : (
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Production Shipped</span>
                </span>
              )}
            </div>
          </div>

          {/* Key Production Metrics Bar */}
          {project.keyMetrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-slate-800 shadow-xl">
              {project.keyMetrics.map((metric, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1">
                  <div
                    className="text-2xl sm:text-3xl font-black font-mono tracking-tight"
                    style={{ color: project.accentColor || '#38bdf8' }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    {metric.label}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {metric.sub}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* HERO UI SHOWCASE & BESPOKE INTERACTIVE MOCKUP */}
        {((project.screens && project.screens.length > 0 && project.id !== 'farm-produce') || (project.id === 'farm-produce' && project.mobileScreens && project.mobileScreens.length > 0)) && (
          <section className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Interactive Device Showcase</span>
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400">
                  {project.id === 'farm-produce'
                    ? `${project.mobileScreens?.length || 0} of 20 Mobile Screens`
                    : `${project.screens.length} Live Production Views`}
                </span>
              </div>
            </div>

            {/* Browser Mockup for CareZhen, Layline Campaigns, and IppoBill */}
            {(project.id === 'carezhen' || project.id === 'layline-campaigns' || project.id === 'ippobill' || (project.mockupType === 'browser' && project.id !== 'ippokart')) && project.screens && (
              <BrowserMockup
                screens={project.screens}
                activeScreenIndex={activeCarezhenTab}
                onSelectScreen={setActiveCarezhenTab}
                aspectRatio="aspect-[16/9]"
                showTabs={true}
                allowZoom={true}
                allTabLabel="All Images"
              />
            )}

            {/* Bespoke Interactive Device & Browser Mockup Showcase for IppoKart */}
            {project.id === 'ippokart' && (
              <IppoKartShowcase project={project} />
            )}

          {/* FARM PRODUCE MOBILE UI SCREENS BREAKDOWN (20 SCREENS PROGRESSION) */}
          {project.id === 'farm-produce' && project.mobileScreens && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-slate-800 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                    <Smartphone className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2.5">
                      <span>Mobile UI Screens Breakdown</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                        {project.mobileScreens.length} Screens
                      </span>
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      Direct farm-to-consumer mobile experience designed for regional accessibility, fresh discovery, and instant ordering
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  <span className="text-[11px] font-mono text-slate-300 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    20 Mobile Screens
                  </span>
                </div>
              </div>

              {/* Responsive Grid of Mobile Screen Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
                {project.mobileScreens.map((screen, idx) => (
                  <div
                    key={screen.id || idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-[#0c1017] border border-slate-800/90 hover:border-emerald-500/50 transition-all shadow-xl flex flex-col justify-between group space-y-3"
                  >
                    {/* Phone Mockup Frame */}
                    <div
                      onClick={() => {
                        soundFx.playClick();
                        setZoomedIndexWavesScreen(idx);
                      }}
                      className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800/80 aspect-[9/19] w-full shadow-lg group-hover:border-emerald-500/50 transition-all cursor-pointer flex items-center justify-center"
                      title={`Click to zoom Screen ${screen.number} · ${screen.name}`}
                    >
                      {/* Speaker / Dynamic Notch Pill */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-800 rounded-full z-10 border border-white/10 opacity-70 pointer-events-none" />

                      <img
                        src={screen.image}
                        alt={screen.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />

                      {/* Hover Zoom Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-2 rounded-full bg-slate-900/90 text-white border border-white/20 shadow-xl flex items-center gap-1 text-[11px] font-mono font-medium">
                          <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Zoom</span>
                        </span>
                      </div>
                    </div>

                    {/* Small Screen Explanation Below */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                        <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-800/40">
                          SCREEN {screen.number}
                        </span>
                        {screen.badge && (
                          <span className="text-slate-400 truncate text-[10px]">
                            {screen.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-emerald-300 transition-colors">
                        {screen.name}
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {screen.whatItDoes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Showcase for Index Waves: Dual Mockup Web + Mobile */}
          {project.id === 'index-waves' && project.screens && (
            <div className="space-y-6">
              {/* 1. Dual Mockup (Web + Mobile) */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-4 rounded-2xl bg-[#0c1017] border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded-lg bg-violet-950/80 border border-violet-800/40 text-violet-400">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                        <span>Dual Mockup (Web + Mobile)</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/90 text-violet-300 border border-violet-800/50">
                          Dual-Surface System
                        </span>
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">
                        The Analyst Studio Web Admin Dashboard &amp; Native Mobile Trading Cockpit
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Dual-Sided FinTech Platform
                  </span>
                </div>

                <BrowserMockup
                  screens={project.screens.filter(s => s.id === 'dual-mockup')}
                  aspectRatio="aspect-[16/9]"
                  showTabs={false}
                  allowZoom={true}
                  allTabLabel="Dual Mockup (Web + Mobile)"
                />
              </div>

              {/* 2. Mobile UI Screens Breakdown (Total 10 Screens) */}
              {project.mobileScreens && project.mobileScreens.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-slate-800/80">
                  {/* Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#0c1017] border border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-xl bg-violet-950/80 border border-violet-800/50 text-violet-400">
                        <Smartphone className="w-4 h-4" />
                      </span>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2.5">
                          <span>Mobile UI Screens Breakdown</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-950/90 text-violet-300 border border-violet-800/50">
                            10 Production Mobile Screens
                          </span>
                        </h3>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                          Native mobile surfaces engineered for rapid, glanceable signal execution
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40 shrink-0 self-start sm:self-auto">
                      Production Mobile UI
                    </span>
                  </div>

                  {/* Responsive Grid of Mobile Screen Breakdown Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
                    {project.mobileScreens.map((screen, idx) => (
                      <div
                        key={screen.id || idx}
                        className="p-3.5 sm:p-4 rounded-2xl bg-[#0c1017] border border-slate-800/90 hover:border-violet-500/40 transition-all shadow-xl flex flex-col justify-between group space-y-3"
                      >
                        {/* Mobile Phone Mockup Frame */}
                        <div
                          onClick={() => {
                            soundFx.playClick();
                            setZoomedIndexWavesScreen(idx);
                          }}
                          className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 aspect-[9/19] w-full shadow-lg group-hover:border-violet-500/50 transition-all cursor-pointer flex items-center justify-center"
                          title={`Click to zoom ${screen.name}`}
                        >
                          <img
                            src={screen.image}
                            alt={screen.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                          {/* Hover Zoom Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="p-2 rounded-full bg-slate-900/90 text-white border border-white/20 shadow-xl flex items-center gap-1 text-[11px] font-mono font-medium">
                              <ZoomIn className="w-3.5 h-3.5 text-violet-400" />
                              <span>Zoom</span>
                            </span>
                          </div>
                        </div>

                        {/* Screen Breakdown Text: Small Screen Name & What It Does */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                            <span className="text-violet-400 font-bold px-1.5 py-0.5 rounded bg-violet-950/60 border border-violet-800/40">
                              SCREEN {screen.number}
                            </span>
                            {screen.badge && (
                              <span className="text-slate-400 truncate">
                                {screen.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-violet-300 transition-colors">
                            {screen.name}
                          </h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {screen.whatItDoes}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Goyab Showcase */}
          {project.id === 'goyab' && (
            <div className="space-y-6">
              {project.screens && (
                <GoyabShowcase
                  screens={project.screens}
                  showTabs={true}
                  allowZoom={true}
                  enableFlowView={true}
                />
              )}

              {/* GOYAB SCREEN-BY-SCREEN UI & UX DEEP DIVE */}
              <div className="space-y-6 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-400 font-bold">
                    <Sparkles className="w-4 h-4 text-lime-400" />
                    <span>Screen-by-Screen UI &amp; UX Breakdown (4 Mobile Surfaces)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Screen 1: Smart Reminders */}
                  <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-lime-500/40 transition-colors shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-lime-400 font-bold bg-lime-950/60 px-2.5 py-1 rounded border border-lime-800/40">
                          SCREEN 01 · SMART REMINDERS
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Resurfacing</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Smart Reminders &amp; Resurfacing
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Periodic ambient nudges resurface saved content at the user's chosen rhythm. Unlike traditional bookmark hoarders, Goyab serves exactly one item at a time to prevent choice paralysis.
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Configurable notification window (<span className="text-lime-400 font-medium">8:00 PM evening coffee</span>), cadence selector (Daily vs 2 Days), and instant snooze intervals (5m to 2h) all run 100% on-device.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Design Focus:</span>
                      <span className="text-lime-400 font-semibold">Anti-Overwhelm Resurfacing</span>
                    </div>
                  </div>

                  {/* Screen 2: 1-Tap Capture */}
                  <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-lime-500/40 transition-colors shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-lime-400 font-bold bg-lime-950/60 px-2.5 py-1 rounded border border-lime-800/40">
                          SCREEN 02 · 1-TAP CAPTURE
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Zero Friction</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Save Anything from Any App
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Universal Android share target: capture articles, YouTube videos, Instagram posts, and links from any browser directly into Goyab in under 10 seconds.
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Zero-onboarding architecture guarantees zero drop-off — no account sign-up, no password friction, no cloud paywalls standing between the user and their saved thought.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Design Focus:</span>
                      <span className="text-lime-400 font-semibold">Zero-Latency Intake</span>
                    </div>
                  </div>

                  {/* Screen 3: Save Behaviour */}
                  <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-lime-500/40 transition-colors shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-lime-400 font-bold bg-lime-950/60 px-2.5 py-1 rounded border border-lime-800/40">
                          SCREEN 03 · SAVE BEHAVIOUR
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Workflow Control</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Custom Save Behaviour
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Gives users explicit agency over their capture flow: select <strong className="text-white">'Ask on share (recommended)'</strong> to slide up an optional tagging sheet, or <strong className="text-white">'Quick save'</strong> for zero-tap background saves.
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Includes custom auto-tags, target folder routing, and immediate undo actions to ensure saved items stay structured from day one.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Design Focus:</span>
                      <span className="text-lime-400 font-semibold">User Agency &amp; Speed</span>
                    </div>
                  </div>

                  {/* Screen 4: Cloud Backup */}
                  <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-lime-500/40 transition-colors shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-lime-400 font-bold bg-lime-950/60 px-2.5 py-1 rounded border border-lime-800/40">
                          SCREEN 04 · CLOUD BACKUP
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Privacy First</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Encrypted Cloud Backup
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Local-first data ownership backed up directly to the user's personal Google Drive. End-to-end encrypted so no third-party or Goyab server can read saved content.
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Transparent UI indicators display last synced timestamp, backup file size, and one-tap restore across new Android hardware.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Design Focus:</span>
                      <span className="text-lime-400 font-semibold">Local-First Trust</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CAREZHEN SCREEN-BY-SCREEN UI & UX DEEP DIVE */}
          {project.id === 'carezhen' && (
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Screen-by-Screen UI &amp; UX Breakdown (4 Clinical Surfaces)</span>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect live platform: {formatLiveDisplay(project.liveUrl)}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Screen 1: Dashboard */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                        SCREEN 01 · /dashboard
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Triage Hub</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Hospital Operations Dashboard
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Instant clinical triage: surfaces live OPD &amp; IPD patient volumes, bed occupancy ratios, pending billing summaries, and low-stock drug alerts on first login.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Designed with strict role-based views ensuring receptionists, attending doctors, and pharmacy admins each see only the operational data critical to their shift.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-emerald-400 font-semibold">Hospital Triage &amp; Safety</span>
                  </div>
                </div>

                {/* Screen 2: Patient Directory */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                        SCREEN 02 · /patients
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Family EMR</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Patient Directory &amp; Family Records
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Organizes clinical records into family units with unique UHIDs (Universal Health Identifiers), reducing duplicate records across generations.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Instant search across mobile numbers and patient names with inline visit histories (OPD/IPD visits, prescription count) and 1-click patient registration.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-emerald-400 font-semibold">Rapid Receptionist Retrieval</span>
                  </div>
                </div>

                {/* Screen 3: Pharmacy & Expiry Control */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-emerald-500/50 space-y-3 flex flex-col justify-between shadow-xl shadow-emerald-950/30">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-950 px-2.5 py-1 rounded border border-emerald-600/50">
                        SCREEN 03 · /pharmacy
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold animate-pulse">FEFO Inventory</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Pharmacy &amp; Batch Expiry Control
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Hospital dispensary engine: enforces First-Expiry-First-Out (FEFO) dispensing to eliminate expired medication waste and protect patient clinical safety.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Tracks batch numbers, ₹100.8k live dispensary valuation, automated low-stock warnings, and 30-day near-expiry quarantine queues.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-emerald-400 font-semibold">Zero-Waste Drug Safety</span>
                  </div>
                </div>

                {/* Screen 4: Practice Onboarding */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                        SCREEN 04 · /register
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Compliance Setup</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Practice Setup &amp; DPDP Compliance
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Frictionless medical practice onboarding emphasizing statutory Indian healthcare trust: tenant-isolated database clusters on AWS Mumbai.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Compliant with India's Digital Personal Data Protection (DPDP) Act, automated GST-ready consultation invoice formats, and digital doctor signature seals.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-emerald-400 font-semibold">Regulatory Trust &amp; Privacy</span>
                  </div>
                </div>

                {/* Card 5: Live Product CTA */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-800/50 space-y-3 flex flex-col justify-between shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-bold">
                      <Globe className="w-3.5 h-3.5" />
                      <span>LIVE PRODUCT IN PRODUCTION</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      Explore CareZhen Live
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      CareZhen is live and serving clinics and hospitals. Explore the public marketing site, clinical features, and practice onboarding live at carezhen.com.
                    </p>
                  </div>
                  <div className="pt-3">
                    <a
                      href={project.liveUrl || "https://www.carezhen.com/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md"
                    >
                      <span>Visit https://www.carezhen.com/</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* IPPOBILL SCREEN-BY-SCREEN UI & UX DEEP DIVE */}
          {project.id === 'ippobill' && (
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Screen-by-Screen UI &amp; UX Breakdown (5 Production Surfaces)</span>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect live platform: {formatLiveDisplay(project.liveUrl)}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Screen 1: Dashboard */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                        SCREEN 01 · /dashboard
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Overview</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Operations Dashboard
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Instant liquidity position: <strong className="text-emerald-400 font-semibold">TO RECEIVE</strong> (green incoming) vs <strong className="text-rose-400 font-semibold">TO PAY</strong> (red outgoing) cards give owners immediate cash visibility without digging into ledgers.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      The right column prioritizes <span className="text-amber-400 font-medium">Low Stock Alerts</span> and <span className="text-slate-200 font-medium">Top Selling Products</span> (e.g. Oppo mobile units) so shopkeepers reorder before counter stockouts occur.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-cyan-400 font-semibold">Liquidity &amp; Stock Safety</span>
                  </div>
                </div>

                {/* Screen 2: Add Sale Invoice */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                        SCREEN 02 · /sales/invoice/create
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Billing Flow</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Add Sale Invoice (B2B &amp; Retail)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Intelligent customer search: typing a customer name or mobile number auto-populates past balance and GSTIN without modal interruptions.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Table rows feature in-cell steppers, inline discount selectors (% vs flat ₹), and automated Taxable Value calculations. Persistent bottom bar anchors <strong className="text-white">Save &amp; Print</strong>.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-cyan-400 font-semibold">Zero-Latency Data Entry</span>
                  </div>
                </div>

                {/* Screen 3: POS Mode */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-cyan-500/50 space-y-3 flex flex-col justify-between shadow-xl shadow-cyan-950/30">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-300 font-bold bg-cyan-950 px-2.5 py-1 rounded border border-cyan-600/50">
                        SCREEN 03 · /sales/pos
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold animate-pulse">10-Sec Checkout</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Dedicated POS Counter Mode
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Engineered for high-volume retail rush hours: collapses sidebar navigation to dedicate 100% of the viewport to barcode scanning and bill summary.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Includes walk-in mobile capture, one-touch <strong className="text-white">Cash / Card / UPI</strong> payment selectors, and direct thermal receipt generation with zero preview latency.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-cyan-400 font-semibold">10-Second Point of Sale</span>
                  </div>
                </div>

                {/* Screen 4: Reports */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                        SCREEN 04 · /reports/transactions
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Audits &amp; Ledgers</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Transaction &amp; GST Reports
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Structured directly for Indian tax compliance and Chartered Accountant audits: sub-tabs for Sales, Purchases, Cash/Bank Books, P&amp;L, Cash Flow, and Balance Sheets.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      High-level summary cards display Total Sales, Sales Returns (credit notes), Net Sales, and Balance Due with single-click PDF print and CSV export.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-cyan-400 font-semibold">CA-Ready Tax Compliance</span>
                  </div>
                </div>

                {/* Screen 5: Company Settings */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                        SCREEN 05 · /settings/company
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Branding &amp; Tax</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Company &amp; Compliance Setup
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Company logo upload dynamically watermarks customer invoices and thermal receipts, transforming informal retail shops into trusted brands.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Provides dedicated, validated inputs for Indian <strong className="text-white">GSTIN</strong> and <strong className="text-white">PAN Number</strong>, multi-branch control, and thermal printer layout configurations.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-cyan-400 font-semibold">Brand Identity &amp; Legitimacy</span>
                  </div>
                </div>

                {/* Card 6: Live Product CTA */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-800/50 space-y-3 flex flex-col justify-between shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 font-bold">
                      <Globe className="w-3.5 h-3.5" />
                      <span>LIVE PRODUCT IN PRODUCTION</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      Explore IppoBill Live
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      IppoBill is actively live and serving Indian retail merchants. Explore the public marketing site, product features, and pricing tiers live at ippobill.com.
                    </p>
                  </div>
                  <div className="pt-3">
                    <a
                      href="https://www.ippobill.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-md"
                    >
                      <span>Visit https://www.ippobill.com/</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* IPPOBILL MOBILE APP COMPANION SHOWCASE & DEEP DIVE */}
          {project.id === 'ippobill' && project.mobileScreens && (
            <div className="space-y-10 pt-8 border-t border-slate-800/80">
              {/* Mobile Showcase Header */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0a101d] via-[#090e18] to-[#07090f] border border-cyan-500/30 shadow-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile Companion App · Android &amp; iOS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  IppoBill Mobile — Pocket Kirana Business Intelligence
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Indian shop owners are rarely desk-bound. They roam wholesale mandis, check backroom godowns, handle walk-in inquiries, and dispatch deliveries. The native mobile companion app puts live store sales velocity, real-time ₹14.3L inventory audits, proactive expiry alerts, and native Tamil typography right into the merchant’s pocket.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 font-semibold">
                    5 Native Production Screens
                  </span>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    Vernacular Tamil Script Included
                  </span>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    Live Cloud Sync
                  </span>
                  <a
                    href="https://play.google.com/store/search?q=ippobill&c=apps&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Google Play Live ↗</span>
                  </a>
                </div>
              </div>

              {/* Interactive Phone Mockup */}
              <PhoneMockup
                screens={project.mobileScreens}
                showTabs={true}
                allowZoom={true}
                enableFlowView={true}
                flowTitle="IppoBill Mobile Kirana App — End-to-End User Flow"
                flowSubtitle="Inspect the 5 core mobile surfaces: live sales velocity, regional inventory, mobile billing, non-accountant P&L, and WhatsApp store."
                allTabLabel="All 5 Mobile Screens"
                defaultMode="flow"
              />

              {/* Mobile Screen-by-Screen Detailed Breakdown Grid */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Mobile Screens UX &amp; Architecture Breakdown (5 Mobile Surfaces)</span>
                  </div>
                  <a
                    href="https://play.google.com/store/search?q=ippobill&c=apps&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect on Google Play Store ↗</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Screen 1: Home Dashboard */}
                  <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                          MOBILE 01 · HOME TAB
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">Sales Velocity</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Executive Home Dashboard
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Instant daily pulse: 4-card telemetry grid summarizes <strong className="text-white">Today's Sales</strong>, <strong className="text-white">Orders Today</strong>, <strong className="text-emerald-400">This Week (₹110)</strong> vs last week, and monthly run-rate.
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Features an interactive Category-wise sales donut with toggles between <strong className="text-slate-200">Qty Sold</strong> and <strong className="text-slate-200">Percentage</strong>, plus MTD (Month-to-Date) day-by-day comparison curves.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Design Focus:</span>
                      <span className="text-cyan-400 font-semibold">3-Second Store Pulse</span>
                    </div>
                  </div>

                  {/* Screen 2: Smart Inventory */}
                  <div className="p-6 rounded-3xl bg-[#0c1017] border border-cyan-500/50 space-y-3 flex flex-col justify-between shadow-xl shadow-cyan-950/30">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-300 font-bold bg-cyan-950 px-2.5 py-1 rounded border border-cyan-600/50">
                          MOBILE 02 · INVENTORY TAB
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold animate-pulse">Regional Fonts</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Smart Inventory &amp; Expiry Control
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Live capital audit: displays <strong className="text-white">₹14.3 Lakhs</strong> total stock valuation across 83 items, with high-priority <span className="text-rose-400 font-semibold">1 Low Stock Alert</span> and <span className="text-rose-400 font-semibold">54 Expiry Alerts</span> to eliminate spoilage losses in grocery &amp; FMCG.
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-cyan-300">Vernacular Tamil Typography:</strong> Full native script rendering for local goods (<em className="text-slate-200 not-italic font-semibold">நாட்டுசர்க்கரை 10 KG BOX</em>, <em className="text-slate-200 not-italic font-semibold">நாட்டு கருப்பட்டி 10KG BOX</em>) removes language intimidation for traditional merchants. Includes floating 1-tap Cloud Sync and quick item creation FABs.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Design Focus:</span>
                      <span className="text-cyan-400 font-semibold">Kirana Vernacular Ergonomics</span>
                    </div>
                  </div>

                  {/* Screen 3: Sales Invoices */}
                  <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                          MOBILE 03 · SALES TAB
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Spot Invoicing</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Sales Invoices &amp; Branch Hub
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Mobile billing command: top header features quick branch switcher (<strong className="text-white">Main Branch / Abc Store</strong>) and calendar date range selector (<strong className="text-white">This Month</strong>).
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Zero-state vector illustrations communicate status clearly, while the high-contrast blue <strong className="text-white">+</strong> button lets owners draft, calculate GST, and issue invoices directly from delivery vehicles or client premises.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Design Focus:</span>
                      <span className="text-cyan-400 font-semibold">On-The-Move Billing</span>
                    </div>
                  </div>

                  {/* Screen 4: Real-Time P&L */}
                  <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                          MOBILE 04 · P &amp; L TAB
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Margin Telemetry</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Real-Time Profit &amp; Loss Margins
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        No CA jargon: translates complex corporate accounting into actionable retail mechanics. Interactive accordions display <strong className="text-emerald-400">Total Sales</strong>, <strong className="text-white">Product Profit Analysis</strong>, and <strong className="text-cyan-300">Inventory Margin</strong>.
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Calculates real spread: <strong className="text-slate-200">Total Revenue (Selled Price)</strong> minus <strong className="text-rose-400">Cost of Goods (Purchased Price)</strong> minus <strong className="text-rose-400">Sales Returns</strong> = True Net Margin in real-time.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Design Focus:</span>
                      <span className="text-cyan-400 font-semibold">Non-Accountant Financial Literacy</span>
                    </div>
                  </div>

                  {/* Screen 5: Store Admin & WhatsApp Storefront */}
                  <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                          MOBILE 05 · MORE TAB
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">D2C eCommerce</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Store Operations &amp; Online Storefront
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Full merchant hub: structured sections for <strong className="text-white">Business</strong> (Company Profile, Parties Khata directory for customers/suppliers, Product &amp; Service catalogs, Expense tracker).
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-cyan-300">Online Storefront Engine:</strong> Enables any traditional physical shop to publish an online catalog, generate a WhatsApp-shareable store link, and manage incoming <strong className="text-white">Online Orders</strong> with zero aggregator commission fees.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                      <span>Design Focus:</span>
                      <span className="text-cyan-400 font-semibold">D2C Digital Transformation</span>
                    </div>
                  </div>

                  {/* Omnichannel Synergy Card */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-800/50 space-y-3 flex flex-col justify-between shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>OMNICHANNEL ARCHITECTURE</span>
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        Web POS + Mobile App Synergy
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        The web application anchors high-velocity counter checkouts with barcode guns, thermal printing, and CA audit exports. The mobile app gives the owner 24/7 handheld supervision, godown stock counts, and instant WhatsApp storefront distribution.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-cyan-800/40 text-[11px] font-mono text-cyan-300 flex items-center justify-between">
                      <span>Cloud Data Parity:</span>
                      <span className="font-bold">100% Real-Time Sync</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* TRACKLE SCREEN-BY-SCREEN UI & UX DEEP DIVE */}
          {project.id === 'trackle' && (
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Screen-by-Screen UI &amp; UX Breakdown (5 Production Surfaces)</span>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect live platform: {formatLiveDisplay(project.liveUrl)}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Screen 1: Dashboard */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-purple-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/40">
                        SCREEN 01 · /dashboard
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Telemetry Hub</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      My Dashboard &amp; Live Time Tracking
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Personalized engineering command: top KPI indicators give immediate visibility into workload (<strong className="text-white">3 To Do</strong>, <strong className="text-blue-400">5 In Progress</strong>, <strong className="text-purple-400">0 Functional Review</strong>, <strong className="text-rose-400">5 Overdue</strong>).
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Features a weekly time-tracking bar chart (Sep 7–13, displaying up to 8.5h/day) and a sticky active timer (<strong className="text-white">00:26:01</strong> tracking Corporate / Stock Learn App) with a 1-tap Stop and quick task switcher prompt.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-purple-400 font-semibold">Zero-Friction Daily Logging</span>
                  </div>
                </div>

                {/* Screen 2: Task Status */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-purple-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/40">
                        SCREEN 02 · /task-status
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Execution Matrix</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Task Status &amp; Sprint Execution
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Dense, readable sprint table with quick tabs (<strong className="text-white">Open 8</strong>, <strong className="text-rose-400">Overdue 5</strong>, <strong className="text-slate-400">Closed 0</strong>) and high-contrast priority chips (<span className="text-rose-400 font-medium">Expedite</span>, <span className="text-amber-400 font-medium">High</span>, <span className="text-cyan-400 font-medium">Medium</span>).
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Captures task title, workflow state dropdown, multi-user assignee avatars, requester credit, and due dates, with instant <strong className="text-white">List</strong> vs <strong className="text-white">Board</strong> view switching.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-purple-400 font-semibold">Ergonomic Task Scanning</span>
                  </div>
                </div>

                {/* Screen 3: Projects */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-purple-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/40">
                        SCREEN 03 · /projects
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Portfolio Hub</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Multi-Project Portfolio Delivery
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Multi-tenant client delivery tracking: cards for <strong className="text-white">Corporate</strong> (Progress 6/34, 18%) and <strong className="text-white">WavicleHub</strong> (Progress 7/10, 70%) with live completion bars.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Includes team member avatar clusters (+27 contributors), active status indicators, and delivery timeline ranges (e.g. 1/1/2026 – 7/1/2026) for organizational leadership.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-purple-400 font-semibold">Delivery Transparency</span>
                  </div>
                </div>

                {/* Screen 4: Leave Tracker */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-purple-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/40">
                        SCREEN 04 · /leave-tracker
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Internal HR</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Leave Tracker &amp; Team Bandwidth
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Eliminates disconnected HR portals: team members check leave quota assignments and submit PTO requests right inside their engineering workspace.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Categorizes requests into <strong className="text-white">Pending</strong> and <strong className="text-white">Completed</strong> tabs, feeding directly into sprint capacity planning so leads never over-commit team velocity.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-purple-400 font-semibold">Connected Team Operations</span>
                  </div>
                </div>

                {/* Screen 5: Settings */}
                <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-purple-500/40 transition-colors shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800/40">
                        SCREEN 05 · /settings
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Identity &amp; Role</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Employee Identity &amp; Role Hierarchy
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      User profile management anchoring Nirmal Priyadarshan M V as <strong className="text-white">UI/UX Designer</strong> (Employee Role) at J7 Technology.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Surfaces reporting lines (Reporting Manager: Deva J), phone and corporate email credentials, plus integrated self-service security &amp; password change modules.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Design Focus:</span>
                    <span className="text-purple-400 font-semibold">Role-Based System Access</span>
                  </div>
                </div>

                {/* Card 6: Live Product CTA */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-800/50 space-y-3 flex flex-col justify-between shadow-lg">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400 font-bold">
                      <Globe className="w-3.5 h-3.5" />
                      <span>LIVE ENTERPRISE PLATFORM IN PRODUCTION</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      Explore Trackle (TaskFlow) Live
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Trackle is actively live in production and powering daily task execution at J7 Technology. Experience real-time task management, in-header stopwatches, and project portfolios live at trackgle.jseven.in.
                    </p>
                  </div>
                  <div className="pt-3">
                    <a
                      href="https://trackgle.jseven.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md"
                    >
                      <span>Visit https://trackgle.jseven.in/</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Index Waves Bespoke Authentic Case Study Showcase */}
          {project.id === 'index-waves' && (
            <div className="space-y-10">
              {/* THE ANALYST STUDIO WEB DASHBOARD (PRODUCTION BROADCAST ENGINE) */}
              <div className="bg-[#0c1017] p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-bold uppercase tracking-wider">
                      <Layers className="w-4 h-4 text-violet-400" />
                      <span>The Analyst Studio · Shipped Production Web Dashboard</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                      The institutional web console where certified SEBI research analysts curate, calculate, and broadcast verified trading calls to active mobile traders in real time.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800/50 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Production UI
                    </span>
                    <a
                      href="https://dashboard.indexwaves.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-violet-300 hover:text-white bg-violet-950/80 hover:bg-violet-900/80 px-2.5 py-1 rounded border border-violet-800/50 flex items-center gap-1.5 transition-colors"
                      title="Visit Live Dashboard"
                    >
                      <span>dashboard.indexwaves.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Dashboard Image inside a Chrome Browser Frame */}
                <div className="rounded-2xl border border-slate-800 bg-[#080b10] overflow-hidden shadow-2xl group">
                  {/* macOS / Chrome Window Bar */}
                  <div className="px-4 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <a
                        href="https://dashboard.indexwaves.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-[11px] transition-colors group/link"
                        title="Open dashboard.indexwaves.com"
                      >
                        <span className="text-emerald-400">🔒</span>
                        <span className="text-slate-300 group-hover/link:text-white transition-colors">dashboard.indexwaves.com</span>
                        <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover/link:text-violet-400" />
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                      <span className="hidden md:inline text-slate-500">Live Session: September 12, 2026 · 5:18 PM</span>
                      <span className="text-violet-400 font-semibold bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/40">
                        Institutional Grade
                      </span>
                    </div>
                  </div>

                  {/* High-Res Production Screenshot */}
                  <div className="relative bg-slate-950 overflow-hidden">
                    <img
                      src="/index-waves/admin-dashboard.png"
                      alt="Index Waves Analyst Studio Production Admin Dashboard"
                      className="w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.01]"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* 2-COLUMN ARCHITECTURAL DEEP DIVE OF THE PRODUCTION CONSOLE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {/* Column 1: Create Call Engine */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#080b10] border border-slate-800 space-y-4 flex flex-col justify-between hover:border-violet-500/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-violet-400 font-bold bg-violet-950/60 px-2.5 py-0.5 rounded border border-violet-800/40">
                          01 · SIGNAL DISPATCHER
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Left Rail Form</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        6-Field Structured Call Generator
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Replaced unstructured, typo-prone WhatsApp group text messages with a rigid, foolproof input console:
                      </p>
                      <ul className="space-y-2 text-xs sm:text-[13px] text-slate-400 font-mono">
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>Direction Toggle: <strong className="text-slate-200">BUY / SELL</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>Quantitative Inputs: <strong className="text-slate-200">Entry, Target 1, Target 2, Stop Loss</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>Automated Math: <strong className="text-emerald-400">Profit Potential (%)</strong> computed dynamically</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-violet-400 font-bold">✓</span>
                          <span>1-Tap Action: <strong className="text-violet-300">Solid 'Send' CTA</strong> broadcasts in real time</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500">
                      Eliminates fat-finger typing errors during 9:15 AM opening bells.
                    </div>
                  </div>

                  {/* Column 2: Recent Calls Telemetry Feed */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#080b10] border border-slate-800 space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
                          02 · LIFECYCLE TELEMETRY
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Right Multi-Tab Feed</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        Real-Time Target Hit &amp; Audit Trail
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Instant status segregation across <strong className="text-white">All</strong>, <strong className="text-white">Open</strong>, and <strong className="text-white">Closed</strong> trade signals with automated audit logs:
                      </p>
                      <div className="space-y-2.5 text-[11px] sm:text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="font-semibold">MIDCPNIFTY 14600 CE</span>
                          <span className="text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded text-[10px]">Closed (16.67%)</span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-emerald-400 flex items-center gap-1.5">
                          <span>✓ Target 1: 11:44 AM · ✓ Target 2: 2:04 PM</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800/60">
                          <span className="font-semibold">MIDCPNIFTY 14900 CE</span>
                          <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded text-[10px]">Open (21.43%)</span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-violet-300 flex items-center justify-between">
                          <span>✓ T1 Hit: 2:35 PM</span>
                          <span className="text-amber-400 font-semibold">[ Close Call ] Emergency Button</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500">
                      1-tap kill switch enables immediate capital preservation.
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. OUTCOMES & VERIFIED REVIEWS */}
              <div className="bg-[#0c1017] p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Outcomes &amp; Verified Reviews · Shipped on Google Play</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Production metrics and authentic reviews from active traders on Google Play.
                    </p>
                  </div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.IndexWaves&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                  >
                    <span>View on Google Play</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="text-3xl sm:text-4xl font-mono font-black text-amber-400 flex items-center justify-center gap-1">
                      <span>4.2</span>
                      <span className="text-lg">★</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Google Play</div>
                    <p className="text-[11px] text-slate-400 font-mono">15 trader reviews</p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="text-3xl sm:text-4xl font-mono font-black text-violet-400">500+</div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Downloads</div>
                    <p className="text-[11px] text-slate-400 font-mono">Organic Android installs</p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-400">80-90%</div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Signal Accuracy</div>
                    <p className="text-[11px] text-slate-400 font-mono">Trader-verified win rate</p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="text-3xl sm:text-4xl font-mono font-black text-cyan-400">&lt;1.8s</div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Decision Speed</div>
                    <p className="text-[11px] text-slate-400 font-mono">Sub-2s execution latency</p>
                  </div>
                </div>

                {/* 3 Real User Reviews */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#080b10] border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-white">Suba M</div>
                        <div className="text-amber-400 text-xs font-mono tracking-tighter">★★★★★</div>
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "Hi Sir , Im following ur app for recent days. First of all app appearance is so good and well. Intraday calls are excellent with good Accuracy . Am really very impressive with this app .Keep it up Guys 👍👍"
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                      2 July 2025 · Google Play Review
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#080b10] border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-white">Pakiya Muthu</div>
                        <div className="text-amber-400 text-xs font-mono tracking-tighter">★★★★★</div>
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "App Is Good and Well , and accuracy is also Good . Almost 80-90% accurate. This App is very much Useful For Beginners and part time Traders . Moreover it suitable for all type of traders . Especially For Beginners, learning column definitely will use for improve their Knowledge."
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                      3 July 2025 · Google Play Review
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#080b10] border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-white">Sumathi Pitchandi</div>
                        <div className="text-amber-400 text-xs font-mono tracking-tighter">★★★★★</div>
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "It's one of the best application options given in the app are mostly working for me.out of almost 5 options given daily,3 to 4 always book good profits........🤩🤩"
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                      9 August 2025 · Google Play Review
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. KEY DECISION: WHY WE KILLED SOCIAL & COMMENTS */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/30 via-slate-900 to-[#0c1017] border border-violet-800/40 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest font-bold">
                  <Lightbulb className="w-4 h-4 text-violet-400" />
                  <span>Key Design Decision · Why We Killed Social &amp; Comments Completely</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white">
                  Preventing Emotional FOMO &amp; Revenge Trading by Design
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  The founder originally requested an in-app social feed where users could comment on trade signals, post their P&amp;L screenshots, and chat in real-time. I strongly advised against it.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#080b10] border border-rose-900/40 space-y-1.5 text-xs font-mono text-slate-300">
                    <span className="text-rose-400 font-bold block">The Social Trading Trap:</span>
                    <p className="text-slate-400 leading-relaxed">
                      Seeing other users' oversized profits triggers intense FOMO and greed. Seeing panic reactions when a trade dips triggers premature exits. In trading, social proof directly destroys psychological discipline.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#080b10] border border-emerald-900/40 space-y-1.5 text-xs font-mono text-slate-300">
                    <span className="text-emerald-400 font-bold block">The 100% Broadcast Choice:</span>
                    <p className="text-slate-400 leading-relaxed">
                      By keeping the app strictly broadcast-only, traders treat signals as objective mathematical probabilities rather than emotional chat discussions, resulting in higher discipline and significantly lower churn.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. FUTURE HORIZONS ROADMAP */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-300 uppercase tracking-widest font-bold">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span>Future Product Horizons · Three Things I Would Build Next</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#080b10] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-violet-400 font-bold block">01 · 1-Tap Broker APIs</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Direct OAuth integration with Zerodha, Upstox, and Angel One APIs to execute orders with 1 tap, eliminating copy-paste slippage entirely.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#080b10] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold block">02 · Voice Callout Alerts</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Instant audio voice synthesis ("Index Waves: Nifty Buy at 22400") for active multi-screen day traders who cannot watch their phone.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#080b10] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold block">03 · Public Audit Ledger</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Cryptographically signed, unalterable historical ledger of past signals and hit rates to set a new benchmark for trust in retail fintech.
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 italic font-mono text-center">
                  "Designing for financial products taught me that speed and clarity aren't just aesthetic choices — they directly determine whether a user makes or loses money."
                </div>
              </div>
            </div>
          )}


        </section>
        )}

        {/* 11-STEP FULL CASE STUDY NARRATIVE (Featured Products) */}
        {isFeatured && project.sections ? (
          <div className="space-y-16 pt-8 border-t border-slate-800">
            {/* Step 01: The Product */}
            {project.sections.product && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 uppercase tracking-widest font-bold">
                  <span>{project.sections.product.title || "01 — The Product"}</span>
                </div>
                <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                  {project.sections.product.content?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Step 02: The Problem */}
            {project.sections.problem && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 uppercase tracking-widest font-bold">
                  <span>{project.sections.problem.title || "02 — The Problem"}</span>
                </div>
                <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                  {project.sections.problem.content?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Step 03: The Users */}
            {project.sections.users && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 uppercase tracking-widest font-bold">
                  <span>{project.sections.users.title || "03 — The Users"}</span>
                </div>
                <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                  {project.sections.users.content?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Step 04: Product Thinking */}
            {project.sections.productThinking && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 uppercase tracking-widest font-bold">
                  <span>{project.sections.productThinking.title || "04 — Product Thinking"}</span>
                </div>
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1017] border border-slate-800 space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed shadow-lg">
                  {project.sections.productThinking.content?.map((p, idx) => (
                    <p key={idx} className={idx === 0 ? "text-white font-medium text-lg sm:text-xl" : ""}>
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Step 05: UX Architecture */}
            {project.sections.ux && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 uppercase tracking-widest font-bold">
                  <span>{project.sections.ux.title || "05 — UX Architecture & User Flows"}</span>
                </div>
                <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                  {project.sections.ux.content?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Step 06: UI Design */}
            {project.sections.ui && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 uppercase tracking-widest font-bold">
                  <span>{project.sections.ui.title || "06 — UI Design & Design System"}</span>
                </div>
                <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                  {project.sections.ui.content?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Step 07: AI-Assisted Workflow (Embedded AIWorkflow Component) */}
            {project.sections.aiWorkflow && (
              <section className="space-y-6 pt-4">
                <AIWorkflow
                  title={project.sections.aiWorkflow.title || "07 — AI-Assisted Workflow"}
                  summary={project.sections.aiWorkflow.summary}
                  comparison={project.sections.aiWorkflow.comparison}
                />
              </section>
            )}

            {/* Step 08: Prototype */}
            {project.sections.prototype && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 uppercase tracking-widest font-bold">
                  <span>{project.sections.prototype.title || "08 — Interactive Prototype"}</span>
                </div>
                <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                  {project.sections.prototype.content?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Step 09: Build & AI-Assisted Delivery */}
            {project.sections.build && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 uppercase tracking-widest font-bold">
                  <span>{project.sections.build.title || "09 — AI-Assisted Building & Delivery"}</span>
                </div>
                <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-800/30 text-slate-300 text-base sm:text-lg leading-relaxed space-y-3">
                  {project.sections.build.content?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Step 10: Final Product & Impact */}
            {project.sections.finalProduct && (
              <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-800/40 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>{project.sections.finalProduct.title || "10 — Final Product & Impact"}</span>
                </div>
                <div className="space-y-3 text-slate-200 text-base sm:text-lg leading-relaxed">
                  {project.sections.finalProduct.content?.map((p, idx) => (
                    <p key={idx} className="font-medium">{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Step 11: Learnings & Next Steps */}
            {project.sections.learnings && (
              <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-300 uppercase tracking-widest font-bold">
                  <Lightbulb className="w-4 h-4 text-brand-400" />
                  <span>{project.sections.learnings.title || "11 — Learnings & Next Steps"}</span>
                </div>
                <div className="space-y-3 text-slate-300 text-base leading-relaxed">
                  {project.sections.learnings.content?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          /* Shorter Case Studies Narrative (Farm Produce, Layline, Setter, Index Waves, IppoKart) */
          <div className="space-y-8 pt-8 border-t border-slate-800">
            {project.problem && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                  01 — The Problem
                </h4>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {project.designed && (
              <div className="space-y-3 p-6 sm:p-8 rounded-3xl bg-[#0c1017] border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold">
                  02 — What I Designed
                </h4>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {project.designed}
                </p>
              </div>
            )}

            {project.keyDecision && (
              <div className="space-y-3 p-6 sm:p-8 rounded-3xl bg-brand-950/25 border border-brand-800/40">
                <h4 className="text-xs font-mono uppercase tracking-widest text-brand-300 font-bold flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-brand-400" />
                  <span>03 — Key Product Decision</span>
                </h4>
                <p className="text-sm sm:text-base text-brand-100 leading-relaxed">
                  {project.keyDecision}
                </p>
              </div>
            )}
          </div>
        )}

        {/* PAGINATION: NEXT & PREVIOUS PROJECT NAVIGATOR */}
        <section className="pt-12 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Previous Project */}
          <a
            href={`#/project/${prevProject.id}`}
            onClick={() => soundFx.playClick()}
            className="p-6 rounded-3xl bg-[#0c1017] hover:bg-[#111722] border border-slate-800/80 hover:border-brand-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1 mb-2 group-hover:text-brand-400 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Product</span>
              </span>
              <h4 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                {prevProject.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                {prevProject.subtitle}
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-4 block">
              {prevProject.tag?.split('·')[0].trim()}
            </span>
          </a>

          {/* Next Project */}
          <a
            href={`#/project/${nextProject.id}`}
            onClick={() => soundFx.playClick()}
            className="p-6 rounded-3xl bg-[#0c1017] hover:bg-[#111722] border border-slate-800/80 hover:border-brand-500/50 transition-all flex flex-col justify-between text-right group"
          >
            <div>
              <span className="text-xs font-mono text-slate-500 flex items-center justify-end gap-1 mb-2 group-hover:text-brand-400 transition-colors">
                <span>Next Product</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <h4 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                {nextProject.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                {nextProject.subtitle}
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-4 block">
              {nextProject.tag?.split('·')[0].trim()}
            </span>
          </a>
        </section>

        {/* BOTTOM CONTACT CALLOUT */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0e1118] to-[#07090e] border border-white/10 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>LET'S BUILD SOMETHING</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Have an idea worth building?
          </h3>

          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Whether you're building a new product, improving an existing experience, or exploring what AI can do for your product — let's talk.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-slate-950 hover:bg-brand-400 hover:text-white font-bold text-xs transition-all shadow-md"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-700" />
                  <span>{portfolioData.meta.email}</span>
                </>
              )}
            </button>

            <a
              href={portfolioData.meta.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-semibold text-xs transition-all"
            >
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>

      {/* Lightbox Modal for Index Waves Mobile Screens */}
      <AnimatePresence>
        {zoomedIndexWavesScreen !== null && project.mobileScreens && project.mobileScreens[zoomedIndexWavesScreen] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setZoomedIndexWavesScreen(null)}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setZoomedIndexWavesScreen(null)}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white border border-white/10 transition-colors shadow-2xl"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left navigation arrow */}
            {project.mobileScreens.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundFx.playClick();
                  setZoomedIndexWavesScreen((prev) => (prev - 1 + project.mobileScreens.length) % project.mobileScreens.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 shadow-2xl transition-all hover:scale-105"
                title="Previous Screen (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Right navigation arrow */}
            {project.mobileScreens.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundFx.playClick();
                  setZoomedIndexWavesScreen((prev) => (prev + 1) % project.mobileScreens.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 shadow-2xl transition-all hover:scale-105"
                title="Next Screen (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Centered screen content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-sm max-h-[90vh] flex flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-750 bg-slate-950 shadow-2xl max-h-[75vh]">
                <img
                  src={project.mobileScreens[zoomedIndexWavesScreen].image}
                  alt={project.mobileScreens[zoomedIndexWavesScreen].name}
                  className="w-auto h-full max-h-[75vh] object-contain"
                />
              </div>

              <div className="text-center space-y-1 bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-white/10 max-w-sm backdrop-blur-md shadow-xl">
                <div className={`flex items-center justify-center gap-2 text-xs font-mono font-bold ${project.id === 'farm-produce' ? 'text-emerald-400' : 'text-violet-400'}`}>
                  <span>SCREEN {project.mobileScreens[zoomedIndexWavesScreen].number}</span>
                  <span>·</span>
                  <span className="text-white">{project.mobileScreens[zoomedIndexWavesScreen].name}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {project.mobileScreens[zoomedIndexWavesScreen].whatItDoes}
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-0.5">
                  {zoomedIndexWavesScreen + 1} of {project.mobileScreens.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
