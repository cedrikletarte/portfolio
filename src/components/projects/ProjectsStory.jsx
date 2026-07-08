'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import Reveal from '@/components/ui/Reveal';
import { useMediaQuery as useMatchMedia } from '@/hooks/useMediaQuery';
import ProjectPanel from './ProjectPanel';
import ProjectRail from './ProjectRail';

const PANEL_VH = 140;
const OVERLAP_FRACTION = 0.55;
const STICKY_TOP = 80;
const JUMP_LOCK_MS = 700;

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
  const reducedMotion = useMatchMedia('(prefers-reduced-motion: reduce)');
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down('md'));
  const simple = reducedMotion || isNarrow;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const lockedRef = useRef(false);
  const unlockTimerRef = useRef(null);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(projects.length - 1, Math.max(0, Math.floor(v * projects.length))));
  });

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (simple) return undefined;

    function onWheel(e) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pinned = rect.top <= STICKY_TOP && rect.bottom > window.innerHeight;
      if (!pinned) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const targetIndex = activeIndexRef.current + direction;
      if (targetIndex < 0 || targetIndex > projects.length - 1) return;

      e.preventDefault();
      if (lockedRef.current) return;

      lockedRef.current = true;
      jumpToPanel(containerRef, targetIndex, projects.length);
      window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = window.setTimeout(() => {
        lockedRef.current = false;
      }, JUMP_LOCK_MS);
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.clearTimeout(unlockTimerRef.current);
    };
  }, [simple, projects.length]);

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
    <Box
      ref={containerRef}
      sx={{ position: 'relative', height: `${projects.length * PANEL_VH}vh` }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: STICKY_TOP,
          height: `calc(100vh - ${STICKY_TOP}px)`,
          overflow: 'hidden',
        }}
      >
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
