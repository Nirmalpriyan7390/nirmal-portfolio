import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIDo from './components/WhatIDo';
import CaseStudyCard from './components/CaseStudyCard';
import AIWorkflow from './components/AIWorkflow';
import ProductThinking from './components/ProductThinking';
import MoreWorkGrid from './components/MoreWorkGrid';
import ExperienceSection from './components/ExperienceSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackgroundAura from './components/BackgroundAura';
import CustomCursor from './components/CustomCursor';
import InteractiveDock from './components/InteractiveDock';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { portfolioData } from './data/portfolioData';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('nirmal_theme') || 'emerald';
  });
  // Full-page route state: { page: 'home' } or { page: 'project', id: 'carezhen' }
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/project/')) {
      return { page: 'project', id: hash.replace('#/project/', '') };
    }
    const rawId = hash.replace('#', '');
    const allProjects = [
      ...(portfolioData.featuredProducts || []),
      ...(portfolioData.secondaryProducts || [])
    ];
    if (rawId && allProjects.some((p) => p.id === rawId)) {
      return { page: 'project', id: rawId };
    }
    return { page: 'home' };
  });

  // Dynamically sync theme to document.documentElement and body
  useEffect(() => {
    const themeClasses = ['theme-purple', 'theme-emerald', 'theme-cyan', 'theme-amber'];
    document.documentElement.classList.remove(...themeClasses);
    document.documentElement.classList.add(`theme-${currentTheme}`);
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-mode', 'dark');
    document.documentElement.style.colorScheme = 'dark';
    if (document.body) {
      document.body.classList.remove(...themeClasses);
      document.body.classList.add(`theme-${currentTheme}`);
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      document.body.setAttribute('data-theme', currentTheme);
      document.body.setAttribute('data-mode', 'dark');
    }
    localStorage.setItem('nirmal_theme', currentTheme);
    localStorage.removeItem('nirmal_color_mode');
  }, [currentTheme]);

  // Sync hash routing on load & hashchange
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const id = hash.replace('#/project/', '');
        setCurrentRoute({ page: 'project', id });
        return;
      }
      const rawId = hash.replace('#', '');
      const allProjects = [
        ...(portfolioData.featuredProducts || []),
        ...(portfolioData.secondaryProducts || [])
      ];
      if (rawId && allProjects.some((p) => p.id === rawId)) {
        setCurrentRoute({ page: 'project', id: rawId });
        return;
      }
      setCurrentRoute({ page: 'home' });
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  const featuredList = portfolioData.featuredProducts || [];

  return (
    <div
      data-theme={currentTheme}
      className={`relative min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden theme-${currentTheme}`}
    >
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Background Aura & Spotlight */}
      <BackgroundAura />

      {/* Conditional Full-Page View */}
      {currentRoute.page === 'project' ? (
        <ProjectDetailPage
          projectId={currentRoute.id}
          onBack={() => {
            soundFx.playClick();
            window.location.hash = '#work';
          }}
        />
      ) : (
        <>
          {/* Floating Capsule Header */}
          <Navbar />

          {/* Main Content Flow */}
          <main className="flex-1 relative z-10">
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. What I Do (4 Pillars) */}
            <WhatIDo />

            {/* 3. Selected Work (6 Primary Featured Products: IppoBill, Carezhen, Goyab, Trackle, Index Waves, Setter) */}
            <section id="work" className="py-24 border-t border-white/[0.06] relative">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                      <span>SELECTED WORK</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      Products in <span className="font-serif italic font-normal text-brand-300">Production</span>
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                      Real products built with AI-assisted workflows, product thinking, and end-to-end craft.
                    </p>
                  </div>

                  <div className="text-xs font-mono text-slate-400 hidden sm:block">
                    6 Highlighted Products · Live in Production
                  </div>
                </div>

                {/* 6 Shipped Case Study Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredList.map((study) => (
                    <CaseStudyCard
                      key={study.id}
                      study={study}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. More Shipped Work (Secondary Shipped Products: Farm Produce, Layline Campaigns, IppoKart) */}
            <MoreWorkGrid activeCategory={activeCategory} />

            {/* 5. How I Design with AI (8-Stage Pipeline + AI vs Designer Comparison) */}
            <AIWorkflow />

            {/* 6. Product Thinking ("More than UI" - 6 Core Questions) */}
            <ProductThinking />

            {/* 7. Experience (UI/UX & Product Designer Career History) */}
            <ExperienceSection />

            {/* 11. About Nirmal ("Designer. Builder. AI explorer.") */}
            <AboutSection />

            {/* 11. Contact ("Have an idea worth building?") */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Interactive Bottom Dock: Sound & Theme Accent Switcher */}
      <InteractiveDock
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />
    </div>
  );
}
