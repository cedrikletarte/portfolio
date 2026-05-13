"use client"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeModeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#ec4899' },
          background: {
            default: mode === 'dark' ? '#0a192f' : '#f5f5f5',
            paper: mode === 'dark' ? '#112240' : '#fff',
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}