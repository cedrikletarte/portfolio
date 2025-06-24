"use client"

import { Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

// Ai component definition
const Ai = () => {

  // Initialize the translation function
  const t = useTranslations();

  return (
    // Main container with centered content and background styling
    <Box
      sx={{
        minHeight: '100vh',
        color: (theme) => theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
      }}
    >
      {/* Paper component for card-like appearance */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          width: '100%',
          mx: 'auto',
          p: { xs: 2, md: 4 },
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        {/* Main title with underline and centered */}
        <Text
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
          {/* Translated title */}
          {t('ai.title')}
        </Text>

        {/* Introduction text, justified alignment */}
        <Text variant="body1" sx={{ textAlign: 'justify', mb: 3, width: '100%' }}>
          {t('ai.intro')}
        </Text>

        {/* Technologies section title */}
        <Text variant="h6" fontWeight="bold" sx={{ width: '100%', textAlign: 'left', mt: 2 }}>
          {t('ai.techTitle')}
        </Text>

        {/* List of AI technologies/features */}
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

        {/* Image section, centered */}
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