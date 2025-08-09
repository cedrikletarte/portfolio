"use client"

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { scroller } from 'react-scroll';

import Ai from './Ai';
import Gaming from './Gaming';
import Server from './Server';
import Website from './Website';
import Reveal from './Reveal';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Text from '@mui/material/Typography';
import DnsIcon from '@mui/icons-material/Dns';
import LanguageIcon from '@mui/icons-material/Language';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PsychologyIcon from '@mui/icons-material/Psychology';

function Projects() {
  const t = useTranslations();
  const [nav, setnav] = useState('');
  // Only one visual variant (FX abstract) kept – removed previous image toggle

  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, { duration: 800, delay: 0, smooth: 'easeInOutQuart' });
  };

  const handleClick = (e) => {
    if (nav !== e) { setnav(e); scrollTo('handleDetails'); } else { setnav(''); }
  };

  const handleDetails = () => {
    if (nav === 'server') return <Server />;
    if (nav === 'website') return <Website />;
    if (nav === 'gaming') return <Gaming />;
    if (nav === 'AI') return <Ai />;
    return null;
  };

  const projects = [
    { key: 'server', title: t('work.server'), icon: <DnsIcon sx={{ fontSize: 190 }} /> },
    { key: 'website', title: t('work.website'), icon: <LanguageIcon sx={{ fontSize: 190 }} /> },
    { key: 'gaming', title: t('work.gaming'), icon: <SportsEsportsIcon sx={{ fontSize: 190 }} /> },
    { key: 'AI', title: t('work.ai'), icon: <PsychologyIcon sx={{ fontSize: 190 }} /> },
  ];

  const colorMap = {
    server: ['#6fc2b0', '#0d3b66'],
    website: ['#ec4899', '#9333ea'],
    gaming: ['#ec4899', '#f59e0b'],
    AI: ['#6366f1', '#06b6d4'],
  };

  const renderAbstractBG = (projectKey) => {
    const [c1, c2] = colorMap[projectKey];
    return {
      position: 'relative',
      background: `radial-gradient(circle at 25% 30%, ${c1}33, transparent 60%), radial-gradient(circle at 80% 70%, ${c2}33, transparent 65%), linear-gradient(135deg, ${c1}22, ${c2}22)` ,
      overflow: 'hidden'
    };
  };

  return (
    <>
      <Box name="work" sx={{ width: '100%', minHeight: '100vh', color: (theme) => theme.palette.text.primary, py: 6 }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2 }}>
          <Box sx={{ pb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Reveal direction="up" distance={40}>
                <Text variant="h3" component="h2" fontWeight="bold" sx={{ fontWeight: 'bold', borderBottom: '4px solid #ec4899', fontSize: { xs: 28, md: 36 }, display: 'inline-block' }}>
                  {t('work.projects')}
                </Text>
              </Reveal>
              <Reveal direction="up" distance={40} delay={0.05}>
                <Text variant="subtitle1" sx={{ py: 2 }}>
                  {t('work.recent')}
                </Text>
              </Reveal>
            </Box>
            {/* Toggle removed: only FX variant retained */}
          </Box>
          <Grid
            container
            spacing={3}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
          >
            {projects.map((project, idx) => (
              <Grid
                key={project.key}
                size={{ xs: 12, sm: 6, md: "auto" }}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Reveal direction="up" distance={50} delay={idx * 0.07}>
                  <Card
                    sx={{
                      height: 300,
                      width: 300,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      position: 'relative',
                      borderRadius: 3,
                      boxShadow: 6,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform .5s cubic-bezier(.22,.9,.25,1), box-shadow .4s',
                      '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 },
                      ...renderAbstractBG(project.key)
                    }}
                    elevation={6}
                  >
                    {/* Abstract FX background elements */}
                    <span style={{ position: 'absolute', top: -90, left: -90, width: 300, height: 300, background: 'rgba(255,255,255,0.08)', borderRadius: '50%', filter: 'blur(70px)', animation: 'spinSlow 28s linear infinite' }} />
                    <span style={{ position: 'absolute', bottom: -110, right: -110, width: 340, height: 340, background: 'rgba(255,255,255,0.06)', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulseBlob 18s ease-in-out infinite' }} />
                    <Box
                      className="fx-icon"
                      sx={(theme)=> ({
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // In dark mode keep subtle white, in light mode use project accent for contrast
                        color: theme.palette.mode === 'dark' ? '#ffffff' : colorMap[project.key][0],
                        opacity: theme.palette.mode === 'dark' ? 0.15 : 0.22,
                        textShadow: theme.palette.mode === 'dark'
                          ? '0 6px 30px rgba(0,0,0,0.55)'
                          : '0 4px 18px rgba(0,0,0,0.25)',
                        mixBlendMode: theme.palette.mode === 'dark' ? 'normal' : 'multiply',
                        filter: theme.palette.mode === 'dark' ? 'none' : 'saturate(1.2)',
                        transition: 'opacity .6s, transform 1s, color .6s',
                        transform: 'scale(.9)'
                      })}
                    >
                      {project.icon}
                    </Box>
                    <CardActionArea
                      onClick={() => handleClick(project.key)}
                      sx={{
                        height: '100%',
                        width: '100%',
                        bgcolor: 'linear-gradient(180deg,rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)',
                        transition: 'background 0.6s',
                        '&:hover': { bgcolor: 'linear-gradient(180deg,rgba(0,0,0,0.05) 28%, rgba(0,0,0,0.75) 100%)' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        p: 0
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', width: '100%', p: 2, position: 'relative' }}>
                        <Text variant="h5" fontWeight="bold" sx={(theme)=> ({ letterSpacing: .6, mb: .5, color: theme.palette.mode === 'dark' ? '#ffffff' : colorMap[project.key][0] })}>
                          {project.title}
                        </Text>
                        <Box sx={{ height: 4, width: 90, mx: 'auto', borderRadius: 2, background: '#ec4899', opacity: .85 }} />
                      </CardContent>
                    </CardActionArea>
                    <Box sx={{ pointerEvents: 'none', position: 'absolute', inset: 0, '&:hover': {}}} className="hover-accent" />
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box id="handleDetails">{handleDetails()}</Box>
      <style jsx>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseBlob { 0%,100% { transform: scale(1); opacity:.65;} 50% { transform: scale(1.15); opacity:1;} }
        .hover-accent::after { content:''; position:absolute; inset:0; border:2px solid rgba(236,72,153,0); transition: border-color .6s, box-shadow .6s; border-radius:16px; }
        .MuiCard-root:hover .hover-accent::after { border-color: rgba(236,72,153,0.35); box-shadow: 0 0 0 4px rgba(236,72,153,0.12); }
        .MuiCard-root:hover .fx-icon { opacity:.22; transform: scale(1); }
      `}</style>
    </>
  );
}

export default Projects;