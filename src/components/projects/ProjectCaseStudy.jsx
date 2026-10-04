'use client';

import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Text from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import CTAButton from '@/components/ui/CTAButton';
import ProjectPlaceholder from './ProjectPlaceholder';
import { TILE_RADIUS } from './ProjectTile';
import {
  DIAGRAMS,
  FALLBACK_HIGHLIGHT_ICON,
  HEADER_ICONS,
  HIGHLIGHT_ICONS,
  renderBold,
} from './projectVisuals';

const FOCUSABLE = 'a[href], button:not([disabled])';
// Gallery entry standing for the project's diagram (screenshots are URLs).
const DIAGRAM = 'diagram';

/**
 * Full details of a project, opened from its tile. Two columns on desktop
 * (gallery left, copy right) so a whole project fits on screen without
 * scrolling; it stacks and scrolls on small screens. Shares the tile's
 * layoutIds so the tile morphs into this dialog. Escape, the close button
 * or the backdrop close it; Tab stays inside while it is open.
 */
export default function ProjectCaseStudy({ project, onClose }) {
  const t = useTranslations();
  const { key, accent, tags, images, repoUrl, liveUrl } = project;
  const Diagram = DIAGRAMS[project.diagram];
  // The diagram (when the project has one) leads the gallery.
  const media = Diagram ? [DIAGRAM, ...images] : images;
  const [current, setCurrent] = useState(media[0]);
  const mediaLabel = (item) =>
    item === DIAGRAM ? t('work.diagram') : t('work.screenshot', { n: images.indexOf(item) + 1 });
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const highlights = t.raw(`${key}.highlights`) ?? [];
  const highlightIcons = HIGHLIGHT_ICONS[key] ?? [];
  const HeaderIcon = HEADER_ICONS[key];
  const title = t(`${key}.title`);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = dialogRef.current.querySelectorAll(FOCUSABLE);
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Copy fades in once the morph is underway.
  const reveal = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };

  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 1400, display: 'grid', placeItems: 'center' }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(4,10,22,0.7)',
          backdropFilter: 'blur(8px)',
        }}
      />
      <Box
        ref={dialogRef}
        component={motion.div}
        layoutId={`project-${key}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ borderRadius: TILE_RADIUS }}
        sx={{
          position: 'relative',
          display: 'flex',
          width: 'min(1200px, 94vw)',
          maxHeight: { xs: '92vh', md: '90vh' },
          overflow: 'hidden',
          background: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          border: `1px solid ${accent}50`,
          boxShadow: `0 40px 120px -30px ${accent}70`,
        }}
      >
        <IconButton
          ref={closeRef}
          onClick={onClose}
          aria-label={t('work.close')}
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 2,
            bgcolor: 'rgba(0,0,0,0.55)',
            color: '#fff',
            '&:hover, &:focus-visible': { bgcolor: accent, color: '#0a192f' },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Scrolls only when the screen is too small to fit everything;
            data-lenis-prevent lets it scroll while the page is frozen. */}
        <Box
          data-lenis-prevent
          sx={{
            flex: 1,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 1fr' },
            gap: { xs: 3, md: 5 },
            p: { xs: 2.5, md: 4.5 },
            alignItems: 'start',
          }}
        >
          <Box>
            <Box
              component={motion.div}
              layoutId={`project-media-${key}`}
              sx={{
                position: 'relative',
                aspectRatio: '16 / 10',
                borderRadius: 3,
                overflow: 'hidden',
                border: `1px solid ${accent}40`,
              }}
            >
              {current === DIAGRAM ? (
                <Diagram />
              ) : current ? (
                <Image
                  key={current}
                  src={current}
                  alt={mediaLabel(current)}
                  fill
                  sizes="(max-width: 900px) 94vw, 640px"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <ProjectPlaceholder
                  projectKey={key}
                  accent={accent}
                  sx={{ height: '100%', aspectRatio: 'auto', borderRadius: 0, border: 'none' }}
                />
              )}
            </Box>
            {media.length > 1 && (
              <Box
                component={motion.div}
                {...reveal}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: 1,
                  mt: 1.5,
                }}
              >
                {media.map((item) => (
                  <Box
                    key={item}
                    component="button"
                    type="button"
                    onClick={() => setCurrent(item)}
                    aria-label={mediaLabel(item)}
                    aria-pressed={item === current}
                    sx={{
                      position: 'relative',
                      aspectRatio: '16 / 9',
                      p: 0,
                      borderRadius: 1.5,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: `2px solid ${item === current ? accent : 'transparent'}`,
                      opacity: item === current ? 1 : 0.6,
                      transition: 'all .25s',
                      '&:hover, &:focus-visible': { opacity: 1 },
                    }}
                  >
                    {item === DIAGRAM ? (
                      <Diagram animated={false} />
                    ) : (
                      <Image src={item} alt="" fill sizes="110px" style={{ objectFit: 'cover' }} />
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Box component={motion.div} {...reveal} sx={{ pr: { md: 4 } }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
              {HeaderIcon && (
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                    color: accent,
                    background: `${accent}20`,
                    border: `1px solid ${accent}50`,
                  }}
                >
                  <HeaderIcon />
                </Box>
              )}
              <Box>
                <Text
                  component="h3"
                  sx={{ fontWeight: 800, fontSize: { xs: 24, md: 30 }, lineHeight: 1.15 }}
                >
                  {title}
                </Text>
              </Box>
            </Stack>

            <Text sx={{ lineHeight: 1.65, mb: 3, opacity: 0.85 }}>{t(`${key}.description`)}</Text>

            <Stack spacing={1.75} sx={{ mb: 3 }}>
              {highlights.map((highlight, i) => {
                const Icon = highlightIcons[i] ?? FALLBACK_HIGHLIGHT_ICON;
                return (
                  <Stack key={i} direction="row" spacing={1.5}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        flexShrink: 0,
                        borderRadius: 1.5,
                        display: 'grid',
                        placeItems: 'center',
                        color: accent,
                        background: `${accent}14`,
                      }}
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Text component="h4" sx={{ fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>
                        {highlight.title}
                      </Text>
                      <Text variant="body2" sx={{ opacity: 0.75, lineHeight: 1.55 }}>
                        {renderBold(highlight.desc)}
                      </Text>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>

            {tags.length > 0 && (
              <Stack direction="row" gap={0.75} sx={{ flexWrap: 'wrap', mb: 3 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ bgcolor: `${accent}15`, color: accent, fontWeight: 600 }}
                  />
                ))}
              </Stack>
            )}
            <Stack direction="row" spacing={2}>
              {repoUrl && (
                <CTAButton
                  variant="outlined"
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  sx={{ borderColor: accent, color: accent, fontWeight: 600 }}
                >
                  {t('navbar.github')}
                </CTAButton>
              )}
              {liveUrl && (
                <CTAButton
                  variant="contained"
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<OpenInNewIcon />}
                  sx={{ bgcolor: accent, color: '#0a192f', fontWeight: 600 }}
                >
                  {t('work.liveDemo')}
                </CTAButton>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
