"use client"

import { useTranslations } from 'next-intl';

import BlueprintGridBackground from './backgrounds/BlueprintGridBackground';
import ParallaxGlow from './ParallaxGlow';
import ProjectsStory from './projects/ProjectsStory';
import Reveal from './Reveal';

import Box from '@mui/material/Box';
import Text from '@mui/material/Typography';

import { projects } from '@/data/projects';

function Projects() {
  const t = useTranslations();

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
        <ParallaxGlow top="5%" origin="50% 30%" color="rgba(236,72,153,0.16)" blur={65} opacity={0.55} />
      </Box>
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, pb: 4, mt: '-100vh', position: 'relative' }}>
        <Reveal direction="up" distance={40}>
          <Text variant="h3" component="h2" fontWeight="bold" sx={{ borderBottom: '4px solid #ec4899', fontSize: { xs: 28, md: 36 }, display: 'inline-block' }}>
            {t('work.projects')}
          </Text>
        </Reveal>
        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="subtitle1" sx={{ py: 2 }}>
            {t('work.recent')}
          </Text>
        </Reveal>
      </Box>

      <ProjectsStory projects={projects} />
    </Box>
  );
}

export default Projects;
