import React from 'react';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';
import { soundFx } from '../utils/soundEffects';

export default function CaseStudyCard({ study }) {
  const renderInteractivePreview = (id) => {
    const fallbackImage =
      id === 'index-waves'
        ? '/index-waves/thumbnail-dual.png?v=2'
        : `/${id}/thumbnail-mockup.png?v=1`;
    const image = study.featuredImage || fallbackImage;

    return (
      <div className="bg-[#080b10] p-2 sm:p-2.5 rounded-2xl border border-slate-800/90 shadow-xl">
        <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-[16/9] bg-slate-950 group/screen">
          <img
            src={image}
            alt={`${study.title} Professional Mockup`}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/screen:scale-[1.02]"
          />
        </div>
      </div>
    );
  };

  return (
    <TiltCard maxTilt={5} glareOpacity={0.1} className="h-full">
      <article className="group relative bg-[#0c1017] hover:bg-[#0e131d] rounded-3xl border border-slate-800/80 hover:border-brand-500/50 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl hover:shadow-2xl">
        <div>
          {/* Tag & Role */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-xs font-medium text-brand-300">
              {study.tag}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {study.role}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 group-hover:text-brand-300 transition-colors">
            {study.title}
          </h3>
          <p className="text-sm sm:text-base font-medium text-slate-300 mb-5 leading-snug">
            {study.subtitle}
          </p>

          {/* Curiosity One-Liner */}
          {study.oneLiner && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-5 text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-l-brand-500">
              "{study.oneLiner}"
            </div>
          )}

          {/* Interactive Simulation Widget */}
          <div className="mb-5">
            {renderInteractivePreview(study.id)}
          </div>

          {/* AI Workflow Summary Pill */}
          {study.aiWorkflowSummary && (
            <div className="mb-6 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span className="truncate">{study.aiWorkflowSummary}</span>
            </div>
          )}
        </div>

        {/* Footer Link & Live URL */}
        <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/40 px-2.5 py-1 rounded-lg transition-colors"
                title={`Visit live: ${study.liveUrl}`}
              >
                <Globe className="w-3 h-3" />
                <span>{study.liveUrl.includes('play.google.com') ? 'Google Play ↗' : 'Live Site ↗'}</span>
              </a>
            )}
          </div>
          <a
            href={`#/project/${study.id}`}
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-brand-600 px-4 py-2 rounded-xl border border-slate-700 hover:border-brand-500 transition-all duration-200 shadow group/btn"
          >
            <span>Read Study</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </article>
    </TiltCard>
  );
}
