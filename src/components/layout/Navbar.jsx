'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { scroller } from 'react-scroll';
import { useThemeMode } from '../../theme/ThemeContext';
import MobileDrawer from './MobileDrawer';
import SocialLinks from './SocialLinks';

import { AppBar, Box, Button, IconButton, Toolbar, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';

// Navbar component definition
const Navbar = () => {
  // Initialize translation function
  const t = useTranslations();
  // State for mobile drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Theme mode and toggle function from context
  const { mode, toggleTheme } = useThemeMode();
  // Current locale (fr/en)
  const locale = useLocale();
  // Next.js router for navigation
  const router = useRouter();
  // Mount animation state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // use rAF to ensure after paint
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Function to scroll smoothly to a section by name
  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  // Navigation links for sections
  const navLinks = [
    { label: t('navbar.home'), to: 'home' },
    { label: t('navbar.about'), to: 'about' },
    { label: t('navbar.skills'), to: 'skills' },
    { label: t('navbar.github'), to: 'github' },
    { label: t('navbar.work'), to: 'work' },
    { label: t('navbar.contact'), to: 'contact' },
  ];

  const glassStyles = (theme) => {
    const isDark = theme.palette.mode === 'dark';
    const base = isDark ? '17,34,64' : '255,255,255';
    return {
      backgroundColor: `rgba(${base},0.55)`,
      backdropFilter: 'blur(14px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.5)',
      borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
      boxShadow: isDark ? '0 4px 16px -4px rgba(0,0,0,0.45)' : '0 4px 18px -6px rgba(0,0,0,0.25)',
      transition:
        'background-color .35s, backdrop-filter .35s, opacity .55s ease, transform .55s ease',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(-16px)',
    };
  };

  return (
    <>
      {/* AppBar: main navigation bar, fixed at the top */}
      <AppBar
        position="fixed"
        sx={(theme) => ({ color: theme.palette.text.primary, boxShadow: 0, ...glassStyles(theme) })}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 80 }}>
          {/* Logo and link to homepage */}
          <a href="https://www.cedrikletarte.com" style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/assets/brand/logo.png" alt="Logo" width={50} height={50} priority />
          </a>
          {/* Desktop navigation links and actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {navLinks.map((item) => (
              <Button
                key={item.to}
                color="inherit"
                onClick={() => scrollTo(item.to)}
                className="border-effect"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  borderRadius: 1,
                  transition: 'background-color .3s,color .3s',
                  '&:hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? alpha(theme.palette.primary.main, 0.18)
                        : alpha(theme.palette.primary.main, 0.15),
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
                disableRipple
              >
                {item.label}
              </Button>
            ))}
            {/* Language switch button */}
            <Button
              color="inherit"
              onClick={() => router.replace(`/${locale === 'fr' ? 'en' : 'fr'}`)}
              sx={{ minWidth: 40, fontWeight: 700, textTransform: 'none' }}
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </Button>
            {/* Command palette hint */}
            <Tooltip title={t('commandPalette.hint')} arrow>
              <Box
                component="button"
                type="button"
                onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  border: (theme) =>
                    `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)'}`,
                  background: 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  opacity: 0.75,
                  transition: 'opacity .2s, border-color .2s',
                  '&:hover': { opacity: 1, borderColor: (theme) => theme.palette.primary.main },
                }}
              >
                ⌘K
              </Box>
            </Tooltip>
            {/* Theme toggle button */}
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              aria-label={mode === 'dark' ? t('navbar.lightMode') : t('navbar.darkMode')}
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.warning.main
                    : theme.palette.primary.main,
              }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          {/* Mobile menu button (hamburger icon) */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navLinks={navLinks}
        scrollTo={scrollTo}
      />
      {/* Social icons (desktop only, fixed on the left) */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          position: 'fixed',
          top: '35%',
          left: 0,
          zIndex: 1200,
        }}
      >
        <Box
          component="ul"
          sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}
        >
          <SocialLinks size={52} iconSize="small" tooltipPlacement="right" liftOnHover listItem />
        </Box>
      </Box>
      {/* Spacer for AppBar to avoid content being hidden behind navbar */}
      <Toolbar sx={{ minHeight: 80 }} />
    </>
  );
};

export default Navbar;
