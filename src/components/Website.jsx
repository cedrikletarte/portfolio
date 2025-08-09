"use client"

import { Box, Divider, Paper, Grid } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

const Website = () => {
  // Initialize translation function
  const t = useTranslations();

  return (
    // Main container with centered content and background styling
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: 10,
        px: 3,
        position:'relative'
      }}
    >
      <Box sx={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'radial-gradient(circle at 60% 30%, rgba(236,72,153,0.18), transparent 70%)', filter:'blur(60px)', opacity:.6, pointerEvents:'none' }} />
      {/* Paper component for card-like appearance */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          width: '100%',
          mx: 'auto',
          p: { xs: 3, md: 5 },
          bgcolor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          position:'relative',
          overflow:'hidden'
        }}
      >
        <Box sx={{ position:'absolute', inset:0, pointerEvents:'none', '&:before':{content:'""', position:'absolute', inset:0, background:'linear-gradient(120deg, rgba(236,72,153,0.09), transparent 45%)'}}} />
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
              {t('website.title')}
              <Box sx={{ position:'absolute', left:0, bottom:-6, height:4, width:'100%', borderRadius:2, background:'#ec4899' }} />
            </Box>
          </Text>
        </Reveal>

        {/* Introduction text */}
        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="body1" sx={{ textAlign: 'justify', mb: 4, width: '100%', lineHeight:1.65 }}>
            {t('website.intro')}
          </Text>
        </Reveal>

        {/* Objectives section title */}
        <Reveal direction="up" distance={40}>
          <Text variant="h6" fontWeight="bold" sx={{ width: '100%' }}>
            {t('website.objectives')}
          </Text>
        </Reveal>

        {/* Divider for visual separation */}
  <Divider sx={{ my: 4, bgcolor:'transparent', width:'100%', '&:before':{content:'""', display:'block', height:2, width:'100%', background:'linear-gradient(90deg,rgba(236,72,153,0) 0%, #ec4899 50%, rgba(236,72,153,0) 100%)'}}} />

        {/* Skills section */}
        <Grid container spacing={3}>
          {[{
            title: t('website.skillsTitle'),
            desc: t('website.skillsDesc')
          }, {
            title: t('website.projectsTitle'),
            desc: t('website.projectsDesc')
          }, {
            title: t('website.uxTitle'),
            desc: t('website.uxDesc')
          }, {
            title: t('website.securityTitle'),
            desc: t('website.securityDesc')
          }, {
            title: t('website.designTitle'),
            desc: t('website.designDesc')
          }].map((sect, i) => (
            <Grid key={i} size={{ xs:12, sm:6 }}>
              <Reveal direction="up" distance={50} delay={0.05 + i*0.05}>
                <Paper variant="outlined" sx={{ p:2.5, height:'100%', borderColor:'rgba(236,72,153,0.35)', background:(theme)=>theme.palette.mode==='dark'?'rgba(255,255,255,0.03)':'rgba(236,72,153,0.04)', backdropFilter:'blur(4px)', position:'relative', overflow:'hidden' }}>
                  <Box sx={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(circle at 70% 30%, rgba(236,72,153,0.12), transparent 70%)', opacity:.8 }} />
                  <Text variant="subtitle1" fontWeight="bold" sx={{ fontSize: 20, mb:1 }}>
                    {sect.title}
                  </Text>
                  <Text variant="body2" sx={{ textAlign:'justify', lineHeight:1.55 }}>
                    {sect.desc}
                  </Text>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Reveal direction="up" distance={50} delay={0.4}>
          <Text variant="body1" sx={{ width: '100%', mt:5, lineHeight:1.6, textAlign:'justify' }}>
            {t('website.conclusion')}
          </Text>
        </Reveal>
      </Paper>
    </Box>
  );
};

export default Website;