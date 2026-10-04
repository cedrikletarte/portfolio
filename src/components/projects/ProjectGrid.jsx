'use client';

import Box from '@mui/material/Box';
import { AnimatePresence, LayoutGroup, MotionConfig } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import ProjectCaseStudy from './ProjectCaseStudy';
import ProjectTile from './ProjectTile';

// Bento layout for exactly five projects, filled in array order: the first
// project gets the big tile. Below md the tiles simply stack.
const AREAS = ['p1', 'p2', 'p3', 'p4', 'p5'];
const TEMPLATE = `"p1 p1 p1 p1 p2 p2"
                  "p1 p1 p1 p1 p3 p3"
                  "p4 p4 p4 p5 p5 p5"`;
const SIZES = [
  '(max-width: 900px) 100vw, 66vw',
  '(max-width: 900px) 100vw, 33vw',
  '(max-width: 900px) 100vw, 33vw',
  '(max-width: 900px) 100vw, 50vw',
  '(max-width: 900px) 100vw, 50vw',
];

/**
 * All projects on one screen as a bento grid; a tile expands into its case
 * study. MotionConfig honors prefers-reduced-motion for the morph.
 */
export default function ProjectGrid({ projects }) {
  const [openKey, setOpenKey] = useState(null);
  const openerRef = useRef(null);
  const lenis = useLenis();
  const open = projects.find((p) => p.key === openKey);

  const openProject = useCallback((key, opener) => {
    openerRef.current = opener;
    setOpenKey(key);
  }, []);

  const close = useCallback(() => {
    setOpenKey(null);
    openerRef.current?.focus({ preventScroll: true });
  }, []);

  // Freeze the page behind the case study.
  useEffect(() => {
    if (!lenis || !openKey) return undefined;
    lenis.stop();
    return () => lenis.start();
  }, [openKey, lenis]);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <Box
          sx={{
            position: 'relative',
            maxWidth: 1180,
            mx: 'auto',
            px: { xs: 2, md: 3 },
            width: '100%',
            pb: { xs: 4, md: 0 },
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(6, 1fr)' },
            // Grow with the screen height (the section title takes ~270px
            // with the navbar and padding), within readable bounds.
            height: { md: 'clamp(540px, calc(100vh - 270px), 760px)' },
            gridTemplateRows: { md: '25fr 25fr 23fr' },
            gridTemplateAreas: { md: TEMPLATE },
          }}
        >
          {projects.map((project, i) => (
            <ProjectTile
              key={project.key}
              project={project}
              index={i}
              area={AREAS[i]}
              sizes={SIZES[i]}
              onOpen={openProject}
            />
          ))}
        </Box>
        <AnimatePresence>
          {open && <ProjectCaseStudy key={open.key} project={open} onClose={close} />}
        </AnimatePresence>
      </LayoutGroup>
    </MotionConfig>
  );
}
