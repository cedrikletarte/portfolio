'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { HEADER_ICONS, PLACEHOLDER_META } from './projectVisuals';

const DOT_COLORS = ['#ff5f57', '#febc2e', '#28c840'];

export default function ProjectPlaceholder({ projectKey, accent }) {
  const t = useTranslations();
  const meta = PLACEHOLDER_META[projectKey];
  const HeaderIcon = HEADER_ICONS[projectKey];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10',
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${accent}40`,
        boxShadow: `0 0 0 1px ${accent}20, 0 16px 48px -10px rgba(0,0,0,0.6)`,
        background: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      }}
    >
      {/* Diagonal accent hatch background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(45deg, ${accent}12 0 1px, transparent 1px 14px)`,
        }}
      />

      {/* Ghost watermark icon */}
      {HeaderIcon && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accent,
            opacity: 0.12,
          }}
        >
          <HeaderIcon sx={{ fontSize: 120 }} />
        </Box>
      )}

      {/* Terminal-style chrome bar */}
      <Box
        sx={{
          position: 'relative',
          height: 32,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          borderBottom: `1px solid ${accent}25`,
          display: 'flex',
          alignItems: 'center',
          px: 1.5,
          gap: 0.8,
        }}
      >
        {DOT_COLORS.map((c) => (
          <Box
            key={c}
            sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c, opacity: 0.8 }}
          />
        ))}
        <Text
          variant="caption"
          sx={{
            ml: 1,
            fontFamily: 'monospace',
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
            letterSpacing: 0.5,
          }}
        >
          {meta?.file}
        </Text>
      </Box>

      {/* Fake code skeleton */}
      <Box sx={{ position: 'relative', p: 3, display: 'flex', flexDirection: 'column', gap: 1.4 }}>
        {(meta?.bars ?? []).map((width, i) => (
          <Box
            key={i}
            sx={{
              height: 9,
              width: `${width}%`,
              borderRadius: 1,
              background: i % 3 === 1 ? '#f59e0b30' : `${accent}${i % 2 === 0 ? '30' : '18'}`,
            }}
          />
        ))}
      </Box>

      <Chip
        label={t('work.screenshotComingSoon')}
        size="small"
        sx={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          bgcolor: `${accent}20`,
          color: accent,
          border: `1px solid ${accent}50`,
          fontWeight: 600,
        }}
      />
    </Box>
  );
}
