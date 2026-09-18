import React from 'react';

/**
 * NLogo - Bespoke brand mark for Nirmal Priyadarshan (Product Designer)
 * Features a dynamic isometric ribbon "N" with iridescent violet, cyan, and indigo gradients.
 * 
 * @param {number} size - Pixel size (default: 32)
 * @param {'badge' | 'mark' | 'image'} variant - Rendering mode (default: 'badge')
 * @param {boolean} glow - Whether to show the ambient neon glow (default: true)
 * @param {string} className - Additional CSS classes
 */
export default function NLogo({
  size = 32,
  variant = 'badge',
  glow = true,
  className = '',
  ...props
}) {
  if (variant === 'image') {
    return (
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-violet-950/40 group ${className}`}
        style={{ width: size, height: size }}
        {...props}
      >
        <img
          src="/logo-n.png"
          alt="Nirmal Priyadarshan Logo"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    );
  }

  const isBadge = variant === 'badge';

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none group ${className}`}
      style={{ width: size, height: size }}
      {...props}
    >
      {/* Ambient Neon Glow */}
      {glow && (
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-600/30 via-cyan-500/20 to-fuchsia-600/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{ transform: 'scale(1.15)' }}
        />
      )}

      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Badge Background Gradient */}
          <linearGradient id="nBadgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#141726" />
            <stop offset="50%" stopColor="#0d101a" />
            <stop offset="100%" stopColor="#07090f" />
          </linearGradient>

          {/* Badge Border Gradient */}
          <linearGradient id="nBadgeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
          </linearGradient>

          {/* Left Pillar Gradient (Deep Indigo -> Electric Violet) */}
          <linearGradient id="nLeftStem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>

          {/* Left Fold / Loop Gradient */}
          <linearGradient id="nLeftLoop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="60%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>

          {/* Diagonal Bridge Gradient (Iridescent Electric Cyan -> Radiant Violet) */}
          <linearGradient id="nDiagonal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Right Pillar Gradient (Luminous Violet -> Magenta Rose) */}
          <linearGradient id="nRightStem" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="45%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Specular Highlight Sheen */}
          <linearGradient id="nGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Subtle Drop Shadow for 3D Overlap */}
          <filter id="nDropShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Squircle Badge Backdrop */}
        {isBadge && (
          <>
            <rect
              x="2"
              y="2"
              width="96"
              height="96"
              rx="24"
              fill="url(#nBadgeBg)"
            />
            <rect
              x="2"
              y="2"
              width="96"
              height="96"
              rx="24"
              stroke="url(#nBadgeBorder)"
              strokeWidth="1.5"
            />
          </>
        )}

        {/* ================= LETTER N 3D RIBBON GEOMETRY ================= */}
        <g id="letterN" filter="url(#nDropShadow)">
          {/* 1. Left Vertical Stem (Rear facet) */}
          <path
            d="M 23 34 
               L 23 72 
               C 23 77 27 80 32 80 
               L 35 80 
               C 38 80 40 78 41 75 
               L 41 44 
               L 23 34 Z"
            fill="url(#nLeftStem)"
            opacity="0.95"
          />

          {/* 2. Left Top Crest Fold (Front arch) */}
          <path
            d="M 23 42 
               L 23 30 
               C 23 23 28 18 35 18 
               C 42 18 47 23 48 30 
               L 48 40 
               L 35 30 
               C 32 27 29 28 28 32 
               L 28 46 
               L 23 42 Z"
            fill="url(#nLeftLoop)"
          />

          {/* 3. Right Vertical Stem (Luminous upright) */}
          <path
            d="M 59 28 
               C 59 22 64 18 70 18 
               C 76 18 80 22 80 28 
               L 80 68 
               C 80 75 75 80 68 80 
               C 62 80 59 75 59 68 
               L 59 28 Z"
            fill="url(#nRightStem)"
          />

          {/* 4. Dynamic Diagonal Bridge (Sweeping foreground band) */}
          <path
            d="M 33 22 
               C 39 19 46 22 49 28 
               L 77 69 
               C 80 74 77 80 71 80 
               C 66 80 62 76 59 72 
               L 29 29 
               C 28 26 30 23 33 22 Z"
            fill="url(#nDiagonal)"
          />

          {/* 5. Isometric Specular Edge Sheen (Upper Diagonal Edge) */}
          <path
            d="M 34 23 
               L 76 70 
               C 78 73 76 75 73 75 
               L 32 27 
               C 31 25 33 23 34 23 Z"
            fill="url(#nGloss)"
            opacity="0.7"
          />

          {/* 6. AI Spark Pulse Core Node */}
          <circle cx="53" cy="49" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="53" cy="49" r="4.5" fill="#38bdf8" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
