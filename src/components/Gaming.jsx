"use client"

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Box, Paper, Typography, Button, Divider, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Gaming = () => {
  const t = useTranslations();
  const media = [
    { type: 'image', src: "/assets/menu.png" },
    { type: 'image', src: "/assets/orthogonal.png" },
    { type: 'image', src: "/assets/fps.png" },
    { type: 'image', src: "/assets/freecam.png" },
    { type: 'image', src: "/assets/wallrun.png" },
    { type: 'image', src: "/assets/swinging.png" },
    // Add more media items here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0a192f',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          width: '100%',
          mx: 'auto',
          p: { xs: 2, md: 4 },
          bgcolor: '#112240',
          borderRadius: 3,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Typography
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
        </Typography>

        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 3, width: '100%' }}>
          {t('gaming.intro')}
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ width: '100%', textAlign: 'left' }}>
          {t('gaming.objectives')}
        </Typography>

        <Divider sx={{ my: 2, bgcolor: '#ec4899', width: '100%' }} />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: 20, textAlign: 'left', width: '100%', display: 'block' }}>
          {t('gaming.goal1Title')}
        </Typography>
        <Typography variant="body2" sx={{ ml: 1, width: '100%', display: 'block', textAlign: 'left' }}>
          {t('gaming.goal1Desc')}
        </Typography>
        <br />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: 20, textAlign: 'left', width: '100%', display: 'block' }}>
          {t('gaming.goal2Title')}
        </Typography>
        <Typography variant="body2" sx={{ ml: 1, width: '100%', display: 'block', textAlign: 'left' }}>
          {t('gaming.goal2Desc')}
        </Typography>
        <br />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: 20, textAlign: 'left', width: '100%', display: 'block' }}>
          {t('gaming.goal3Title')}
        </Typography>
        <Typography variant="body2" sx={{ ml: 1, width: '100%', display: 'block', textAlign: 'left' }}>
          {t('gaming.goal3Desc')}
        </Typography>
        <br />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: 20, textAlign: 'left', width: '100%', display: 'block' }}>
          {t('gaming.goal4Title')}
        </Typography>
        <Typography variant="body2" sx={{ ml: 1, width: '100%', display: 'block', textAlign: 'left' }}>
          {t('gaming.goal4Desc')}
        </Typography>
        <br />

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