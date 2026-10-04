'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';

// Single place where GSAP plugins get registered; components import gsap
// (and useGSAP / SplitText) from here so registration always happens first.
gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin);

// gsap.matchMedia() conditions shared by the text effects: full animation,
// or the reduced-motion fallback.
export const MOTION_QUERIES = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
};

export { gsap, SplitText, useGSAP };
