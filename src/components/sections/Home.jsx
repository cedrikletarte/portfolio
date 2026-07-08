"use client"

import Box from '@mui/material/Box';
import Text from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import { scroller } from 'react-scroll';
import { ReactTyped } from 'react-typed';
import CTAButton from '../ui/CTAButton';
import HeroCanvas from '../ui/HeroCanvas';
import ParallaxGlow from '../ui/ParallaxGlow';
import Reveal from '../ui/Reveal';

const Home = () => {
  const t = useTranslations();
  const theme = useTheme();
  const ACCENT = theme.palette.primary.main

  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <Box
      name="home"
      sx={{
        width: '100%',
        minHeight: '100vh',
        color: (theme) => theme.palette.text.primary,
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 0 },
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <ParallaxGlow top="10%" left="40%" origin="45% 40%" size={700} color={alpha(ACCENT, 0.18)} blur={80} opacity={0.5} />
      <HeroCanvas />
      <Box
        sx={{
          maxWidth: 1000,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: { xs: 'auto', md: '100%' },
          position: 'relative',
        }}
      >
        <Reveal direction="up" distance={30}>
          <Text sx={{ color: ACCENT, fontWeight: 600, mb: { xs: 1, md: 2 }, fontSize: { xs: 18, md: 22 } }}>
            {t('home.hello')}
          </Text>
        </Reveal>
        <Reveal direction="up" distance={40} delay={0.05}>
          <Text
            component="h1"
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: 32, sm: 40, md: 56 },
              mb: { xs: 1, md: 2 },
              lineHeight: 1.1,
            }}
          >
            Cédrik
          </Text>
        </Reveal>
        <Reveal direction="up" distance={40} delay={0.1}>
          <Text
            component="div"
            sx={{
              fontWeight: 500,
              color: '#6fc2b0',
              fontSize: { xs: 32, sm: 40, md: 56 },
              mb: { xs: 2, md: 3 },
              minHeight: 40,
            }}
          >
            <ReactTyped
              strings={t.raw('home.typed')}
              typeSpeed={100}
              backSpeed={50}
              loop
            />
          </Text>
        </Reveal>
        <Reveal direction="up" distance={40} delay={0.15}>
          <Text sx={{ py: 2, maxWidth: 900, textAlign: 'justify', fontSize: { xs: 15, md: 18 } }}>
            {t('home.desc')}
          </Text>
        </Reveal>
        <Reveal direction="up" distance={40} delay={0.2}>
          <CTAButton
            variant="outlined"
            onClick={() => scrollTo('work')}
            sx={{
              borderColor: ACCENT,
              px: { xs: 2, md: 3 },
              py: { xs: 1, md: 1.5 },
              mt: 2,
              fontWeight: 500,
              fontSize: { xs: 14, md: 16 },
              '&:hover': {
                bgcolor: ACCENT,
                borderColor: ACCENT,
                color: '#0a192f',
              },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              transition: 'all 0.3s',
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'center' },
            }}
          >
            {t('home.cta')}
          </CTAButton>
        </Reveal>
      </Box>
    </Box>
  );
};

export default Home;
