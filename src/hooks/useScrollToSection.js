'use client';

import { useLenis } from 'lenis/react';
import { useCallback } from 'react';

/**
 * Returns `scrollTo(name)`, which smooth-scrolls to the section with that id
 * or `name` attribute (home, about, skills, github, work, contact).
 * Goes through Lenis so the scroll shares its easing and doesn't fight the
 * smoothed wheel; falls back to native smooth scrolling before Lenis is up.
 */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (name) => {
      // Sections are tagged either way (Skills uses an id, the others a
      // name attribute), so look up the id first, as react-scroll did.
      const el = document.getElementById(name) ?? document.querySelector(`[name="${name}"]`);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { duration: 1.2 });
      else el.scrollIntoView({ behavior: 'smooth' });
    },
    [lenis],
  );
}
