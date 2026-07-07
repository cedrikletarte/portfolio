"use client";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import Reveal from '@/components/ui/Reveal';
import ProjectPanel from './ProjectPanel';
import ProjectRail from './ProjectRail';

const PANEL_VH = 140;
const OVERLAP_FRACTION = 0.55;

function jumpToPanel(containerRef, index, total) {
  const el = containerRef.current;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const containerTop = rect.top + window.scrollY;
  const scrollableRange = rect.height - window.innerHeight;
  const target = containerTop + ((index + 0.5) / total) * scrollableRange;
  window.scrollTo({ top: target, behavior: 'smooth' });
}

export default function ProjectsStory({ projects }) {
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down('md'));
  const simple = reducedMotion || isNarrow;

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(projects.length - 1, Math.max(0, Math.floor(v * projects.length))));
  });

  if (simple) {
    return (
      <Stack spacing={8} sx={{ py: 4 }}>
        {projects.map((project, i) => (
          <Reveal key={project.key} direction="up" distance={50} delay={i * 0.05}>
            <ProjectPanel project={project} index={i} total={projects.length} mode="static" />
          </Reveal>
        ))}
      </Stack>
    );
  }

  return (
    <Box ref={containerRef} sx={{ position: 'relative', height: `${projects.length * PANEL_VH}vh` }}>
      <Box sx={{ position: 'sticky', top: 80, height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
        {projects.map((project, i) => (
          <ProjectPanel
            key={project.key}
            project={project}
            index={i}
            total={projects.length}
            scrollYProgress={scrollYProgress}
            overlap={OVERLAP_FRACTION}
            mode="scroll"
            active={Math.abs(i - activeIndex) <= 1}
          />
        ))}
        <ProjectRail
          projects={projects}
          activeIndex={activeIndex}
          onJump={(i) => jumpToPanel(containerRef, i, projects.length)}
        />
      </Box>
    </Box>
  );
}
