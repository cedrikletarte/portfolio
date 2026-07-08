'use client';

import Box from '@mui/material/Box';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

export default function ProjectRail({ projects, activeIndex, onJump }) {
  const t = useTranslations();

  return (
    <Box
      sx={{
        position: 'absolute',
        right: { xs: 12, md: 28 },
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.25,
        zIndex: 2,
      }}
    >
      {projects.map((project, i) => {
        const isActive = i === activeIndex;
        return (
          <Box
            key={project.key}
            component="button"
            type="button"
            onClick={() => onJump(i)}
            aria-label={t(`${project.key}.title`)}
            aria-current={isActive}
            sx={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              p: 0,
              '&:focus-visible': { outline: `2px solid ${project.accent}`, outlineOffset: 2 },
            }}
          >
            <Box
              sx={{
                width: isActive ? 14 : 8,
                height: isActive ? 14 : 8,
                borderRadius: '50%',
                border: `1.5px solid ${project.accent}`,
                background: isActive ? project.accent : 'transparent',
                opacity: isActive ? 1 : 0.5,
                transition: 'all .3s',
              }}
            />
          </Box>
        );
      })}
      <Text variant="caption" sx={{ mt: 0.5, opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>
        {activeIndex + 1} / {projects.length}
      </Text>
    </Box>
  );
}
