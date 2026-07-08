'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Shared engine behind every canvas background (Hero + section variants):
 * DPR-aware resizing, pause when off-screen or tab hidden, and a
 * prefers-reduced-motion escape hatch. Callers only supply the drawing logic.
 *
 * - onResize(width, height): (re)initialize particles/shapes for the new size.
 * - onFrame(ctx, { width, height, dpr, time, mouse }): draw a single frame.
 *   `time` is seconds on the document's shared clock (not time-since-mount),
 *   so multiple instances stay phase-synced regardless of when each mounted.
 * - mouseTracking: only wire up mouse listeners when the variant needs them.
 */
export function useAnimatedCanvas({ onFrame, onResize, mouseTracking = false }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setVisible(entry.isIntersecting)),
      { threshold: 0.05 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || reduced) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let rafId = null;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      onResize?.(width, height);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const step = (now) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      // `now` is relative to the document's shared time origin (not this
      // component's mount time), so every canvas instance on the page reads
      // the same clock — keeping animations like the sweep in sync even when
      // they mount at different moments (e.g. Projects grid vs. a project
      // detail page mounted later on click).
      onFrame?.(ctx, { width, height, dpr, time: now / 1000, mouse });
      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      if (rafId === null) {
        running = true;
        rafId = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      running = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    resize();
    if (visible && document.visibilityState === 'visible') start();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && visible) start();
      else stop();
    };

    window.addEventListener('resize', resize);
    if (mouseTracking) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      if (mouseTracking) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [reduced, visible, mouseTracking, onFrame, onResize]);

  return { canvasRef, containerRef, reduced };
}
