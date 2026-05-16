"use client"

import { Box, Grid, Paper, Stack } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import MemoryIcon from '@mui/icons-material/Memory';
import HubIcon from '@mui/icons-material/Hub';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import FunctionsIcon from '@mui/icons-material/Functions';
import PsychologyIcon from '@mui/icons-material/Psychology';

const ACCENT = '#6366f1';

const Ai = () => {
  const t = useTranslations();

  const techs = [
    { icon: <FunctionsIcon sx={{ fontSize: 22 }} />,   text: t('ai.minimax')   },
    { icon: <QueryStatsIcon sx={{ fontSize: 22 }} />,  text: t('ai.heuristic') },
    { icon: <MemoryIcon sx={{ fontSize: 22 }} />,      text: t('ai.moves')     },
    { icon: <HubIcon sx={{ fontSize: 22 }} />,         text: t('ai.network')   },
  ];

  return (
    <Box sx={{ minHeight: '100vh', color: (theme) => theme.palette.text.primary, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', py: 10, px: 3, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: `radial-gradient(circle at 50% 35%, ${ACCENT}30, transparent 70%)`, filter: 'blur(70px)', opacity: .45, pointerEvents: 'none' }} />
      <Paper elevation={0} sx={{ maxWidth: 1000, width: '100%', mx: 'auto', p: { xs: 3, md: 5 }, bgcolor: (theme) => theme.palette.background.default, borderRadius: 3, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', '&:before': { content: '""', position: 'absolute', inset: 0, background: `linear-gradient(150deg, ${ACCENT}12, transparent 50%)` } }} />

        {/* Header */}
        <Reveal direction="up" distance={40}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: 2.5, background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}10)`, border: `1px solid ${ACCENT}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, flexShrink: 0 }}>
              <PsychologyIcon sx={{ fontSize: 36 }} />
            </Box>
            <Box>
              <Text variant="h3" component="h1" fontWeight="bold" sx={{ lineHeight: 1.1, fontSize: { xs: 22, md: 36 } }}>{t('ai.title')}</Text>
              <Box sx={{ height: 4, width: 56, borderRadius: 2, background: ACCENT, mt: 0.75 }} />
            </Box>
          </Box>
        </Reveal>

        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="body1" sx={{ textAlign: 'justify', mb: 5, lineHeight: 1.7, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.72)' }}>
            {t('ai.intro')}
          </Text>
        </Reveal>

        {/* Algorithms label */}
        <Reveal direction="up" distance={50}>
          <Text variant="overline" sx={{ color: ACCENT, letterSpacing: 2, fontWeight: 600, mb: 2, display: 'block' }}>
            {t('ai.techTitle')}
          </Text>
        </Reveal>

        <Grid container spacing={2.5} sx={{ mb: 5 }}>
          {techs.map((item, i) => (
            <Grid key={`ai-tech-${i}`} size={{ xs: 12, sm: 6 }}>
              <Reveal direction="up" distance={55} delay={0.05 + i * 0.05}>
                <Paper variant="outlined" sx={{ p: 2.2, height: '100%', borderColor: `${ACCENT}45`, background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : `${ACCENT}08`, backdropFilter: 'blur(4px)', position: 'relative', overflow: 'hidden', display: 'flex', gap: 1.5, alignItems: 'flex-start', borderRadius: 2 }}>
                  <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at 70% 25%, ${ACCENT}18, transparent 65%)`, opacity: .8 }} />
                  <Box sx={{ color: ACCENT, display: 'flex', alignItems: 'center', flexShrink: 0, mt: .1, position: 'relative' }}>{item.icon}</Box>
                  <Text variant="body2" sx={{ lineHeight: 1.6, textAlign: 'justify', color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.72)', position: 'relative' }}>
                    {item.text}
                  </Text>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Screenshot */}
        <Reveal direction="up" distance={60}>
          <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', border: `1px solid ${ACCENT}40`, boxShadow: `0 0 0 1px ${ACCENT}20, 0 16px 48px -10px rgba(0,0,0,0.6)` }}>
            {/* Top bar decoration */}
            <Box sx={{ height: 32, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', borderBottom: `1px solid ${ACCENT}25`, display: 'flex', alignItems: 'center', px: 1.5, gap: .8 }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c, opacity: .8 }} />
              ))}
              <Text variant="caption" sx={{ ml: 1, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', letterSpacing: .5 }}>
                Giant Tic-Tac-Toe AI
              </Text>
            </Box>
            <Box component="img" src="/assets/tictactoe.png" alt="Tic-Tac-Toe Géant" sx={{ width: '100%', height: 'auto', display: 'block' }} />
          </Box>
        </Reveal>
      </Paper>
    </Box>
  );
};

export default Ai;
