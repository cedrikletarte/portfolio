'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ACCENT } from './colors';

const ThemeModeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

const REVEAL_DURATION_MS = 600;

// Center of the control that triggered the switch (works for mouse and
// keyboard activation alike), or the viewport center when there is none
// (e.g. the command palette, which has already closed).
function revealOrigin(event) {
  const rect = event?.currentTarget?.getBoundingClientRect?.();
  if (rect) return [rect.left + rect.width / 2, rect.top + rect.height / 2];
  return [window.innerWidth / 2, window.innerHeight / 2];
}

export function CustomThemeProvider({ children }) {
  // Default to dark (matches the previous useState('dark') default) until
  // hydration, then stays live-synced to the OS setting; a manual toggle
  // sets `override`, which then takes precedence for the rest of the session.
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', true);
  const [override, setOverride] = useState(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const mode = override ?? (prefersDark ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: ACCENT },
          background: {
            default: mode === 'dark' ? '#0a192f' : '#f5f5f5',
            paper: mode === 'dark' ? '#112240' : '#fff',
          },
          // Dark mode uses a softer slate off-white instead of MUI's default
          // pure white; light mode keeps MUI's default (rgba(0,0,0,0.87)).
          ...(mode === 'dark' ? { text: { primary: '#e2e8f0' } } : {}),
        },
      }),
    [mode],
  );

  // The new theme is revealed by a circle growing from the toggle, as a View
  // Transition: the browser snapshots the old page, React renders the new
  // theme synchronously (flushSync), and only the clip-path of the new
  // snapshot is animated. Browsers without the API just switch instantly.
  const toggleTheme = (event) => {
    const next = mode === 'dark' ? 'light' : 'dark';
    if (reducedMotion || typeof document.startViewTransition !== 'function') {
      setOverride(next);
      return;
    }

    const [x, y] = revealOrigin(event);
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const transition = document.startViewTransition(() => {
      flushSync(() => setOverride(next));
    });
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration: REVEAL_DURATION_MS,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {});
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
