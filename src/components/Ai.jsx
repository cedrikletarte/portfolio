"use client"

import { useTranslations } from 'next-intl';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Ai = () => {
  const t = useTranslations();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0a192f',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          width: '100%',
          mx: 'auto',
          p: { xs: 2, md: 4 },
          bgcolor: '#112240',
          borderRadius: 3,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            borderBottom: 3,
            borderBottom: '4px solid #ec4899',
            display: 'inline-block',
            mb: 2,
            textAlign: 'center',
            width: '100%',
          }}
        >
          {t('ai.title')}
        </Typography>

        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 3, width: '100%' }}>
          {t('ai.intro')}
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ width: '100%', textAlign: 'left', mt: 2 }}>
          {t('ai.techTitle')}
        </Typography>

        <List sx={{ width: '100%', pl: 2 }}>
          <ListItem>
            <ListItemText primary={t('ai.minimax')} />
          </ListItem>
          <ListItem>
            <ListItemText primary={t('ai.heuristic')} />
          </ListItem>
          <ListItem>
            <ListItemText primary={t('ai.moves')} />
          </ListItem>
          <ListItem>
            <ListItemText primary={t('ai.network')} />
          </ListItem>
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Box
            component="img"
            src="/assets/tictactoe.png"
            alt="Tic-Tac-Toe Géant"
            sx={{ maxWidth: '100%', height: 'auto', borderRadius: 2, boxShadow: 3 }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Ai;