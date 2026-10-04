'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Snap from 'lenis/snap';
import { useEffect, useRef, useState } from 'react';

import Reveal from '@/components/ui/Reveal';
import { useMediaQuery as useMatchMedia } from '@/hooks/useMediaQuery';
import ProjectPanel from './ProjectPanel';
import ProjectRail from './ProjectRail';

const PANEL_VH = 140;
const OVERLAP_FRACTION = 0.55;
const STICKY_TOP = 80;

// Scroll offset (inside the tall container) where panel `index` sits fully
// in view: the middle of its slice of the pinned scroll range. The range is
// the container height minus one viewport, matching useScroll's
// ['start start', 'end end'] offsets.
function panelAnchorTop(index, total) {
  return `calc(${(index + 0.5) / total} * (${total * PANEL_VH}vh - 100vh))`;
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
  const lenis = useLenis();
  const anchorsRef = useRef([]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(projects.length - 1, Math.max(0, Math.floor(v * projects.length))));
  });

  // Once the user stops scrolling near a panel, Lenis eases the page onto
  // that panel's anchor. Unlike hijacking the wheel, this keeps trackpad
  // inertia intact and lets the user scroll out of the section freely.
  useEffect(() => {
    if (simple || !lenis) return undefined;
    const snap = new Snap(lenis, {
      type: 'proximity',
      distanceThreshold: '40%',
      debounce: 300,
      duration: 0.9,
    });
    snap.addElements(anchorsRef.current.filter(Boolean));
    return () => {
      snap.stop();
      snap.destroy();
    };
  }, [simple, lenis, projects.length]);

  const jumpToPanel = (index) => {
    const anchor = anchorsRef.current[index];
    if (!anchor) return;
    if (lenis) lenis.scrollTo(anchor, { duration: 1 });
    else anchor.scrollIntoView({ behavior: 'smooth' });
  };

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
      {projects.map((project, i) => (
        <Box
          key={project.key}
          aria-hidden
          ref={(el) => {
            anchorsRef.current[i] = el;
          }}
          sx={{ position: 'absolute', left: 0, top: panelAnchorTop(i, projects.length), height: 0 }}
        />
      ))}
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
        <ProjectRail projects={projects} activeIndex={activeIndex} onJump={jumpToPanel} />
      </Box>
    </Box>
  );
}
