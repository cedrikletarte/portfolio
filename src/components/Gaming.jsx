"use client"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Divider, IconButton, Paper, Grid } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Reveal from './Reveal';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SpeedIcon from '@mui/icons-material/Speed';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import GestureIcon from '@mui/icons-material/Gesture';

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
        alignItems: 'flex-start',
        py: 10,
        px: 3,
        position:'relative'
      }}
    >
      <Box sx={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'radial-gradient(circle at 45% 35%, rgba(236,72,153,0.22), transparent 72%)', filter:'blur(70px)', opacity:.55, pointerEvents:'none' }} />
      {/* Paper component for card-like appearance */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          width: '100%',
          mx: 'auto',
          p: { xs: 3, md: 5 },
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          position:'relative',
          overflow:'hidden'
        }}
      >
        <Box sx={{ position:'absolute', inset:0, pointerEvents:'none', '&:before':{content:'""', position:'absolute', inset:0, background:'linear-gradient(160deg, rgba(236,72,153,0.1), transparent 50%)'}}} />
        <Reveal direction="up" distance={40}>
          <Text
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              display: 'inline-block',
              mb: 3,
              textAlign: 'center',
              width: '100%',
              position:'relative'
            }}
          >
            <Box component="span" sx={{ position:'relative', display:'inline-block', px:.5 }}>
              {t('gaming.title')}
              <Box sx={{ position:'absolute', left:0, bottom:-6, height:4, width:'100%', borderRadius:2, background:'#ec4899' }} />
            </Box>
          </Text>
        </Reveal>
        {/* Introduction text */}
        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="body1" sx={{ textAlign: 'justify', mb: 4, width: '100%', lineHeight:1.65 }}>
            {t('gaming.intro')}
          </Text>
        </Reveal>
        {/* Objectives section title */}
        <Reveal direction="up" distance={40}>
          <Text variant="h6" fontWeight="bold" sx={{ width: '100%', textAlign: 'left' }}>
            {t('gaming.objectives')}
          </Text>
        </Reveal>
        {/* Divider for visual separation */}
  <Divider sx={{ my: 4, bgcolor:'transparent', width:'100%', '&:before':{content:'""', display:'block', height:2, width:'100%', background:'linear-gradient(90deg,rgba(236,72,153,0) 0%, #ec4899 50%, rgba(236,72,153,0) 100%)'}}} />
        {/* List of goals with subtitles and descriptions */}
        <Grid container spacing={3} sx={{ mb: 2 }}>
          {[{
            icon:<SportsEsportsIcon />,
            title: t('gaming.goal1Title'),
            desc: t('gaming.goal1Desc')
          },{
            icon:<SpeedIcon />,
            title: t('gaming.goal2Title'),
            desc: t('gaming.goal2Desc')
          },{
            icon:<ThreeDRotationIcon />,
            title: t('gaming.goal3Title'),
            desc: t('gaming.goal3Desc')
          },{
            icon:<GestureIcon />,
            title: t('gaming.goal4Title'),
            desc: t('gaming.goal4Desc')
          }].map((g,i)=>(
            <Grid key={i} size={{ xs:12, sm:6 }}>
              <Reveal direction="up" distance={50} delay={0.05 + i*0.05}>
                <Paper variant="outlined" sx={{ p:2.5, height:'100%', borderColor:'rgba(236,72,153,0.35)', background:(theme)=>theme.palette.mode==='dark'?'rgba(255,255,255,0.03)':'rgba(236,72,153,0.04)', backdropFilter:'blur(4px)', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', gap:1 }}>
                  <Box sx={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(circle at 70% 30%, rgba(236,72,153,0.12), transparent 70%)', opacity:.75 }} />
                  <Box sx={{ display:'flex', alignItems:'center', gap:1, fontSize:20 }}>
                    <Box sx={{ color:'#ec4899' }}>{g.icon}</Box>
                    <Text variant="subtitle1" fontWeight="bold" sx={{ fontSize: 18 }}>{g.title}</Text>
                  </Box>
                  <Text variant="body2" sx={{ lineHeight:1.55, textAlign:'justify' }}>{g.desc}</Text>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Media carousel section with navigation buttons */}
        <Reveal direction="up" distance={60}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 760,
              mx: 'auto',
              my: 4,
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
                  borderRadius: 3,
                  boxShadow: '0 10px 30px -6px rgba(0,0,0,0.45)',
                  border:'1px solid rgba(236,72,153,0.35)',
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
                  borderRadius: 3,
                  boxShadow: '0 10px 30px -6px rgba(0,0,0,0.45)',
                  border:'1px solid rgba(236,72,153,0.35)',
                }}
              />
            )}
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: -10,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(30,30,30,0.55)',
                color: 'white',
                backdropFilter:'blur(4px)',
                '&:hover': { bgcolor: 'rgba(236,72,153,0.8)' },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: -10,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(30,30,30,0.55)',
                color: 'white',
                backdropFilter:'blur(4px)',
                '&:hover': { bgcolor: 'rgba(236,72,153,0.8)' },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
            <Box sx={{ position:'absolute', bottom:-12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:1 }}>
              {media.map((_,i)=>(
                <Box key={i} onClick={()=>setCurrentIndex(i)} sx={{ width: i===currentIndex?20:10, height:10, borderRadius:20, cursor:'pointer', transition:'all .4s', background: i===currentIndex? '#ec4899':'rgba(236,72,153,0.35)' }} />
              ))}
            </Box>
          </Box>
        </Reveal>
      </Paper>
    </Box>
  );
};

export default Gaming;