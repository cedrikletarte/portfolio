"use client"

import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

const Server = () => {
  // Initialize translation function
  const t = useTranslations();

  return (
    // Main container with centered content and background styling
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.background.default,
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
          alignItems: 'center',
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
          {t('server.title')}
        </Text>

        {/* Introduction text */}
        <Text variant="body1" sx={{ textAlign: 'justify', mb: 3, width: '100%' }}>
          {t('server.intro')}
        </Text>

        {/* Docker Section */}
        <Text variant="h5" fontWeight="bold" gutterBottom sx={{ width: '100%' }}>
          {t('server.dockerTitle')}
        </Text>
        <Text variant="body2" sx={{ mb: 1, width: '100%' }}>
          {t('server.dockerDesc')}
        </Text>
        {/* Docker features list */}
        <List dense sx={{ width: '100%' }}>
          {t.raw('server.dockerList').map((item, idx) => (
            <ListItem key={idx} sx={{ pl: 2 }}>
              <ListItemText
                primary={
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Divider for visual separation */}
        <Divider sx={{ my: 3, bgcolor: '#ec4899', width: '100%' }} />

        {/* Security Section */}
        <Text variant="h5" fontWeight="bold" gutterBottom sx={{ width: '100%' }}>
          {t('server.securityTitle')}
        </Text>
        <Text variant="body2" sx={{ mb: 1, width: '100%' }}>
          {t('server.securityDesc')}
        </Text>
        {/* Security features list */}
        <List dense sx={{ width: '100%' }}>
          {t.raw('server.securityList').map((item, idx) => (
            <ListItem key={idx} sx={{ pl: 2 }}>
              <ListItemText
                primary={
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Divider for visual separation */}
        <Divider sx={{ my: 3, bgcolor: '#ec4899', width: '100%' }} />

        {/* Automation Section */}
        <Text variant="h5" fontWeight="bold" gutterBottom sx={{ width: '100%' }}>
          {t('server.autoTitle')}
        </Text>
        <Text variant="body2" sx={{ mb: 2, width: '100%' }}>
          {/* Rich translation with bold text */}
          {t.rich('server.autoDesc', {
            b: (chunks) => <b>{chunks}</b>,
          })}
        </Text>

        {/* Technologies Grid */}
        <Grid
          container
          spacing={3}
          sx={{ mt: 2 }}
          justifyContent="center"
          alignItems="center"
        >
          {/* Display each technology as a card with icon and name */}
          {t.raw('server.techs').map((tech, idx) => (
            <Grid
              item
              xs={6}
              sm={3}
              key={tech}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  width: 150,
                  height: 150,
                  textAlign: 'center',
                  bgcolor: (theme) => theme.palette.background.paper,
                  transition: 'transform 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': { transform: 'scale(1.08)' },
                }}
              >
                {/* Technology icon */}
                <Avatar
                  src={`/assets/${tech.toLowerCase()}.png`}
                  alt={tech}
                  sx={{ width: 56, height: 56, mx: 'auto', mb: 1 }}
                  variant="rounded"
                />
                {/* Technology name */}
                <Text variant="subtitle1">
                  {tech}
                </Text>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Server;