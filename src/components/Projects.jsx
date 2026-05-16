"use client"

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { scroller } from 'react-scroll';

import Ai from './Ai';
import Earth from './Earth';
import Gaming from './Gaming';
import Server from './Server';
import Website from './Website';
import Reveal from './Reveal';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Text from '@mui/material/Typography';
import DnsIcon from '@mui/icons-material/Dns';
import LanguageIcon from '@mui/icons-material/Language';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PublicIcon from '@mui/icons-material/Public';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Projects() {
  const t = useTranslations();
  const [nav, setnav] = useState('');

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
    if (nav === 'earth') return <Earth />;
    return null;
  };

  const projects = [
    { key: 'server',  title: t('work.server'),  icon: DnsIcon,            accent: '#6fc2b0' },
    { key: 'website', title: t('work.website'), icon: LanguageIcon,       accent: '#ec4899' },
    { key: 'gaming',  title: t('work.gaming'),  icon: SportsEsportsIcon,  accent: '#f59e0b' },
    { key: 'AI',      title: t('work.ai'),      icon: PsychologyIcon,     accent: '#6366f1' },
    { key: 'earth',   title: t('work.earth'),   icon: PublicIcon,         accent: '#22d3ee' },
  ];

  return (
    <>
      <Box
        name="work"
        sx={{
          width: '100%',
          minHeight: '100vh',
          color: (theme) => theme.palette.text.primary,
          display: 'flex',
          alignItems: 'center',
          py: { xs: 4, md: 0 },
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle at 50% 30%, rgba(236,72,153,0.16), transparent 70%)', filter: 'blur(65px)', opacity: .55, pointerEvents: 'none' }} />
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, width: '100%', position: 'relative' }}>
          <Box sx={{ pb: 4 }}>
            <Reveal direction="up" distance={40}>
              <Text variant="h3" component="h2" fontWeight="bold" sx={{ borderBottom: '4px solid #ec4899', fontSize: { xs: 28, md: 36 }, display: 'inline-block' }}>
                {t('work.projects')}
              </Text>
            </Reveal>
            <Reveal direction="up" distance={40} delay={0.05}>
              <Text variant="subtitle1" sx={{ py: 2 }}>
                {t('work.recent')}
              </Text>
            </Reveal>
          </Box>
          

          <Grid container spacing={3} justifyContent="center">
            {projects.map((project, idx) => {
              const Icon = project.icon;
              const isActive = nav === project.key;
              return (
                <Grid key={project.key} size={{ xs: 6, sm: 6, md: 3 }}>
                  <Reveal direction="up" distance={50} delay={idx * 0.07} style={{ width: '100%' }}>
                    <Paper
                      elevation={0}
                      onClick={() => handleClick(project.key)}
                      sx={{
                        width: '100%',
                        height: { xs: 160, sm: 220 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        borderRadius: 3,
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        backdropFilter: 'blur(6px)',
                        background: (theme) => theme.palette.mode === 'dark'
                          ? `radial-gradient(circle at 40% 30%, ${project.accent}22, transparent 60%), rgba(255,255,255,0.03)`
                          : `radial-gradient(circle at 40% 30%, ${project.accent}18, transparent 60%), rgba(255,255,255,0.7)`,
                        border: isActive
                          ? `1.5px solid ${project.accent}`
                          : '1px solid rgba(236,72,153,0.3)',
                        boxShadow: isActive
                          ? `0 0 0 3px ${project.accent}30, 0 16px 40px -8px rgba(0,0,0,0.5)`
                          : '0 4px 20px -4px rgba(0,0,0,0.3)',
                        transition: 'transform .45s cubic-bezier(.22,.9,.25,1), box-shadow .4s, border-color .4s',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          background: `radial-gradient(circle at 50% 40%, ${project.accent}35, transparent 65%)`,
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity .45s',
                        },
                        '&:hover:before': { opacity: 1 },
                        '&:hover': {
                          transform: 'translateY(-7px) scale(1.03)',
                          boxShadow: `0 0 0 2px ${project.accent}50, 0 20px 44px -10px rgba(0,0,0,0.55)`,
                          borderColor: project.accent,
                        },
                      }}
                    >
                      <Box sx={{ color: project.accent, position: 'relative', zIndex: 1, transition: 'transform .4s', '.MuiPaper-root:hover &': { transform: 'scale(1.12)' } }}>
                        <Icon sx={{ fontSize: { xs: 40, sm: 56 } }} />
                      </Box>
                      <Text variant="subtitle1" fontWeight="bold" sx={{ textAlign: 'center', px: 2, position: 'relative', zIndex: 1, lineHeight: 1.3, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        {project.title}
                      </Text>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, position: 'relative', zIndex: 1 }}>
                        <Box sx={{ height: 3, width: isActive ? 40 : 28, borderRadius: 2, background: project.accent, transition: 'width .4s' }} />
                        <ArrowForwardIcon sx={{ fontSize: 14, color: project.accent, opacity: isActive ? 1 : 0, transform: isActive ? 'translateX(0)' : 'translateX(-6px)', transition: 'opacity .3s, transform .3s' }} />
                      </Box>
                    </Paper>
                  </Reveal>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <Box id="handleDetails">{handleDetails()}</Box>
    </>
  );
}

export default Projects;
