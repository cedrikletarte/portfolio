"use client"

import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import LayersIcon from '@mui/icons-material/Layers';
import Reveal from './Reveal';

const Server = () => {
  // Initialize translation function
  const t = useTranslations();
  // Technologies needing subdued styling (avoid double pink emphasis)
  const subduedTechs = ['cloudflare','wireguard','plex','vaultwarden'];

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
        position: 'relative'
      }}
    >
      {/* soft background glow */}
      <Box sx={{ position:'absolute', top: 0, left: '50%', transform:'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle at 50% 30%, rgba(236,72,153,0.18), transparent 70%)', filter:'blur(60px)', opacity: .6, pointerEvents:'none' }} />
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
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position:'absolute', inset:0, pointerEvents:'none', '&:before':{content:'""', position:'absolute', inset:0, background:'linear-gradient(140deg, rgba(236,72,153,0.08), transparent 40%)'}}} />
        {/* Main title with underline and centered */}
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
              {t('server.title')}
              <Box sx={{ position:'absolute', left:0, bottom:-6, height:4, width:'100%', borderRadius:2, background:'#ec4899' }} />
            </Box>
          </Text>
        </Reveal>

        {/* Introduction text */}
        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="body1" sx={{ textAlign: 'justify', mb: 4, width: '100%', lineHeight:1.65 }}>
            {t('server.intro')}
          </Text>
        </Reveal>

        {/* Docker Section */}
        <Reveal direction="up" distance={50} delay={0.1}>
          <Box sx={{ width:'100%', mb:3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb:1 }}>
              <LayersIcon sx={{ color:'#ec4899' }} />
              <Text variant="h5" fontWeight="bold">{t('server.dockerTitle')}</Text>
            </Stack>
            <Text variant="body2" sx={{ mb: 2, width: '100%', textAlign:'justify', lineHeight:1.55 }}>
              {t('server.dockerDesc')}
            </Text>
            <Grid container spacing={2}>
              {t.raw('server.dockerList').map((item, idx) => (
                <Grid key={idx} size={{ xs:12, sm:6 }}>
                  <Paper variant="outlined" sx={{ p:2, height:'100%', borderColor:'rgba(236,72,153,0.35)', background:(theme)=>theme.palette.mode==='dark'?'rgba(255,255,255,0.03)':'rgba(236,72,153,0.04)', backdropFilter:'blur(4px)', display:'flex', gap:1.2 }}>
                    <CheckCircleIcon sx={{ color:'#ec4899', mt:.2, fontSize:22 }} />
                    <Text variant="body2" component="div" sx={{ lineHeight:1.5, textAlign:'justify' }} dangerouslySetInnerHTML={{ __html: item }} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Reveal>

        {/* Divider for visual separation */}
        <Divider sx={{ my: 5, bgcolor: 'transparent', width: '100%', '&:before':{content:'""', display:'block', height:2, width:'100%', background:'linear-gradient(90deg,rgba(236,72,153,0) 0%, #ec4899 50%, rgba(236,72,153,0) 100%)' } }} />

        {/* Security Section */}
        <Reveal direction="up" distance={50}>
          <Box sx={{ width:'100%', mb:3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb:1 }}>
              <SecurityIcon sx={{ color:'#ec4899' }} />
              <Text variant="h5" fontWeight="bold">{t('server.securityTitle')}</Text>
            </Stack>
            <Text variant="body2" sx={{ mb: 2, width: '100%', textAlign:'justify', lineHeight:1.55 }}>
              {t('server.securityDesc')}
            </Text>
            <Grid container spacing={2}>
              {t.raw('server.securityList').map((item, idx) => (
                <Grid key={idx} size={{ xs:12, sm:6 }}>
                  <Paper variant="outlined" sx={{ p:2, height:'100%', borderColor:'rgba(236,72,153,0.35)', background:(theme)=>theme.palette.mode==='dark'?'rgba(255,255,255,0.03)':'rgba(236,72,153,0.04)', backdropFilter:'blur(4px)', display:'flex', gap:1.2 }}>
                    <CheckCircleIcon sx={{ color:'#ec4899', mt:.2, fontSize:22 }} />
                    <Text variant="body2" component="div" sx={{ lineHeight:1.5, textAlign:'justify' }} dangerouslySetInnerHTML={{ __html: item }} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Reveal>

        {/* Divider for visual separation */}
        <Divider sx={{ my: 5, bgcolor: 'transparent', width: '100%', '&:before':{content:'""', display:'block', height:2, width:'100%', background:'linear-gradient(90deg,rgba(236,72,153,0) 0%, #ec4899 50%, rgba(236,72,153,0) 100%)' } }} />

        {/* Automation Section */}
        <Reveal direction="up" distance={50}>
          <Box sx={{ width:'100%', mb:2 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb:1 }}>
              <AutoAwesomeMotionIcon sx={{ color:'#ec4899' }} />
              <Text variant="h5" fontWeight="bold">{t('server.autoTitle')}</Text>
            </Stack>
            <Text variant="body2" sx={{ mb: 2, width: '100%', textAlign:'justify', lineHeight:1.55 }}>
              {t.rich('server.autoDesc', { b: (chunks) => <b>{chunks}</b> })}
            </Text>
          </Box>
        </Reveal>

        {/* Technologies Grid */}
        <Reveal direction="up" distance={60}>
          <Grid
            container
            spacing={3}
            sx={{ mt: 3 }}
            justifyContent="center"
            alignItems="stretch"
          >
            {t.raw('server.techs').map((tech) => {
              const key = tech.toLowerCase();
              const isSubdued = subduedTechs.includes(key);
              return (
              <Grid
                size={{ xs: 6, sm: 3 }}
                key={tech}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    width: 160,
                    height: 160,
                    textAlign: 'center',
                    background:(theme)=>theme.palette.mode==='dark'
                      ? (isSubdued ? 'linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))' : 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))')
                      : (isSubdued ? 'linear-gradient(145deg, #ffffff, #fafafa)' : 'linear-gradient(145deg, #ffffff, #f8f8f8)'),
                    border: isSubdued
                      ? (theme)=> theme.palette.mode==='dark' ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.08)'
                      : '1px solid rgba(236,72,153,0.35)',
                    boxShadow:'0 4px 18px -4px rgba(0,0,0,0.25)',
                    transition: 'transform .5s cubic-bezier(.22,.9,.25,1), box-shadow .45s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    position:'relative',
                    overflow:'hidden',
                    '&:before':{content:'""', position:'absolute', inset:0, background: isSubdued ? 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.15), transparent 75%)' : 'radial-gradient(circle at 30% 20%, rgba(236,72,153,0.18), transparent 70%)', opacity:0, transition:'opacity .6s'},
                    '&:hover:before':{opacity:1},
                    '&:hover': { transform: 'translateY(-6px) scale(1.04)', boxShadow:'0 10px 28px -6px rgba(0,0,0,0.45)' },
                  }}
                >
                  <Avatar
                    src={`/assets/${tech.toLowerCase()}.png`}
                    alt={tech}
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 1,
                      position:'relative'
                    }}
                    variant="rounded"
                  />
                  <Text variant="subtitle2" sx={{ fontWeight:600, letterSpacing:.5 }}>
                    {tech}
                  </Text>
                </Paper>
              </Grid>
            );})}
          </Grid>
        </Reveal>
      </Paper>
    </Box>
  );
};

export default Server;