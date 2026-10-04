'use client';

import { useRef } from 'react';
import { gsap, MOTION_QUERIES, useGSAP } from '../../lib/gsap';

const GLYPHS = '01<>/{}[]=+*#_$;';

/**
 * Cycles through `strings`, "decoding" each one from random glyphs
 * (ScrambleText). The animated node is aria-hidden: screen readers get the
 * whole list once instead of a stream of random characters.
 * Under prefers-reduced-motion the strings simply swap in place.
 */
export default function ScrambleCycle({ strings, hold = 2.2, delay = 0 }) {
  const ref = useRef(null);
  // t.raw() may hand back a fresh array each render; key on the content so
  // the timeline only restarts when the strings actually change (locale).
  const stringsKey = strings.join('\n');

  useGSAP(
    () => {
      const el = ref.current;
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES.motion, () => {
        // repeatRefresh re-reads each tween's start text on every loop, so
        // the first string decodes from the last one instead of jumping.
        const tl = gsap.timeline({ repeat: -1, repeatRefresh: true, delay });
        strings.forEach((text) => {
          tl.to(el, {
            duration: 1.2,
            ease: 'none',
            scrambleText: { text, chars: GLYPHS, speed: 0.5, revealDelay: 0.35 },
          }).to({}, { duration: hold });
        });
      });

      mm.add(MOTION_QUERIES.reduced, () => {
        const tl = gsap.timeline({ repeat: -1 });
        strings.forEach((text) => {
          tl.call(() => {
            el.textContent = text;
          }).to({}, { duration: hold + 1 });
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [stringsKey], revertOnUpdate: true },
  );

  return (
    <>
      {/* Every string sits invisibly in the same grid cell as the animated
          one, so the box is always as tall as the longest (wrapped) string
          and the content below doesn't jump as the text changes. */}
      <span style={{ display: 'inline-grid' }}>
        {strings.map((text) => (
          <span key={text} aria-hidden style={{ gridArea: '1 / 1', visibility: 'hidden' }}>
            {text}
          </span>
        ))}
        <span ref={ref} aria-hidden style={{ gridArea: '1 / 1' }}>
          {strings[0]}
        </span>
      </span>
      <span className="sr-only">{strings.join(', ')}</span>
    </>
  );
}
