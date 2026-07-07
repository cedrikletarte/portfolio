"use client";

import {
  Dialog,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import Text from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import TranslateIcon from '@mui/icons-material/Translate';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { scroller } from 'react-scroll';
import { useCvDownload } from '../../hooks/useCvDownload';
import { useThemeMode } from '../../theme/ThemeContext';

const CommandPalette = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { toggleTheme } = useThemeMode();
  const { download } = useCvDownload();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (section) => {
    scroller.scrollTo(section, { duration: 800, delay: 0, smooth: 'easeInOutQuart' });
  };

  const nextLocale = locale === 'fr' ? 'EN' : 'FR';

  const commands = useMemo(
    () => [
      { id: 'home', label: t('navbar.home'), icon: <HomeIcon />, run: () => scrollTo('home') },
      { id: 'about', label: t('navbar.about'), icon: <PersonIcon />, run: () => scrollTo('about') },
      { id: 'skills', label: t('navbar.skills'), icon: <BuildIcon />, run: () => scrollTo('skills') },
      { id: 'github-section', label: t('githubStats.title'), icon: <GitHubIcon />, run: () => scrollTo('github') },
      { id: 'work', label: t('navbar.work'), icon: <WorkIcon />, run: () => scrollTo('work') },
      { id: 'contact', label: t('navbar.contact'), icon: <MailOutlineIcon />, run: () => scrollTo('contact') },
      { id: 'theme', label: t('commandPalette.toggleTheme'), icon: <Brightness4Icon />, run: toggleTheme },
      { id: 'locale', label: t('commandPalette.switchLanguage', { locale: nextLocale }), icon: <TranslateIcon />, run: () => router.replace(`/${locale === 'fr' ? 'en' : 'fr'}`) },
      { id: 'cv', label: t('commandPalette.downloadCv'), icon: <SchoolIcon />, run: download },
      { id: 'github', label: t('commandPalette.openGithub'), icon: <GitHubIcon />, run: () => window.open('https://github.com/cedrikletarte', '_blank', 'noopener,noreferrer') },
      { id: 'email', label: t('commandPalette.sendEmail'), icon: <MailOutlineIcon />, run: () => { window.location.href = 'mailto:cedrikletarte@gmail.com'; } },
    ],
    [t, locale, nextLocale, toggleTheme, router, download]
  );

  const normalize = (str) => str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = normalize(query);
    return commands.filter((c) => normalize(c.label).includes(q));
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
      const modifier = isMac ? e.metaKey : e.ctrlKey;
      if (modifier && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const handleOpenRequest = () => setOpen(true);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenRequest);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenRequest);
    };
  }, []);

  const runCommand = (cmd) => {
    cmd.run();
    setOpen(false);
    setQuery('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      runCommand(filtered[activeIndex]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            border: '1px solid rgba(236,72,153,0.3)',
            backgroundImage: 'none',
          },
        },
      }}
    >
      <TextField
        autoFocus
        fullWidth
        variant="standard"
        placeholder={t('commandPalette.placeholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleInputKeyDown}
        slotProps={{
          input: {
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#ec4899' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ px: 2.5, py: 2 }}
      />
      <List sx={{ maxHeight: 360, overflowY: 'auto', pt: 0 }}>
        {filtered.length === 0 && (
          <Text variant="body2" sx={{ px: 2.5, py: 2, opacity: 0.6 }}>
            {t('commandPalette.noResults')}
          </Text>
        )}
        {filtered.map((cmd, idx) => (
          <ListItemButton
            key={cmd.id}
            selected={idx === activeIndex}
            onMouseEnter={() => setActiveIndex(idx)}
            onClick={() => runCommand(cmd)}
            sx={{
              '&.Mui-selected': { bgcolor: 'rgba(236,72,153,0.15)' },
              '&.Mui-selected:hover': { bgcolor: 'rgba(236,72,153,0.2)' },
            }}
          >
            <ListItemIcon sx={{ color: '#ec4899', minWidth: 40 }}>{cmd.icon}</ListItemIcon>
            <ListItemText primary={cmd.label} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
};

export default CommandPalette;
