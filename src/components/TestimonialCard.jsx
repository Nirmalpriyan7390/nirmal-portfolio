import React from 'react';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import TiltCard from './TiltCard';

export default function TestimonialCard() {
  return (
    <section className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>CLIENT PROOF &amp; TRUST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Trusted by <span className="font-serif italic font-normal text-brand-300">Product Teams</span>
          </h2>
        </div>

        <TiltCard maxTilt={5}>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0e1118]/90 border border-white/[0.08] shadow-2xl relative overflow-hidden">
            <Quote className="w-16 h-16 text-brand-500/10 absolute top-6 right-6 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <p className="text-xl sm:text-2xl md:text-3xl text-slate-100 font-medium leading-snug tracking-tight">
                "The clearest signal a design system works: a client reuses it without asking you to redesign. Within six months, they commissioned two more products on the exact same design foundation."
              </p>

              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-white text-base">J7 Technology Solutions</div>
                  <div className="text-xs text-slate-400 font-medium">
                    Shipped 7 live products in the last year · MCX Premier &amp; Equity Emphas commissioned
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-800/40 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>3 Products on 1 Design System</span>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
