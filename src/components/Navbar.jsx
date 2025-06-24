"use client"

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

  // Theme mode and toggle function from context
  const { mode, toggleTheme } = useThemeMode();

  // Current locale (fr/en)
  const locale = useLocale()

  // Next.js router for navigation
  const router = useRouter()

  // Function to scroll smoothly to a section by name
  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  // Handler for downloading the CV (shows loading spinner)
  const handleDownload = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      downloadFile()
    }, 2000)
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

  return (
    <>
      {/* AppBar: main navigation bar, fixed at the top */}
      <AppBar position="fixed" sx={{ background: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.text.primary, boxShadow: 0 }}>
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
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: 'none',
                  // Dynamic hover style based on theme
                  '&:hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary.dark
                        : theme.palette.primary.light,
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary.contrastText
                        : '#22223b',
                  },
                  '&:active': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary.main
                        : theme.palette.primary.light,
                  },
                }}
                className="border-effect"
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
          <IconButton
            component="a"
            href="https://github.com/Cedrik12"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{ bgcolor: '#333333', '&:hover': { bgcolor: '#222' }, color: '#e2e8f0' }}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
          {/* Email icon */}
          <IconButton
            component="a"
            href="https://mail.google.com/mail/u/0/?fs=1&to=cedrikletarte@gmail.com&tf=cm"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{ bgcolor: '#6fc2b0', '&:hover': { bgcolor: '#4fa89b' }, color: '#e2e8f0' }}
          >
            <MailOutlineIcon fontSize="large" />
          </IconButton>
          {/* CV download icon with loading spinner */}
          <IconButton
            onClick={handleDownload}
            color="inherit"
            sx={{ bgcolor: '#D22B2B', '&:hover': { bgcolor: '#a81e1e' }, color: '#e2e8f0' }}
            aria-label="Télécharger le CV"
            disabled={loading}
          >
            {loading
              ? <CircularProgress size={30} color="inherit" />
              : <SchoolIcon fontSize="large" />
            }
          </IconButton>
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
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {/* GitHub link */}
          <Box
            component="li"
            sx={{
              width: 160,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              ml: '-100px',
              transition: 'margin 0.3s',
              bgcolor: '#333333',
              '&:hover': { ml: '-10px' },
              mb: 1,
              px: 0,
            }}
          >
            <a
              href="https://github.com/Cedrik12"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                color: '#e2e8f0',
                textDecoration: 'none',
                justifyContent: 'space-between',
                marginRight: "15px",
                height: '100%',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', height: '100%', marginLeft: "20px" }}>Github</span>
              <GitHubIcon fontSize="large" sx={{ verticalAlign: 'middle' }} />
            </a>
          </Box>
          {/* Email link */}
          <Box
            component="li"
            sx={{
              width: 160,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              ml: '-100px',
              transition: 'margin 0.3s',
              bgcolor: '#6fc2b0',
              '&:hover': { ml: '-10px' },
              mb: 1,
              px: 0,
            }}
          >
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&to=cedrikletarte@gmail.com&tf=cm"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                color: '#e2e8f0',
                textDecoration: 'none',
                justifyContent: 'space-between',
                marginRight: "15px",
                height: '100%',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', height: '100%', marginLeft: "20px" }}>Email</span>
              <MailOutlineIcon fontSize="large" sx={{ verticalAlign: 'middle' }} />
            </a>
          </Box>
          {/* CV download button */}
          <Box
            component="li"
            sx={{
              width: 160,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              ml: '-100px',
              transition: 'margin 0.3s',
              bgcolor: '#D22B2B',
              '&:hover': { ml: '-10px' },
              px: 0,
            }}
          >
            {/* Button for downloading CV */}
            <Button
              onClick={handleDownload}
              color="inherit"
              sx={{
                width: '100%',
                color: '#e2e8f0',
                justifyContent: 'space-between',
                pl: 2.5,
                pr: '30px',
                bgcolor: 'transparent',
                fontWeight: 500,
                textTransform: 'none',
                height: '100%',
                alignItems: 'center',
                display: 'flex',
              }}
              aria-label="Télécharger le CV"
              disabled={loading}
            >
              <span style={{ display: 'flex', alignItems: 'center', height: '100%' }}>CV</span>
              {
                loading
                  ? <CircularProgress size={30} color="inherit" />
                  : <SchoolIcon fontSize="large" sx={{ marginRight: "-15px" }} />
              }
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Spacer for AppBar to avoid content being hidden behind navbar */}
      <Toolbar sx={{ minHeight: 80 }} />
    </>
  )
}

export default Navbar