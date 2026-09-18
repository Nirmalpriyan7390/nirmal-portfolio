import React from 'react';
import { Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ExperienceSection() {
  const experiences = portfolioData.experience || [
    {
      role: 'Product Designer',
      company: 'J7 Technology Solutions Pvt Ltd- Alangulam',
      period: 'Mar 2025 - Present',
      isCurrent: true
    },
    {
      role: 'Product Designer',
      company: 'J7 Technology Solutions Pvt Ltd- Alangulam',
      period: 'Mar 2024 - Mar 2025',
      isCurrent: false
    }
  ];

  return (
    <section id="experience" className="py-20 sm:py-24 border-t border-white/[0.06] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-brand-400" />
            <span>WORK HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            My professional career as a Product Designer crafting production web and mobile software.
          </p>
        </div>

        {/* Experience List matching the exact clean layout */}
        <div className="border-t border-slate-800/80 divide-y divide-slate-800/80">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-8 group hover:bg-white/[0.02] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl transition-colors duration-200"
            >
              {/* Role (Left Column) */}
              <div className="sm:w-1/3 flex items-center gap-2">
                <span className="text-base sm:text-lg text-slate-300 font-medium group-hover:text-white transition-colors">
                  {exp.role.includes('(Internship)') ? (
                    <>
                      {exp.role.replace('(Internship)', '').trim()}{' '}
                      <span className="text-slate-400 font-normal text-sm sm:text-base">(Internship)</span>
                    </>
                  ) : (
                    exp.role
                  )}
                </span>
                {exp.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Present
                  </span>
                )}
              </div>

              {/* Company & Period (Right Column) */}
              <div className="sm:w-2/3 flex flex-col sm:items-end sm:text-right">
                <span className="text-base sm:text-lg text-white font-semibold tracking-tight group-hover:text-brand-300 transition-colors">
                  {exp.company}
                </span>
                <span className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                  {exp.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
