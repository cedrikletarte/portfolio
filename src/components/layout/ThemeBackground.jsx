'use client';

import Box from '@mui/material/Box';

// Page background following the active theme. The animated switch between
// themes is a View Transition started by toggleTheme (see ThemeContext), so
// this only needs to paint the current mode's background.
export default function ThemeBackground({ children }) {
  return (
    <Box
      sx={{
        position: 'relative',
        isolation: 'isolate',
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
      }}
    >
      {children}
    </Box>
  );
}
