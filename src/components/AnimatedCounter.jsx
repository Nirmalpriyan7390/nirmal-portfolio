import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedCounter({ value, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const targetNumber = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const isMounted = useRef(false);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * targetNumber));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetNumber);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="font-mono inline-flex items-baseline">
      <span>{hasAnimated ? count : 0}</span>
      {value.includes('+') && <span>+</span>}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
