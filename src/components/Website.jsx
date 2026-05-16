"use client"

import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import Reveal from './Reveal';

const ACCENT = '#ec4899';

const Website = () => {
  const t = useTranslations();

  const sections = [
    { title: t('website.skillsTitle'),   desc: t('website.skillsDesc')   },
    { title: t('website.projectsTitle'), desc: t('website.projectsDesc') },
    { title: t('website.uxTitle'),       desc: t('website.uxDesc')       },
    { title: t('website.securityTitle'), desc: t('website.securityDesc') },
    { title: t('website.designTitle'),   desc: t('website.designDesc')   },
  ];

  return (
    <Box sx={{ minHeight: '100vh', color: (theme) => theme.palette.text.primary, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', py: 10, px: 3, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: `radial-gradient(circle at 60% 30%, ${ACCENT}30, transparent 70%)`, filter: 'blur(70px)', opacity: .4, pointerEvents: 'none' }} />
      <Paper elevation={0} sx={{ maxWidth: 1000, width: '100%', mx: 'auto', p: { xs: 3, md: 5 }, bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary, borderRadius: 3, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', '&:before': { content: '""', position: 'absolute', inset: 0, background: `linear-gradient(140deg, ${ACCENT}10, transparent 45%)` } }} />

        {/* Header */}
        <Reveal direction="up" distance={40}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: 2.5, background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}10)`, border: `1px solid ${ACCENT}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, flexShrink: 0 }}>
              <LanguageIcon sx={{ fontSize: 36 }} />
            </Box>
            <Box>
              <Text variant="h3" component="h1" fontWeight="bold" sx={{ lineHeight: 1.1, fontSize: { xs: 22, md: 36 } }}>{t('website.title')}</Text>
              <Box sx={{ height: 4, width: 56, borderRadius: 2, background: ACCENT, mt: 0.75 }} />
            </Box>
          </Box>
        </Reveal>

        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="body1" sx={{ textAlign: 'justify', mb: 5, lineHeight: 1.7, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.72)' }}>
            {t('website.intro')}
          </Text>
        </Reveal>

        {/* Objectives label */}
        <Reveal direction="up" distance={40}>
          <Text variant="overline" sx={{ color: ACCENT, letterSpacing: 2, fontWeight: 600, mb: 2, display: 'block' }}>
            {t('website.objectives')}
          </Text>
        </Reveal>

        {/* Cards grid — last card spans full width */}
        <Grid container spacing={2.5}>
          {sections.map((sect, i) => (
            <Grid key={`website-sect-${i}`} size={{ xs: 12, sm: i < 4 ? 6 : 12 }}>
              <Reveal direction="up" distance={50} delay={0.05 + i * 0.05}>
                <Paper variant="outlined" sx={{ p: 2.5, height: '100%', borderColor: `${ACCENT}40`, background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : `${ACCENT}06`, backdropFilter: 'blur(4px)', position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                  <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at 75% 25%, ${ACCENT}18, transparent 65%)`, opacity: .8 }} />
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                    <Text variant="subtitle1" fontWeight="bold" sx={{ fontSize: { xs: 15, sm: 17 }, position: 'relative' }}>
                      {sect.title}
                    </Text>
                  </Stack>
                  <Text variant="body2" sx={{ textAlign: 'justify', lineHeight: 1.6, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)', position: 'relative' }}>
                    {sect.desc}
                  </Text>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Reveal direction="up" distance={50} delay={0.35}>
          <Box sx={{ mt: 4, pt: 4, borderTop: `1px solid ${ACCENT}25` }}>
            <Text variant="body1" sx={{ lineHeight: 1.7, textAlign: 'justify', color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)', fontStyle: 'italic' }}>
              {t('website.conclusion')}
            </Text>
          </Box>
        </Reveal>

        {/* GitHub link */}
        <Reveal direction="up" distance={40} delay={0.4}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              href="https://github.com/cedrikletarte/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
              sx={{ borderColor: ACCENT, color: ACCENT, px: 3, py: 1, fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: `${ACCENT}15`, borderColor: ACCENT } }}
            >
              {t('navbar.github')}
            </Button>
          </Box>
        </Reveal>
      </Paper>
    </Box>
  );
};

export default Website;
