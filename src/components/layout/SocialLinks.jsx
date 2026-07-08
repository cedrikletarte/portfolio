"use client";

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SchoolIcon from '@mui/icons-material/School';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { useCvDownload } from '../../hooks/useCvDownload';

// Shared glassy social icon style (used by every rendering of SocialLinks).
const socialIconStyles = (theme) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(255,255,255,0.07)'
    : 'rgba(0,0,0,0.05)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(255,255,255,0.15)'
    : '1px solid rgba(0,0,0,0.08)',
  backdropFilter: 'blur(8px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(8px) saturate(1.4)',
  color: theme.palette.text.primary,
  transition: 'background .35s, box-shadow .45s, transform .45s, border-color .45s',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 18px -6px rgba(0,0,0,0.55)'
    : '0 4px 14px -6px rgba(0,0,0,0.25)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(circle at 35% 30%, ${alpha(theme.palette.primary.main, 0.35)}, transparent 70%)`,
    opacity: 0,
    transition: 'opacity .6s'
  },
  '&:hover:before': { opacity: 0.55 },
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.11)'
      : 'rgba(0,0,0,0.07)',
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 10px 26px -8px rgba(0,0,0,0.65)'
      : '0 10px 24px -8px rgba(0,0,0,0.3)',
    borderColor: alpha(theme.palette.primary.main, 0.5)
  },
  '&:active': { transform: 'translateY(-1px) scale(.97)' },
  '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 }
});

// GitHub / Email / CV-download icon buttons — rendered both at the bottom of
// the mobile drawer and pinned to the side of the page on desktop, styled
// slightly differently in each spot via props.
export default function SocialLinks({
  size = 52,
  iconSize = 'small',
  tooltipPlacement = 'top',
  liftOnHover = false,
  listItem = false,
}) {
  const t = useTranslations();
  const { download: handleDownload, loading } = useCvDownload();

  const items = [
    {
      label: t('navbar.github'),
      href: 'https://github.com/cedrikletarte',
      icon: <GitHubIcon fontSize={iconSize} />,
    },
    {
      label: t('navbar.email'),
      href: 'mailto:cedrikletarte@gmail.com',
      icon: <MailOutlinedIcon fontSize={iconSize} />,
    },
    {
      label: t('navbar.downloadCv'),
      onClick: handleDownload,
      disabled: loading,
      icon: loading ? <CircularProgress size={iconSize === 'small' ? 18 : 26} color="inherit" /> : <SchoolIcon fontSize={iconSize} />,
    },
  ];

  return items.map((item) => {
    const button = (
      <Tooltip title={item.label} arrow placement={tooltipPlacement}>
        <IconButton
          component={item.href ? 'a' : 'button'}
          href={item.href}
          onClick={item.onClick}
          target={item.href ? '_blank' : undefined}
          rel={item.href ? 'noopener noreferrer' : undefined}
          aria-label={item.label}
          color="inherit"
          disabled={item.disabled}
          sx={(theme) => ({
            width: size,
            height: size,
            ...socialIconStyles(theme),
            ...(liftOnHover ? { '&:hover': { ...socialIconStyles(theme)['&:hover'], transform: 'translateY(-3px) scale(1.05)' } } : {}),
          })}
        >
          {item.icon}
        </IconButton>
      </Tooltip>
    );

    return listItem ? (
      <Box key={item.label} component="li" sx={{ ml: 0 }}>
        {button}
      </Box>
    ) : (
      <Fragment key={item.label}>{button}</Fragment>
    );
  });
}
