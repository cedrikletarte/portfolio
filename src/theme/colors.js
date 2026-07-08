// Single source of truth for the site's brand accent color (the pink used
// throughout the UI: MUI theme, canvas backgrounds, globals.css, and the
// OG image). Update it here rather than re-hardcoding the literal elsewhere.
export const ACCENT = '#ec4899';

// Canvas 2D (ctx.fillStyle/strokeStyle) needs separate R/G/B components to
// build rgba(...) strings with a per-frame alpha. Derive them from ACCENT
// on demand instead of hardcoding a second, parallel representation.
export function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
