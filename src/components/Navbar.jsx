"use client"

import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LoadingIcons from 'react-loading-icons'
import { scroller } from 'react-scroll'

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
} from '@mui/material'

import GitHubIcon from '@mui/icons-material/GitHub'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MenuIcon from '@mui/icons-material/Menu'
import SchoolIcon from '@mui/icons-material/School'

const Navbar = () => {
  const t = useTranslations()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const locale = useLocale()
  const router = useRouter()

  const scrollTo = (elementName) => {
    scroller.scrollTo(elementName, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  const handleDownload = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      downloadFile()
    }, 2000)
  }

  const downloadFile = () => {
    const fileUrl = locale === 'fr' ? '/cv_fr.pdf' : '/cv_en.pdf'
    const filename = "Cedrik_Letarte_CV.pdf"
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = filename
    link.click()
  }

  const navLinks = [
    { label: t('navbar.home'), to: 'home' },
    { label: t('navbar.about'), to: 'about' },
    { label: t('navbar.skills'), to: 'skills' },
    { label: t('navbar.work'), to: 'work' },
    { label: t('navbar.contact'), to: 'contact' },
  ]

  return (
    <>
      <AppBar position="fixed" sx={{ background: '#0a192f', color: '#e2e8f0', boxShadow: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 80 }}>
          <a href="https://www.cedrikletarte.com" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo2.png" alt="Logo" style={{ width: 50 }} />
          </a>
          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {navLinks.map((item) => (
              <Button
                key={item.to}
                color="inherit"
                onClick={() => scrollTo(item.to)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': { backgroundColor: '#1a2236' }, // couleur au survol
                  '&:active': { backgroundColor: '#22304a' }, // couleur au clic
                  boxShadow: 'none',
                }}
                className="border-effect"
                disableRipple
              >
                {item.label}
              </Button>
            ))}
            <Button
              color="inherit"
              onClick={() => router.replace(`/${locale === 'fr' ? 'en' : 'fr'}`)}
              sx={{ minWidth: 40, fontWeight: 700 }}
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </Button>
          </Box>
          {/* Mobile menu button */}
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
      {/* Drawer for mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { background: '#0a192f', color: '#e2e8f0', width: 250 }
        }}
      >
        <Box sx={{ mt: 2 }}>
          <List>
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
          <IconButton
            onClick={handleDownload}
            color="inherit"
            sx={{ bgcolor: '#D22B2B', '&:hover': { bgcolor: '#a81e1e' }, color: '#e2e8f0' }}
            aria-label="Télécharger le CV"
            disabled={loading}
          >
            {loading
              ? <LoadingIcons.ThreeDots width="30px" height="30px" />
              : <SchoolIcon fontSize="large" />
            }
          </IconButton>
        </Box>
      </Drawer>
      {/* Social icons (desktop only) */}
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
            { }
            <Button
              onClick={handleDownload}
              color="inherit"
              sx={{
                width: '100%',
                color: '#e2e8f0',
                justifyContent: 'space-between',
                pl: 2.5,
                pr: '30px', // <-- 30px du bord droit
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
                  ? <LoadingIcons.ThreeDots width="30px" height="30px" style={{ marginRight: "15px" }} />
                  : <SchoolIcon fontSize="large" sx={{ marginRight: "-15px" }} />
              }
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Spacer for AppBar */}
      <Toolbar sx={{ minHeight: 80 }} />
    </>
  )
}

export default Navbar