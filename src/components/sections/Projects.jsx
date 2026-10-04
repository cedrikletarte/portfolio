'use client';

import { useTranslations } from 'next-intl';

import BlueprintGridBackground from '../backgrounds/BlueprintGridBackground';
import ParallaxGlow from '../ui/ParallaxGlow';
import ProjectGrid from '../projects/ProjectGrid';
import SectionTitle from '../ui/SectionTitle';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import { projects } from '@/data/projects';

const NAVBAR_HEIGHT = 80;

function Projects() {
  const t = useTranslations();
  const theme = useTheme();
  const ACCENT = theme.palette.primary.main;

  return (
    <Box
      name="work"
      sx={{
        width: '100%',
        minHeight: '100vh',
        color: (theme) => theme.palette.text.primary,
        py: { xs: 4, md: 0 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <BlueprintGridBackground />
        <ParallaxGlow
          top="5%"
          origin="50% 30%"
          color={alpha(ACCENT, 0.16)}
          blur={65}
          opacity={0.55}
        />
      </Box>
      {/* Title + grid, centered vertically in the part of the screen the
          fixed navbar (80px) leaves visible. */}
      <Box
        sx={{
          position: 'relative',
          mt: '-100vh',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: { md: `${NAVBAR_HEIGHT + 24}px` },
          pb: { md: 3 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 3 }, pb: 1 }}>
          <SectionTitle title={t('work.projects')} description={t('work.recent')} />
        </Box>
        <ProjectGrid projects={projects} />
      </Box>
    </Box>
  );
}

export default Projects;
