"use client"

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { scroller } from 'react-scroll';
import { useThemeMode } from '../theme/ThemeContext';

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
} from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';

// Navbar component definition
const Navbar = () => {
  // Initialize translation function
  const t = useTranslations()
  // State for mobile drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false)
  // State for loading spinner (CV download)
  const [loading, setLoading] = useState(false)
  // Glass toujours actif
  const scrolled = true;
  // Theme mode and toggle function from context
  const { mode, toggleTheme } = useThemeMode();
  // Current locale (fr/en)
  const locale = useLocale()
  // Next.js router for navigation
  const router = useRouter()
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
    })
  }

  // Handler for downloading the CV (shows loading spinner briefly)
  const handleDownload = () => {
    setLoading(true)
    downloadFile()
    setTimeout(() => setLoading(false), 300)
  }

  // Helper to trigger file download for the correct locale
  const downloadFile = () => {
    const fileUrl = locale === 'fr' ? '/cv_fr.pdf' : '/cv_en.pdf'
    const filename = "Cedrik_Letarte_CV.pdf"
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = filename
    link.click()
  }

  // Navigation links for sections
  const navLinks = [
    { label: t('navbar.home'), to: 'home' },
    { label: t('navbar.about'), to: 'about' },
    { label: t('navbar.skills'), to: 'skills' },
    { label: t('navbar.work'), to: 'work' },
    { label: t('navbar.contact'), to: 'contact' },
  ]

  const glassStyles = (theme) => {
    const isDark = theme.palette.mode === 'dark';
    const base = isDark ? '17,34,64' : '255,255,255';
    return {
      backgroundColor: `rgba(${base},0.55)`,
      backdropFilter: 'blur(14px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.5)',
      borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
      boxShadow: isDark ? '0 4px 16px -4px rgba(0,0,0,0.45)' : '0 4px 18px -6px rgba(0,0,0,0.25)',
      transition: 'background-color .35s, backdrop-filter .35s, opacity .55s ease, transform .55s ease',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(-16px)'
    };
  };

  // Shared glassy social icon style
  const socialIconStyles = (theme) => ({
    background: theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.07)'
      : 'rgba(0,0,0,0.05)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(255,255,255,0.15)'
      : '1px solid rgba(0,0,0,0.08)',
    backdropFilter: 'blur(8px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(8px) saturate(1.4)',
    color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.primary,
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
      background: 'radial-gradient(circle at 35% 30%, rgba(236,72,153,0.35), transparent 70%)',
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
      borderColor: 'rgba(236,72,153,0.5)'
    },
    '&:active': { transform: 'translateY(-1px) scale(.97)' },
    '&:focus-visible': { outline: '2px solid #ec4899', outlineOffset: 2 }
  });

  return (
    <>
      {/* AppBar: main navigation bar, fixed at the top */}
      <AppBar position="fixed" sx={(theme) => ({ color: theme.palette.text.primary, boxShadow: 0, ...glassStyles(theme) })}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 80 }}>
          {/* Logo and link to homepage */}
          <a href="https://www.cedrikletarte.com" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo2.png" alt="Logo" style={{ width: 50 }} />
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
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                      ? 'rgba(236,72,153,0.18)'
                      : 'rgba(236,72,153,0.15)',
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
            {/* Theme toggle button */}
            <IconButton onClick={toggleTheme} color="inherit"
              sx={{
                color: (theme) => theme.palette.mode === 'dark'
                  ? theme.palette.warning.main
                  : theme.palette.primary.main
              }}
            >
              {mode === 'dark'
                ? <Brightness7Icon />
                : <Brightness4Icon />
              }
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
      {/* Drawer for mobile navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { background: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.text.primary, width: 250 }
        }}
      >
        <Box sx={{ mt: 2 }}>
          <List>
            {/* Navigation links in drawer */}
            {navLinks.map((item) => (
              <ListItem key={item.to} disablePadding>
                <ListItemButton
                  onClick={() => {
                    scrollTo(item.to)
                    setDrawerOpen(false)
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {/* Language switch in drawer */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  router.replace(`/${locale === 'fr' ? 'en' : 'fr'}`)
                  setDrawerOpen(false)
                }}
              >
                <ListItemText primary={locale === 'fr' ? 'EN' : 'FR'} />
              </ListItemButton>
            </ListItem>
            {/* Theme toggle in drawer */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  toggleTheme();
                  setDrawerOpen(false);
                }}
                sx={{
                  color: (theme) => theme.palette.mode === 'dark'
                    ? theme.palette.warning.main
                    : theme.palette.primary.main
                }}
              >
                <ListItemText
                  primary={mode === 'dark' ? t('navbar.lightMode') || 'Light Mode' : t('navbar.darkMode') || 'Dark Mode'}
                />
                {mode === 'dark'
                  ? <Brightness7Icon sx={{ ml: 1 }} />
                  : <Brightness4Icon sx={{ ml: 1 }} />
                }
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        {/* Social icons at the bottom of the Drawer */}
        <Box
          sx={{
            mt: 'auto',
            mb: 2,
            px: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* GitHub icon */}
          <Tooltip title="GitHub" arrow placement="top">
            <IconButton
              component="a"
              href="https://github.com/cedrikletarte"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              color="inherit"
              sx={(theme)=> ({ width:58, height:58, ...socialIconStyles(theme) })}
            >
              <GitHubIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          {/* Email icon */}
          <Tooltip title="Email" arrow placement="top">
            <IconButton
              component="a"
              href="mailto:cedrikletarte@gmail.com"
              aria-label="Email"
              color="inherit"
              sx={(theme)=> ({ width:58, height:58, ...socialIconStyles(theme) })}
            >
              <MailOutlineIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          {/* CV download icon with loading spinner */}
          <Tooltip title={locale === 'fr' ? 'Télécharger le CV' : 'Download CV'} arrow placement="top">
            <IconButton
              onClick={handleDownload}
              color="inherit"
              aria-label={locale === 'fr' ? 'Télécharger le CV' : 'Download CV'}
              disabled={loading}
              sx={(theme)=> ({ width:58, height:58, ...socialIconStyles(theme) })}
            >
              {loading
                ? <CircularProgress size={26} color="inherit" />
                : <SchoolIcon fontSize="medium" />
              }
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
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
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display:'flex', flexDirection:'column', gap:1.5 }}>
          {[{
            label:'GitHub',
            href:'https://github.com/cedrikletarte',
            icon:<GitHubIcon fontSize="small" />,
            action: undefined
          },{
            label:'Email',
            href:'mailto:cedrikletarte@gmail.com',
            icon:<MailOutlineIcon fontSize="small" />,
            action: undefined
          },{
            label:'CV',
            href: undefined,
            icon: loading ? <CircularProgress size={18} color="inherit" /> : <SchoolIcon fontSize="small" />,
            action: handleDownload
          }].map((item,i)=> (
            <Box key={`social-${item.label}`} component="li" sx={{ ml:0 }}>
              <Tooltip title={item.label} placement="right" arrow>
                <IconButton
                  component={item.href? 'a':'button'}
                  href={item.href}
                  onClick={item.action}
                  target={item.href? '_blank': undefined}
                  rel={item.href? 'noopener noreferrer': undefined}
                  aria-label={item.label}
                  sx={(theme)=> ({ width:52, height:52, ...socialIconStyles(theme), '&:hover':{...socialIconStyles(theme)['&:hover'], transform:'translateY(-3px) scale(1.05)'} })}
                  disabled={item.label==='CV' && loading}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Spacer for AppBar to avoid content being hidden behind navbar */}
      <Toolbar sx={{ minHeight: 80 }} />
    </>
  )
}

export default Navbar