'use client';

import { useTheme } from '@mui/material/styles';

// Page background following the active theme. The animated switch between
// themes is a View Transition started by toggleTheme (see ThemeContext), so
// this only needs to paint the current mode's background.
// Plain inline styles rather than an emotion-styled Box: this wraps the
// whole page, and emotion's SSR <style> tag injected as its first child
// would not match what the client hydrates.
export default function ThemeBackground({ children }) {
  const theme = useTheme();

  return (
    <div
      style={{
        position: 'relative',
        isolation: 'isolate',
        minHeight: '100vh',
        width: '100%',
        background: theme.palette.background.default,
      }}
    >
      {children}
    </div>
  );
}
