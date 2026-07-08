"use client"

import { useTranslations } from 'next-intl';

import BlueprintGridBackground from '../backgrounds/BlueprintGridBackground';
import ParallaxGlow from '../ui/ParallaxGlow';
import ProjectsStory from '../projects/ProjectsStory';
import SectionTitle from '../ui/SectionTitle';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import { projects } from '@/data/projects';

function Projects() {
  const t = useTranslations();
  const theme = useTheme();
  const ACCENT = theme.palette.primary.main

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
      <Box sx={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <BlueprintGridBackground />
        <ParallaxGlow top="5%" origin="50% 30%" color={alpha(ACCENT, 0.16)} blur={65} opacity={0.55} />
      </Box>
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, pb: 4, mt: '-100vh', position: 'relative' }}>
        <SectionTitle title={t('work.projects')} description={t('work.recent')} />
      </Box>

      <ProjectsStory projects={projects} />
    </Box>
  );
}

export default Projects;
