'use client';

import NorthEastIcon from '@mui/icons-material/NorthEast';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Text from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import ProjectPlaceholder from './ProjectPlaceholder';
import ProjectVideo from './ProjectVideo';
import { DIAGRAMS } from './projectVisuals';

export const TILE_RADIUS = 20;
const GALLERY_INTERVAL_MS = 1100;
// Tiles show the leading tags only; the case study lists them all.
const TILE_TAGS = 4;

/**
 * One project in the grid: cover (diagram, demo video or screenshot),
 * number, title and tags. On hover the cover zooms, a spotlight follows the
 * cursor, demo videos play and multi-shot projects flip through their
 * gallery. The tile shares its layoutId with
 * ProjectCaseStudy, so clicking it morphs the tile into the case study.
 */
export default function ProjectTile({ project, index, area, sizes, onOpen }) {
  const t = useTranslations();
  const { key, accent, tags, images } = project;
  // A diagram, or else a demo video (played on hover), replaces the
  // screenshots on the tile.
  const Diagram = DIAGRAMS[project.diagram];
  const { video } = project;
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [hover, setHover] = useState(false);
  const [frame, setFrame] = useState(0);
  const cycling = hover && !reduced && !Diagram && !video && images.length > 1;

  useEffect(() => {
    if (!cycling) return undefined;
    const id = setInterval(() => setFrame((f) => (f + 1) % images.length), GALLERY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [cycling, images.length]);

  // The spotlight reads the cursor position from CSS variables, so moving
  // the mouse doesn't re-render the tile.
  const trackPointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <Box
      component={motion.button}
      type="button"
      layoutId={`project-${key}`}
      aria-haspopup="dialog"
      onClick={(e) => onOpen(key, e.currentTarget)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setFrame(0);
      }}
      onMouseMove={trackPointer}
      style={{ borderRadius: TILE_RADIUS }}
      sx={{
        gridArea: { md: area },
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 260, md: 0 },
        p: 0,
        border: `1px solid ${accent}40`,
        background: '#0b1528',
        cursor: 'pointer',
        textAlign: 'left',
        color: '#fff',
        font: 'inherit',
        boxShadow: hover ? `0 0 0 1px ${accent}90, 0 20px 50px -18px ${accent}80` : 'none',
        transition: 'box-shadow .4s',
        '&:focus-visible': { outline: `2px solid ${accent}`, outlineOffset: 3 },
      }}
    >
      <motion.div layoutId={`project-media-${key}`} style={{ position: 'absolute', inset: 0 }}>
        {Diagram ? (
          <Diagram compact />
        ) : video ? (
          // Nothing is downloaded until the first hover.
          <ProjectVideo video={video} playing={hover && !reduced} preload="none" />
        ) : images.length === 0 ? (
          <ProjectPlaceholder
            projectKey={key}
            accent={accent}
            sx={{ height: '100%', aspectRatio: 'auto', borderRadius: 0, border: 'none' }}
          />
        ) : (
          images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes={sizes}
              style={{
                objectFit: 'cover',
                opacity: i === frame ? 1 : 0,
                transform: hover && !reduced ? 'scale(1.06)' : 'scale(1)',
                transition: 'opacity .5s, transform 1.2s cubic-bezier(.2,.8,.2,1)',
              }}
            />
          ))
        )}
      </motion.div>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(6,12,26,0.95) 0%, rgba(6,12,26,0.55) 40%, rgba(6,12,26,0.05) 75%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: hover ? 1 : 0,
          transition: 'opacity .3s',
          background: `radial-gradient(380px circle at var(--mx) var(--my), ${accent}38, transparent 60%)`,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 38,
          height: 38,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          background: hover ? accent : 'rgba(255,255,255,0.12)',
          color: hover ? '#0a192f' : '#fff',
          backdropFilter: 'blur(6px)',
          transform: hover ? 'rotate(45deg)' : 'none',
          transition: 'all .35s',
        }}
      >
        <NorthEastIcon fontSize="small" />
      </Box>

      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: { xs: 2.5, md: 3 } }}>
        <Text
          component="span"
          sx={{
            display: 'block',
            fontFamily: 'ui-monospace, monospace',
            fontSize: 12,
            color: accent,
            letterSpacing: 2,
            mb: 0.5,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </Text>
        <Text
          component="span"
          sx={{
            display: 'block',
            fontWeight: 800,
            fontSize: { xs: 22, md: 26 },
            lineHeight: 1.15,
            mb: 1.2,
          }}
        >
          {t(`${key}.title`)}
        </Text>
        {tags.length > 0 && (
          <Stack direction="row" gap={0.75} sx={{ flexWrap: 'wrap' }}>
            {tags.slice(0, TILE_TAGS).map((tag) => (
              <Box
                key={tag}
                component="span"
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {tag}
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
