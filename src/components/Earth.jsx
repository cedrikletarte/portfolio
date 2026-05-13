"use client"

import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';
import PublicIcon from '@mui/icons-material/Public';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import MapIcon from '@mui/icons-material/Map';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GitHubIcon from '@mui/icons-material/GitHub';

const ACCENT = '#22d3ee';

const Earth = () => {
  const t = useTranslations();

  const features = [
    { icon: <ExploreIcon sx={{ fontSize: 22 }} />,     title: t('earth.globeTitle'),   desc: t('earth.globeDesc')  },
    { icon: <SearchIcon sx={{ fontSize: 22 }} />,      title: t('earth.searchTitle'),  desc: t('earth.searchDesc') },
    { icon: <MapIcon sx={{ fontSize: 22 }} />,         title: t('earth.mapTitle'),     desc: t('earth.mapDesc')    },
    { icon: <AutoAwesomeIcon sx={{ fontSize: 22 }} />, title: t('earth.skyboxTitle'),  desc: t('earth.skyboxDesc') },
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
              <PublicIcon sx={{ fontSize: 36 }} />
            </Box>
            <Box>
              <Text variant="h3" component="h1" fontWeight="bold" sx={{ lineHeight: 1.1 }}>{t('earth.title')}</Text>
              <Box sx={{ height: 4, width: 56, borderRadius: 2, background: ACCENT, mt: 0.75 }} />
            </Box>
          </Box>
        </Reveal>

        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="body1" sx={{ textAlign: 'justify', mb: 5, lineHeight: 1.7, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.72)' }}>
            {t('earth.intro')}
          </Text>
        </Reveal>

        {/* Features label */}
        <Reveal direction="up" distance={50}>
          <Text variant="overline" sx={{ color: ACCENT, letterSpacing: 2, fontWeight: 600, mb: 2, display: 'block' }}>
            {t('earth.featuresTitle')}
          </Text>
        </Reveal>

        <Grid container spacing={2.5} sx={{ mb: 5 }}>
          {features.map((item, i) => (
            <Grid key={`earth-feat-${i}`} size={{ xs: 12, sm: 6 }}>
              <Reveal direction="up" distance={55} delay={0.05 + i * 0.05}>
                <Paper variant="outlined" sx={{ p: 2.5, height: '100%', borderColor: `${ACCENT}45`, background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : `${ACCENT}08`, backdropFilter: 'blur(4px)', position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                  <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at 70% 25%, ${ACCENT}18, transparent 65%)`, opacity: .8 }} />
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, position: 'relative' }}>
                    <Box sx={{ color: ACCENT }}>{item.icon}</Box>
                    <Text variant="subtitle1" fontWeight="bold" sx={{ fontSize: { xs: 14, sm: 16 } }}>{item.title}</Text>
                  </Stack>
                  <Text variant="body2" sx={{ lineHeight: 1.6, textAlign: 'justify', color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.72)', position: 'relative' }}>
                    {item.desc}
                  </Text>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* GitHub link */}
        <Reveal direction="up" distance={40} delay={0.25}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              href="https://github.com/cedrikletarte/earth"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
              sx={{ borderColor: ACCENT, color: ACCENT, px: 3, py: 1, fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: `${ACCENT}15`, borderColor: ACCENT } }}
            >
              {t('earth.github')}
            </Button>
          </Box>
        </Reveal>
      </Paper>
    </Box>
  );
};

export default Earth;
