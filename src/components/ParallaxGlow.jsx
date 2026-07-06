"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Radial-gradient glow blob used behind every section, now with a subtle
 * scroll-linked drift/scale instead of sitting static. Centralizes the glow
 * styling that used to be duplicated inline in every section component.
 */
export default function ParallaxGlow({
  color,
  size = 600,
  top = '0%',
  left = '50%',
  origin = '50% 35%',
  blur = 70,
  opacity = 0.5,
  strength = 50,
}) {
  const ref = useRef(null);
  const [reduced, setReduced] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left,
        x: '-50%',
        y: reduced ? 0 : y,
        scale: reduced ? 1 : scale,
        width: size,
        height: size,
        background: `radial-gradient(circle at ${origin}, ${color}, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
}
