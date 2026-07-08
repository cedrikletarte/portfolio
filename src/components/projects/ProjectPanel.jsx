'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Text from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

import CTAButton from '@/components/ui/CTAButton';
import ProjectMedia from './ProjectMedia';
import {
  FALLBACK_HIGHLIGHT_ICON,
  HEADER_ICONS,
  HIGHLIGHT_ICONS,
  renderBold,
} from './projectVisuals';

const textColor = (theme, strong = false) =>
  theme.palette.mode === 'dark'
    ? `rgba(255,255,255,${strong ? 0.78 : 0.65})`
    : `rgba(0,0,0,${strong ? 0.72 : 0.6})`;

// Builds a [bounds, output] pair for useTransform, skipping the enter/exit
// segment on edge panels instead of collapsing it into a zero-width range
// (which framer-motion resolves ambiguously right at v=0/v=1).
function edgeAwareRange(
  isFirst,
  isLast,
  enterBounds,
  exitBounds,
  [enterValue, dwellValue, exitValue],
) {
  if (isFirst && isLast) return { bounds: [0, 1], output: [dwellValue, dwellValue] };
  if (isFirst) return { bounds: exitBounds, output: [dwellValue, exitValue] };
  if (isLast) return { bounds: enterBounds, output: [enterValue, dwellValue] };
  return {
    bounds: [...enterBounds, ...exitBounds],
    output: [enterValue, dwellValue, dwellValue, exitValue],
  };
}

function HighlightCard({ Icon, title, desc, items, accent }) {
  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        borderRadius: 2,
        border: `1px solid ${accent}40`,
        background: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : `${accent}08`,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: items?.length ? 1 : 0.5 }}>
        <Box sx={{ color: accent, display: 'flex' }}>
          <Icon sx={{ fontSize: 20 }} />
        </Box>
        <Text variant="subtitle2" component="h4" fontWeight="bold">
          {title}
        </Text>
      </Stack>
      {desc ? (
        <Text variant="body2" sx={{ lineHeight: 1.6, color: (theme) => textColor(theme) }}>
          {renderBold(desc)}
        </Text>
      ) : null}
      {items?.length ? (
        <Stack spacing={0.75} sx={{ mt: 1 }}>
          {items.map((item, i) => (
            <Text
              key={i}
              variant="body2"
              sx={{ lineHeight: 1.5, color: (theme) => textColor(theme) }}
            >
              {renderBold(item)}
            </Text>
          ))}
        </Stack>
      ) : null}
    </Box>
  );
}

export default function ProjectPanel({
  project,
  index,
  total,
  scrollYProgress,
  overlap = 0.3,
  mode,
  active = true,
}) {
  const t = useTranslations();
  const { key, accent, tags, images, repoUrl, liveUrl } = project;

  const span = 1 / total;
  const sliceStart = index * span;
  const sliceEnd = (index + 1) * span;
  const half = (span * overlap) / 2;

  const isFirst = index === 0;
  const isLast = index === total - 1;
  const enterBounds = [sliceStart - half, sliceStart + half];
  const exitBounds = [sliceEnd - half, sliceEnd + half];

  const isScroll = mode === 'scroll';

  const opacityRange = edgeAwareRange(isFirst, isLast, enterBounds, exitBounds, [0, 1, 0]);
  const textYRange = edgeAwareRange(isFirst, isLast, enterBounds, exitBounds, [24, 0, -24]);
  const mediaYRange = edgeAwareRange(isFirst, isLast, enterBounds, exitBounds, [40, 0, -16]);
  const mediaScaleRange = edgeAwareRange(isFirst, isLast, enterBounds, exitBounds, [0.94, 1, 1.04]);

  const dummyProgress = useMotionValue(0);
  const source = scrollYProgress ?? dummyProgress;

  const opacity = useTransform(
    source,
    isScroll ? opacityRange.bounds : [0, 1],
    isScroll ? opacityRange.output : [1, 1],
  );
  const textY = useTransform(
    source,
    isScroll ? textYRange.bounds : [0, 1],
    isScroll ? textYRange.output : [0, 0],
  );
  const mediaY = useTransform(
    source,
    isScroll ? mediaYRange.bounds : [0, 1],
    isScroll ? mediaYRange.output : [0, 0],
  );
  const mediaScale = useTransform(
    source,
    isScroll ? mediaScaleRange.bounds : [0, 1],
    isScroll ? mediaScaleRange.output : [1, 1],
  );
  const pointerEvents = useTransform(opacity, (v) => (v < 0.05 ? 'none' : 'auto'));

  const HeaderIcon = HEADER_ICONS[key];
  const highlightIcons = HIGHLIGHT_ICONS[key] ?? [];
  const highlights = t.raw(`${key}.highlights`) ?? [];

  const outerStyle = isScroll
    ? {
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents,
        willChange: 'opacity, transform',
        contentVisibility: active ? 'visible' : 'hidden',
      }
    : {};

  return (
    <motion.div style={outerStyle}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
          height: '100%',
          maxWidth: 1120,
          mx: 'auto',
          px: { xs: 2, md: 3 },
          py: { xs: 6, md: 0 },
          justifyContent: 'center',
        }}
      >
        <Box
          component={motion.div}
          style={{ y: isScroll ? textY : 0, willChange: isScroll ? 'transform' : undefined }}
          sx={{
            width: '100%',
            flex: { md: '0 0 45%' },
            maxWidth: { md: '45%' },
            mx: { xs: 'auto', md: 0 },
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2.5 }}>
            {HeaderIcon && (
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2.5,
                  background: `linear-gradient(135deg, ${accent}30, ${accent}10)`,
                  border: `1px solid ${accent}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: accent,
                  flexShrink: 0,
                }}
              >
                <HeaderIcon sx={{ fontSize: 30 }} />
              </Box>
            )}
            <Box>
              <Text
                variant="h4"
                component="h3"
                fontWeight="bold"
                sx={{ lineHeight: 1.15, fontSize: { xs: 22, md: 30 } }}
              >
                {t(`${key}.title`)}
              </Text>
              <Box sx={{ height: 3, width: 48, borderRadius: 2, background: accent, mt: 0.6 }} />
            </Box>
          </Stack>

          <Text
            variant="body1"
            sx={{ mb: 3, lineHeight: 1.7, color: (theme) => textColor(theme, true) }}
          >
            {t(`${key}.description`)}
          </Text>

          <Stack spacing={1.5} sx={{ mb: 3 }}>
            {highlights.map((h, i) => (
              <HighlightCard
                key={i}
                Icon={highlightIcons[i] ?? FALLBACK_HIGHLIGHT_ICON}
                title={h.title}
                desc={h.desc}
                items={h.items}
                accent={accent}
              />
            ))}
          </Stack>

          {tags.length > 0 && (
            <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap', mb: 3 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: `${accent}15`,
                    color: accent,
                    border: `1px solid ${accent}40`,
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>
          )}

          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
            {repoUrl && (
              <CTAButton
                variant="outlined"
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon />}
                sx={{
                  borderColor: accent,
                  color: accent,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': { bgcolor: `${accent}15`, borderColor: accent },
                }}
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
                sx={{
                  bgcolor: accent,
                  color: '#0a192f',
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': { bgcolor: accent, filter: 'brightness(1.1)' },
                }}
              >
                {t('work.liveDemo')}
              </CTAButton>
            )}
          </Stack>
        </Box>

        <Box
          component={motion.div}
          style={{
            y: isScroll ? mediaY : 0,
            scale: isScroll ? mediaScale : 1,
            willChange: isScroll ? 'transform' : undefined,
          }}
          sx={{
            width: '100%',
            flex: { md: '0 0 50%' },
            maxWidth: { md: '50%' },
            mx: { xs: 'auto', md: 0 },
          }}
        >
          <ProjectMedia projectKey={key} images={images} accent={accent} />
        </Box>
      </Box>
    </motion.div>
  );
}
