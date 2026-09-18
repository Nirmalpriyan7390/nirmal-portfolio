import React, { useState } from 'react';
import { Mail, MapPin, Clock, Copy, Check, Send, Sparkles, ArrowRight, ArrowUpRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import LinkedinIcon from './icons/LinkedinIcon';
import { portfolioData } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';

const WEB3FORMS_KEY = 'e99aa8fb-525e-4841-9835-ec403f1ca3e5';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const contact = portfolioData.contact;

  const handleCopy = (e) => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(contact.email);
    setCopied(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x, y },
      colors: ['#8b5cf6', '#10b981', '#38bdf8'],
      disableForReducedMotion: true,
    });

    setTimeout(() => setCopied(false), 2400);
  };

  const handleQuickSend = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        name: senderName.trim(),
        email: senderEmail.trim(),
        message: senderMessage.trim(),
        subject: `Product Design Inquiry from ${senderName.trim()} (Portfolio)`,
        from_name: `${senderName.trim()} via Nirmal Portfolio`
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        soundFx.playSuccess();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#10b981', '#38bdf8', '#c084fc'],
        });
        setSubmitStatus('success');
        setSenderName('');
        setSenderEmail('');
        setSenderMessage('');
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again or email directly.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Network connection error. Please email directly at ' + contact.email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-white/[0.06] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-brand-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-brand-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR SELECT PROJECTS &amp; ROLES</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            {contact.headline}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            {contact.supportingText}
          </p>
        </div>

        {/* Contact Information Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Email Card */}
          <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 hover:border-brand-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-400 mb-3 group-hover:border-brand-500/40 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-slate-500">Direct Email</div>
              <div className="text-sm font-semibold text-white font-mono break-all mt-0.5">
                {contact.email}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${contact.email}`}
                className="px-3 py-2 rounded-xl bg-white text-slate-950 hover:bg-brand-400 hover:text-white text-xs font-bold transition-all flex items-center justify-center"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 hover:border-brand-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-400 mb-3 group-hover:border-brand-500/40 transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-slate-500">Professional Network</div>
              <div className="text-sm font-semibold text-white font-mono break-all mt-0.5">
                {contact.linkedin}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Open Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Location & Timezone Card */}
          <div className="p-6 rounded-3xl bg-[#0c1017] border border-slate-800 flex flex-col justify-between space-y-4 shadow-lg">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-slate-500">Location &amp; Availability</div>
              <div className="text-sm font-medium text-white mt-0.5">
                {contact.location}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available Globally</span>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0c1017] border border-slate-800/90 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-2">
            Send a direct message
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            Tell me about your product, timelines, or questions. I respond within 24 hours directly to your email.
          </p>

          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 sm:p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  Message Delivered!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thanks for reaching out! Your message was sent directly to Nirmal's inbox (<span className="text-emerald-300 font-mono text-xs">{contact.email}</span>). I'll reply within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setSubmitStatus('idle');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-all"
                  >
                    Send another message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleQuickSend} className="space-y-4">
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{errorMessage}</p>
                      <p className="mt-1 text-slate-400">
                        You can also email me directly at{' '}
                        <a href={`mailto:${contact.email}`} className="text-brand-300 underline font-mono">
                          {contact.email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Rivera"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Product Details or Idea
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="We're building an AI workflow tool / SaaS platform and need product design leadership..."
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-brand-500 focus:outline-none transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-950 hover:bg-brand-400 hover:text-white font-bold text-sm transition-all duration-200 shadow-xl flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Delivering to Nirmal...</span>
                      </>
                    ) : (
                      <>
                        <span>{contact.cta || "Let's build something →"}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Delivered straight to {contact.email}</span>
                  </span>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
