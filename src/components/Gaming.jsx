"use client"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, IconButton, Paper, Stack } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Reveal from './Reveal';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SpeedIcon from '@mui/icons-material/Speed';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import GestureIcon from '@mui/icons-material/Gesture';

const ACCENT = '#f59e0b';

const Gaming = () => {
  const t = useTranslations();

  const media = [
    { type: 'image', src: "/assets/menu.png" },
    { type: 'image', src: "/assets/orthogonal.png" },
    { type: 'image', src: "/assets/fps.png" },
    { type: 'image', src: "/assets/freecam.png" },
    { type: 'image', src: "/assets/wallrun.png" },
    { type: 'image', src: "/assets/swinging.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  const handleNext = () => setCurrentIndex((i) => (i === media.length - 1 ? 0 : i + 1));

  const goals = [
    { icon: <SportsEsportsIcon sx={{ fontSize: 22 }} />, title: t('gaming.goal1Title'), desc: t('gaming.goal1Desc') },
    { icon: <SpeedIcon sx={{ fontSize: 22 }} />,          title: t('gaming.goal2Title'), desc: t('gaming.goal2Desc') },
    { icon: <ThreeDRotationIcon sx={{ fontSize: 22 }} />, title: t('gaming.goal3Title'), desc: t('gaming.goal3Desc') },
    { icon: <GestureIcon sx={{ fontSize: 22 }} />,        title: t('gaming.goal4Title'), desc: t('gaming.goal4Desc') },
  ];

  return (
    <Box sx={{ minHeight: '100vh', color: (theme) => theme.palette.text.primary, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', py: 10, px: 3, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: `radial-gradient(circle at 45% 35%, ${ACCENT}28, transparent 72%)`, filter: 'blur(70px)', opacity: .45, pointerEvents: 'none' }} />
      <Paper elevation={0} sx={{ maxWidth: 1000, width: '100%', mx: 'auto', p: { xs: 3, md: 5 }, bgcolor: (theme) => theme.palette.background.default, borderRadius: 3, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', '&:before': { content: '""', position: 'absolute', inset: 0, background: `linear-gradient(150deg, ${ACCENT}10, transparent 45%)` } }} />

        {/* Header */}
        <Reveal direction="up" distance={40}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: 2.5, background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}10)`, border: `1px solid ${ACCENT}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, flexShrink: 0 }}>
              <SportsEsportsIcon sx={{ fontSize: 36 }} />
            </Box>
            <Box>
              <Text variant="h3" component="h1" fontWeight="bold" sx={{ lineHeight: 1.1 }}>{t('gaming.title')}</Text>
              <Box sx={{ height: 4, width: 56, borderRadius: 2, background: ACCENT, mt: 0.75 }} />
            </Box>
          </Box>
        </Reveal>

        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="body1" sx={{ textAlign: 'justify', mb: 5, lineHeight: 1.7, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.72)' }}>
            {t('gaming.intro')}
          </Text>
        </Reveal>

        {/* Objectives label */}
        <Reveal direction="up" distance={40}>
          <Text variant="overline" sx={{ color: ACCENT, letterSpacing: 2, fontWeight: 600, mb: 2, display: 'block' }}>
            {t('gaming.objectives')}
          </Text>
        </Reveal>

        {/* Goal cards */}
        <Grid container spacing={2.5} sx={{ mb: 5 }}>
          {goals.map((g, i) => (
            <Grid key={`goal-${i}`} size={{ xs: 12, sm: 6 }}>
              <Reveal direction="up" distance={50} delay={0.05 + i * 0.05}>
                <Paper variant="outlined" sx={{ p: 2.5, height: '100%', borderColor: `${ACCENT}45`, background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : `${ACCENT}08`, backdropFilter: 'blur(4px)', position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                  <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at 75% 25%, ${ACCENT}18, transparent 65%)`, opacity: .7 }} />
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, position: 'relative' }}>
                    <Box sx={{ color: ACCENT }}>{g.icon}</Box>
                    <Text variant="subtitle1" fontWeight="bold" sx={{ fontSize: { xs: 14, sm: 16 } }}>{g.title}</Text>
                  </Stack>
                  <Text variant="body2" sx={{ lineHeight: 1.6, textAlign: 'justify', color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)', position: 'relative' }}>
                    {g.desc}
                  </Text>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Carousel */}
        <Reveal direction="up" distance={60}>
          <Box sx={{ position: 'relative', width: '100%', maxWidth: 760, mx: 'auto', pb: 5 }}>
            {/* Image */}
            {media[currentIndex].type === 'image' ? (
              <Box component="img" src={media[currentIndex].src} alt={`screenshot-${currentIndex + 1}`} sx={{ width: '100%', height: 'auto', borderRadius: 3, boxShadow: '0 12px 36px -8px rgba(0,0,0,0.55)', border: `1px solid ${ACCENT}40`, display: 'block' }} />
            ) : (
              <Box component="video" src={media[currentIndex].src} controls sx={{ width: '100%', height: 'auto', borderRadius: 3, boxShadow: '0 12px 36px -8px rgba(0,0,0,0.55)', border: `1px solid ${ACCENT}40`, display: 'block' }} />
            )}

            {/* Prev button */}
            <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: 8, top: '45%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: 'white', backdropFilter: 'blur(4px)', '&:hover': { bgcolor: `${ACCENT}cc` }, zIndex: 1 }}>
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            {/* Next button */}
            <IconButton onClick={handleNext} sx={{ position: 'absolute', right: 8, top: '45%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: 'white', backdropFilter: 'blur(4px)', '&:hover': { bgcolor: `${ACCENT}cc` }, zIndex: 1 }}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>

            {/* Dots */}
            <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
              {media.map((_, i) => (
                <Box key={`dot-${i}`} onClick={() => setCurrentIndex(i)} sx={{ width: i === currentIndex ? 20 : 8, height: 8, borderRadius: 20, cursor: 'pointer', transition: 'all .35s', background: i === currentIndex ? ACCENT : `${ACCENT}55` }} />
              ))}
            </Box>

            {/* Counter */}
            <Box sx={{ position: 'absolute', top: 10, right: 14, bgcolor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', borderRadius: 10, px: 1.2, py: .3 }}>
              <Text variant="caption" sx={{ color: '#fff', fontWeight: 600, letterSpacing: .5 }}>{currentIndex + 1} / {media.length}</Text>
            </Box>
          </Box>
        </Reveal>
      </Paper>
    </Box>
  );
};

export default Gaming;
