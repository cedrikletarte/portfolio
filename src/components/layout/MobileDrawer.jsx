'use client';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useThemeMode } from '../../theme/ThemeContext';
import SocialLinks from './SocialLinks';

// Mobile navigation menu: section links, language switch, theme toggle, and
// the same social icons as the desktop sidebar (styled to match the drawer).
export default function MobileDrawer({ open, onClose, navLinks, scrollTo }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            background: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary,
            width: 250,
          },
        },
      }}
    >
      <Box sx={{ mt: 2 }}>
        <List>
          {/* Navigation links in drawer */}
          {navLinks.map((item) => (
            <ListItem key={item.to} disablePadding>
              <ListItemButton
                onClick={() => {
                  scrollTo(item.to);
                  onClose();
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
                router.replace(`/${locale === 'fr' ? 'en' : 'fr'}`);
                onClose();
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
                onClose();
              }}
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.warning.main
                    : theme.palette.primary.main,
              }}
            >
              <ListItemText
                primary={
                  mode === 'dark'
                    ? t('navbar.lightMode') || 'Light Mode'
                    : t('navbar.darkMode') || 'Dark Mode'
                }
              />
              {mode === 'dark' ? (
                <Brightness7Icon sx={{ ml: 1 }} />
              ) : (
                <Brightness4Icon sx={{ ml: 1 }} />
              )}
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
        <SocialLinks size={58} iconSize="medium" tooltipPlacement="top" />
      </Box>
    </Drawer>
  );
}
