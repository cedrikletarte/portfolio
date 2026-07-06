"use client";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Text from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';

import ProjectPlaceholder from './ProjectPlaceholder';

const FRAME_SX = (accent) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 10',
  borderRadius: 3,
  overflow: 'hidden',
  boxShadow: '0 12px 36px -8px rgba(0,0,0,0.55)',
  border: `1px solid ${accent}40`,
});

export default function ProjectMedia({ projectKey, images, accent }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return <ProjectPlaceholder projectKey={projectKey} accent={accent} />;
  }

  if (images.length === 1) {
    return (
      <Box sx={FRAME_SX(accent)}>
        <Image src={images[0]} alt={`${projectKey} screenshot`} fill sizes="(max-width: 900px) 100vw, 55vw" style={{ objectFit: 'cover' }} />
      </Box>
    );
  }

  const handlePrev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const handleNext = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <Box sx={FRAME_SX(accent)}>
      <Image
        key={images[index]}
        src={images[index]}
        alt={`${projectKey} screenshot ${index + 1}`}
        fill
        sizes="(max-width: 900px) 100vw, 55vw"
        style={{ objectFit: 'cover' }}
      />

      <IconButton
        onClick={handlePrev}
        aria-label="Previous screenshot"
        sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: `${accent}cc` } }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <IconButton
        onClick={handleNext}
        aria-label="Next screenshot"
        sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: `${accent}cc` } }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      <Box sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
        {images.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 20 : 8,
              height: 8,
              borderRadius: 20,
              cursor: 'pointer',
              transition: 'all .35s',
              background: i === index ? accent : `${accent}55`,
            }}
          />
        ))}
      </Box>

      <Box sx={{ position: 'absolute', top: 10, right: 14, bgcolor: 'rgba(0,0,0,0.65)', borderRadius: 10, px: 1.2, py: 0.3 }}>
        <Text variant="caption" sx={{ color: '#fff', fontWeight: 600, letterSpacing: 0.5 }}>
          {index + 1} / {images.length}
        </Text>
      </Box>
    </Box>
  );
}
