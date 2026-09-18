import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundAura() {
  const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Interactive mouse spotlight reflecting active brand theme */}
      <div
        className="hidden md:block absolute w-[700px] h-[700px] rounded-full blur-[140px] bg-brand-500/[0.16] transition-all duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 350}px, ${mousePosition.y - 350}px)`,
        }}
      />

      {/* Floating Animated Ambient Glow 1 (Dynamic Brand Accent) */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-1/4 w-[550px] h-[500px] rounded-full bg-brand-500/[0.18] blur-[150px] transition-colors duration-700"
      />

      {/* Floating Animated Ambient Glow 2 (Secondary Glow) */}
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 right-10 w-[500px] h-[450px] rounded-full bg-brand-400/[0.14] blur-[140px] transition-colors duration-700"
      />

      {/* Floating Animated Ambient Glow 3 (Deep Bottom Atmosphere) */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 left-10 w-[600px] h-[450px] rounded-full bg-brand-600/[0.16] blur-[160px] transition-colors duration-700"
      />

      {/* Subtle Dynamic Dot Matrix Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25] [background-size:28px_28px] transition-all duration-700"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--brand-400) / 0.3) 1px, transparent 1px)'
        }}
      />
    </div>
  );
}
