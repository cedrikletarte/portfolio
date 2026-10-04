'use client';

import { useRef } from 'react';
import { gsap, MOTION_QUERIES, SplitText, useGSAP } from '../../lib/gsap';

/**
 * Masked per-character reveal: each letter slides up from behind its own
 * clip mask, staggered. Renders hidden (visibility) until GSAP takes over so
 * the unsplit text never flashes before the animation; SplitText keeps the
 * full text readable to screen readers (aria-label on the wrapper).
 */
export default function CharReveal({ children, delay = 0, stagger = 0.045, as: Tag = 'span' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.motion, () => {
        gsap.set(el, { autoAlpha: 1 });
        const split = SplitText.create(el, {
          type: 'chars',
          mask: 'chars',
          autoSplit: true,
          // Returning the tween lets SplitText carry its progress over when
          // it re-splits (font swap, resize).
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 110,
              rotate: 8,
              duration: 0.9,
              ease: 'expo.out',
              stagger,
              delay,
            }),
        });
        return () => split.revert();
      });

      mm.add(MOTION_QUERIES.reduced, () => {
        gsap.set(el, { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} style={{ display: 'inline-block', visibility: 'hidden' }}>
      {children}
    </Tag>
  );
}
