'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ACCENT } from './colors';

const ThemeModeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function CustomThemeProvider({ children }) {
  // Default to dark (matches the previous useState('dark') default) until
  // hydration, then stays live-synced to the OS setting; a manual toggle
  // sets `override`, which then takes precedence for the rest of the session.
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', true);
  const [override, setOverride] = useState(null);
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

  const toggleTheme = () => setOverride(mode === 'dark' ? 'light' : 'dark');

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
