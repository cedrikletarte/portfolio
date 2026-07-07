"use client";

import Button from '@mui/material/Button';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Magnetic-hover wrapper around MUI's Button.
 * The button drifts slightly toward the cursor on hover and springs back on leave.
 * Drop-in replacement: forwards every prop straight to the underlying Button.
 */
export default function CTAButton({ children, strength = 0.35, ...buttonProps }) {
  const ref = useRef(null);
  const [reduced, setReduced] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        x: reduced ? 0 : springX,
        y: reduced ? 0 : springY,
      }}
    >
      <Button {...buttonProps}>{children}</Button>
    </motion.div>
  );
}
