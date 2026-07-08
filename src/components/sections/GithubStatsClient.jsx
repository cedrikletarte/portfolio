"use client";

import { Avatar, Box, Grid, Paper, Stack } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import 'react-github-calendar/tooltips.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FolderIcon from '@mui/icons-material/Folder';
import GitHubIcon from '@mui/icons-material/GitHub';
import InsightsIcon from '@mui/icons-material/Insights';
import { useThemeMode } from '../../theme/ThemeContext';
import OrbitBackground from '../backgrounds/OrbitBackground';
import CTAButton from '../ui/CTAButton';
import ParallaxGlow from '../ui/ParallaxGlow';
import Reveal from '../ui/Reveal';

// The calendar does its own client-side fetch/render pass that never matches
// the server-rendered markup, so it's loaded client-only to avoid a hydration
// mismatch (same pattern already used for the Quill editor in Contact.jsx).
const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const ACCENT = '#a78bfa';

const calendarTheme = {
  light: ['rgba(0,0,0,0.06)', `${ACCENT}40`, `${ACCENT}75`, `${ACCENT}aa`, ACCENT],
  dark: ['rgba(255,255,255,0.06)', `${ACCENT}40`, `${ACCENT}75`, `${ACCENT}aa`, ACCENT],
};

const GithubStatsClient = ({ stats, username }) => {
  const t = useTranslations();
  const { mode } = useThemeMode();
  const [totalContributions, setTotalContributions] = useState(null);

  const maxLangCount = stats?.topLanguages?.[0]?.count ?? 1;

  // The calendar fetches its own data client-side; piggyback on that instead
  // of making a separate call just to get a yearly contribution count.
  // `transformData` runs synchronously during the calendar's render, so the
  // state update is deferred a tick to avoid updating GithubStatsClient while
  // React is in the middle of rendering GitHubCalendar.
  const handleCalendarData = useCallback((data) => {
    const total = data.reduce((sum, day) => sum + day.count, 0);
    setTimeout(() => setTotalContributions(total), 0);
    return data;
  }, []);

  const tiles = stats
    ? [
        { icon: <FolderIcon sx={{ fontSize: 26 }} />, value: stats.publicRepos, label: t('githubStats.repos') },
        { icon: <CalendarMonthIcon sx={{ fontSize: 26 }} />, value: stats.memberSince, label: t('githubStats.memberSince') },
        ...(totalContributions !== null
          ? [{ icon: <InsightsIcon sx={{ fontSize: 26 }} />, value: totalContributions, label: t('githubStats.contributionsYear') }]
          : []),
      ]
    : [];

  return (
    <Box
      component="section"
      name="github"
      sx={{
        width: '100%',
        minHeight: '100vh',
        color: (theme) => theme.palette.text.primary,
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 0 },
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <OrbitBackground />
      <ParallaxGlow origin="55% 30%" color={`${ACCENT}30`} opacity={0.45} />
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, width: '100%', position: 'relative' }}>
        <Box sx={{ pb: 4 }}>
          <Reveal direction="up" distance={40}>
            <Text variant="h3" component="h2" fontWeight="bold" sx={{ borderBottom: `4px solid ${ACCENT}`, fontSize: { xs: 28, md: 36 }, display: 'inline-block' }}>
              {t('githubStats.title')}
            </Text>
          </Reveal>
          <Reveal direction="up" distance={40} delay={0.05}>
            <Text variant="subtitle1" sx={{ py: 2 }}>
              {t('githubStats.desc')}
            </Text>
          </Reveal>
        </Box>

        {!stats ? (
          <Reveal direction="up" distance={40}>
            <Paper elevation={0} sx={{ p: 3, border: `1px solid ${ACCENT}40`, borderRadius: 2, background: 'rgba(255,255,255,0.03)' }}>
              <Text variant="body2">{t('githubStats.unavailable')}</Text>
            </Paper>
          </Reveal>
        ) : (
          <>
            <Grid container spacing={2.5} sx={{ mb: 4, justifyContent: 'center' }}>
              {tiles.map((tile, idx) => (
                <Grid key={tile.label} size={{ xs: 12, sm: 4 }}>
                  <Reveal direction="up" distance={45} delay={idx * 0.05}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        borderRadius: 3,
                        border: `1px solid ${ACCENT}40`,
                        background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : `${ACCENT}08`,
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Box sx={{ width: 48, height: 48, borderRadius: 2, background: `${ACCENT}22`, color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {tile.icon}
                      </Box>
                      <Box>
                        <Text variant="h5" fontWeight="bold" sx={{ lineHeight: 1 }}>{tile.value}</Text>
                        <Text variant="body2" sx={{ opacity: 0.7 }}>{tile.label}</Text>
                      </Box>
                    </Paper>
                  </Reveal>
                </Grid>
              ))}
            </Grid>

            {stats.topLanguages.length > 0 && (
              <Reveal direction="up" distance={45} delay={0.15}>
                <Box sx={{ mb: 4 }}>
                  <Text variant="overline" sx={{ color: ACCENT, letterSpacing: 2, fontWeight: 600, mb: 1.5, display: 'block' }}>
                    {t('githubStats.languagesTitle')}
                  </Text>
                  <Stack spacing={1.2}>
                    {stats.topLanguages.map((lang) => (
                      <Box key={lang.name} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Text variant="body2" sx={{ width: 100, flexShrink: 0, fontWeight: 600 }}>{lang.name}</Text>
                        <Box sx={{ flex: 1, height: 8, borderRadius: 4, background: `${ACCENT}18`, overflow: 'hidden' }}>
                          <Box
                            sx={{
                              height: '100%',
                              width: `${(lang.count / maxLangCount) * 100}%`,
                              background: ACCENT,
                              borderRadius: 4,
                              transition: 'width .6s ease',
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Reveal>
            )}

            <Reveal direction="up" distance={50} delay={0.2}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  border: `1px solid ${ACCENT}30`,
                  background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : `${ACCENT}06`,
                  overflowX: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <GitHubCalendar
                  username={username}
                  colorScheme={mode}
                  theme={calendarTheme}
                  fontSize={12}
                  blockSize={11}
                  blockMargin={3}
                  transformData={handleCalendarData}
                />
              </Paper>
            </Reveal>

            <Reveal direction="up" distance={40} delay={0.25}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 4 }}>
                <Avatar src={stats.avatarUrl} alt={username} sx={{ width: 40, height: 40, border: `2px solid ${ACCENT}` }} />
                <CTAButton
                  variant="outlined"
                  href={stats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  sx={{ borderColor: ACCENT, color: ACCENT, px: 3, py: 1, fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: `${ACCENT}15`, borderColor: ACCENT } }}
                >
                  {t('githubStats.viewProfile')}
                </CTAButton>
              </Box>
            </Reveal>
          </>
        )}
      </Box>
    </Box>
  );
};

export default GithubStatsClient;
