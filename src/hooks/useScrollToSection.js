'use client';

import { useLenis } from 'lenis/react';
import { useCallback } from 'react';

/**
 * Returns `scrollTo(name)`, which smooth-scrolls to the section tagged with
 * that `name` attribute (home, about, skills, github, work, contact).
 * Goes through Lenis so the scroll shares its easing and doesn't fight the
 * smoothed wheel; falls back to native smooth scrolling before Lenis is up.
 */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (name) => {
      const el = document.querySelector(`[name="${name}"]`);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { duration: 1.2 });
      else el.scrollIntoView({ behavior: 'smooth' });
    },
    [lenis],
  );
}
