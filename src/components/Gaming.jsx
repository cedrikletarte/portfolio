"use client"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Divider, IconButton, Paper } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const Gaming = () => {
  // Initialize translation function
  const t = useTranslations();

  // Array of media items (images for now, can add videos)
  const media = [
    { type: 'image', src: "/assets/menu.png" },
    { type: 'image', src: "/assets/orthogonal.png" },
    { type: 'image', src: "/assets/fps.png" },
    { type: 'image', src: "/assets/freecam.png" },
    { type: 'image', src: "/assets/wallrun.png" },
    { type: 'image', src: "/assets/swinging.png" },
    // Add more media items here
  ];

  // State to track the current media index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler for previous media button
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1));
  };

  // Handler for next media button
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    // Main container with centered content and background styling
    <Box
      sx={{
        minHeight: '100vh',
        color: (theme) => theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
      }}
    >
      {/* Paper component for card-like appearance */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          width: '100%',
          mx: 'auto',
          p: { xs: 2, md: 4 },
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        {/* Main title with underline and centered */}
        <Text
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            borderBottom: 3,
            borderBottom: '4px solid #ec4899',
            display: 'inline-block',
            mb: 2,
            textAlign: 'center',
            width: '100%',
          }}
        >
          {t('gaming.title')}
        </Text>
        {/* Introduction text */}
        <Text variant="body1" sx={{ textAlign: 'justify', mb: 3, width: '100%' }}>
          {t('gaming.intro')}
        </Text>
        {/* Objectives section title */}
        <Text variant="h6" fontWeight="bold" sx={{ width: '100%', textAlign: 'left' }}>
          {t('gaming.objectives')}
        </Text>
        {/* Divider for visual separation */}
        <Divider sx={{ my: 2, bgcolor: '#ec4899', width: '100%' }} />
        {/* List of goals with subtitles and descriptions */}
        <Text variant="subtitle1" fontWeight="bold" sx={{ fontSize: 20, textAlign: 'left', width: '100%', display: 'block' }}>
          {t('gaming.goal1Title')}
        </Text>
        <Text variant="body2" sx={{ ml: 1, width: '100%', display: 'block', textAlign: 'left' }}>
          {t('gaming.goal1Desc')}
        </Text>
        <br />

        <Text variant="subtitle1" fontWeight="bold" sx={{ fontSize: 20, textAlign: 'left', width: '100%', display: 'block' }}>
          {t('gaming.goal2Title')}
        </Text>
        <Text variant="body2" sx={{ ml: 1, width: '100%', display: 'block', textAlign: 'left' }}>
          {t('gaming.goal2Desc')}
        </Text>
        <br />

        <Text variant="subtitle1" fontWeight="bold" sx={{ fontSize: 20, textAlign: 'left', width: '100%', display: 'block' }}>
          {t('gaming.goal3Title')}
        </Text>
        <Text variant="body2" sx={{ ml: 1, width: '100%', display: 'block', textAlign: 'left' }}>
          {t('gaming.goal3Desc')}
        </Text>
        <br />

        <Text variant="subtitle1" fontWeight="bold" sx={{ fontSize: 20, textAlign: 'left', width: '100%', display: 'block' }}>
          {t('gaming.goal4Title')}
        </Text>
        <Text variant="body2" sx={{ ml: 1, width: '100%', display: 'block', textAlign: 'left' }}>
          {t('gaming.goal4Desc')}
        </Text>
        <br />

        {/* Media carousel section with navigation buttons */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 700,
            mx: 'auto',
            my: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Display image or video depending on media type */}
          {media[currentIndex].type === 'image' ? (
            <Box
              component="img"
              src={media[currentIndex].src}
              alt={`media-${currentIndex}`}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          ) : (
            <Box
              component="video"
              src={media[currentIndex].src}
              controls
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          )}
          {/* Previous media button */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(30,30,30,0.7)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(236,72,153,0.8)' },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          {/* Next media button */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(30,30,30,0.7)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(236,72,153,0.8)' },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Gaming;