"use client"

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import LayersIcon from '@mui/icons-material/Layers';
import DnsIcon from '@mui/icons-material/Dns';
import GitHubIcon from '@mui/icons-material/GitHub';
import Reveal from './Reveal';

const ACCENT = '#6fc2b0';

const renderBold = (html) => {
  const parts = html.split(/(<b>.*?<\/b>)/g);
  return parts.map((part, i) => {
    const match = part.match(/^<b>(.*?)<\/b>$/);
    return match ? <strong key={i}>{match[1]}</strong> : part;
  });
};

const SectionHeader = ({ icon, title }) => (
  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
    <Box sx={{
      width: 36, height: 36, borderRadius: 1.5,
      background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}10)`,
      border: `1px solid ${ACCENT}50`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: ACCENT, flexShrink: 0,
    }}>
      {icon}
    </Box>
    <Text variant="h5" fontWeight="bold">{title}</Text>
  </Stack>
);

const Server = () => {
  const t = useTranslations();

  return (
    <Box sx={{ minHeight: '100vh', color: (theme) => theme.palette.text.primary, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', py: 10, px: 3, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: `radial-gradient(circle at 50% 30%, ${ACCENT}30, transparent 70%)`, filter: 'blur(70px)', opacity: .45, pointerEvents: 'none' }} />
      <Paper elevation={0} sx={{ maxWidth: 1000, width: '100%', mx: 'auto', p: { xs: 3, md: 5 }, bgcolor: (theme) => theme.palette.background.default, borderRadius: 3, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', '&:before': { content: '""', position: 'absolute', inset: 0, background: `linear-gradient(140deg, ${ACCENT}12, transparent 40%)` } }} />

        {/* Header */}
        <Reveal direction="up" distance={40}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: 2.5, background: `linear-gradient(135deg, ${ACCENT}30, ${ACCENT}10)`, border: `1px solid ${ACCENT}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, flexShrink: 0 }}>
              <DnsIcon sx={{ fontSize: 36 }} />
            </Box>
            <Box>
              <Text variant="h3" component="h1" fontWeight="bold" sx={{ lineHeight: 1.1 }}>{t('server.title')}</Text>
              <Box sx={{ height: 4, width: 56, borderRadius: 2, background: ACCENT, mt: 0.75 }} />
            </Box>
          </Box>
        </Reveal>

        <Reveal direction="up" distance={40} delay={0.05}>
          <Text variant="body1" sx={{ textAlign: 'justify', mb: 5, lineHeight: 1.7, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.72)' }}>
            {t('server.intro')}
          </Text>
        </Reveal>

        {/* Docker */}
        <Reveal direction="up" distance={50} delay={0.1}>
          <Box sx={{ mb: 4 }}>
            <SectionHeader icon={<LayersIcon sx={{ fontSize: 20 }} />} title={t('server.dockerTitle')} />
            <Text variant="body2" sx={{ mb: 2.5, textAlign: 'justify', lineHeight: 1.6, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)' }}>
              {t('server.dockerDesc')}
            </Text>
            <Grid container spacing={2}>
              {t.raw('server.dockerList').map((item, idx) => (
                <Grid key={`docker-${idx}`} size={{ xs: 12, sm: 6 }}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', borderColor: `${ACCENT}50`, background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : `${ACCENT}08`, backdropFilter: 'blur(4px)', display: 'flex', gap: 1.2, borderRadius: 2 }}>
                    <CheckCircleIcon sx={{ color: ACCENT, mt: .2, fontSize: 20, flexShrink: 0 }} />
                    <Text variant="body2" component="div" sx={{ lineHeight: 1.55 }}>{renderBold(item)}</Text>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Reveal>

        <Divider sx={{ my: 4, '&::before': { display: 'none' }, '&::after': { display: 'none' }, height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT}60, transparent)` }} />

        {/* Security */}
        <Reveal direction="up" distance={50}>
          <Box sx={{ mb: 4 }}>
            <SectionHeader icon={<SecurityIcon sx={{ fontSize: 20 }} />} title={t('server.securityTitle')} />
            <Text variant="body2" sx={{ mb: 2.5, textAlign: 'justify', lineHeight: 1.6, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)' }}>
              {t('server.securityDesc')}
            </Text>
            <Grid container spacing={2}>
              {t.raw('server.securityList').map((item, idx) => (
                <Grid key={`security-${idx}`} size={{ xs: 12, sm: 6 }}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', borderColor: `${ACCENT}50`, background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : `${ACCENT}08`, backdropFilter: 'blur(4px)', display: 'flex', gap: 1.2, borderRadius: 2 }}>
                    <CheckCircleIcon sx={{ color: ACCENT, mt: .2, fontSize: 20, flexShrink: 0 }} />
                    <Text variant="body2" component="div" sx={{ lineHeight: 1.55 }}>{renderBold(item)}</Text>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Reveal>

        <Divider sx={{ my: 4, '&::before': { display: 'none' }, '&::after': { display: 'none' }, height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT}60, transparent)` }} />

        {/* Automation */}
        <Reveal direction="up" distance={50}>
          <Box sx={{ mb: 4 }}>
            <SectionHeader icon={<AutoAwesomeMotionIcon sx={{ fontSize: 20 }} />} title={t('server.autoTitle')} />
            <Text variant="body2" sx={{ textAlign: 'justify', lineHeight: 1.6, color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)' }}>
              {t.rich('server.autoDesc', { b: (chunks) => <strong>{chunks}</strong> })}
            </Text>
          </Box>
        </Reveal>

        {/* Tech chips */}
        <Reveal direction="up" distance={60}>
          <Box sx={{ mt: 2 }}>
            <Text variant="overline" sx={{ color: ACCENT, letterSpacing: 2, fontWeight: 600, mb: 2, display: 'block' }}>
              Technologies
            </Text>
            <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
              {t.raw('server.techs').map((tech) => (
                <Box key={tech} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={`/assets/${tech.toLowerCase()}.png`}
                    alt={tech}
                    variant="rounded"
                    sx={{ width: 52, height: 52, border: `1px solid ${ACCENT}40`, background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : '#fff', p: .5 }}
                  />
                  <Chip label={tech} size="small" sx={{ fontSize: '0.7rem', height: 22, bgcolor: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}40`, fontWeight: 600 }} />
                </Box>
              ))}
            </Stack>
          </Box>
        </Reveal>

        {/* GitHub link */}
        <Reveal direction="up" distance={40} delay={0.1}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              href="https://github.com/cedrikletarte/homelab-infra"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
              sx={{ borderColor: ACCENT, color: ACCENT, px: 3, py: 1, fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: `${ACCENT}15`, borderColor: ACCENT } }}
            >
              {t('navbar.github')}
            </Button>
          </Box>
        </Reveal>
      </Paper>
    </Box>
  );
};

export default Server;
