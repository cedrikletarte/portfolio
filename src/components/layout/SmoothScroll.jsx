'use client';

import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

// Lenis drives the native window scroll (no transformed wrapper), so
// position: sticky and framer-motion's useScroll keep working unchanged.
// It honors prefers-reduced-motion on its own (no smoothing, instant
// scrollTo). Wheel events inside MUI modals (mobile drawer, command palette)
// are left to the browser so they don't scroll the page behind the overlay.
const OPTIONS = {
  autoRaf: true,
  lerp: 0.1,
  prevent: (node) => node.classList.contains('MuiModal-root'),
};

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={OPTIONS}>
      {children}
    </ReactLenis>
  );
}
