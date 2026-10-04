'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/**
 * Reveal animation wrapper.
 * - IntersectionObserver triggers once when visible.
 * - Fade + translate + subtle scale.
 * - Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  distance = 40,
  direction = 'up',
  as: Tag = 'div',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const axisMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const initial = reduced ? { opacity: 0 } : { opacity: 0, ...axisMap[direction], scale: 0.98 };
  // Always settle on the resting transform: `reduced` is false during SSR and
  // hydration, so the offset from `initial` is already applied by the time
  // the media query reports reduced motion. Under reduced motion that offset
  // snaps back instantly (see transition) instead of animating.
  const animate = inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : initial;
  const snap = { duration: 0 };
  const transition = {
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1],
    ...(reduced && { x: snap, y: snap, scale: snap }),
  };

  return (
    <motion.div
      ref={ref}
      as={Tag}
      initial={initial}
      animate={animate}
      transition={transition}
      style={{ willChange: 'opacity, transform', ...style }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
