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
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';

const Server = () => {
  const t = useTranslations();

  return (
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
          {t('server.title')}
        </Typography>

        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 3, width: '100%'}}>
          {t('server.intro')}
        </Typography>

        {/* Docker Section */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ width: '100%'}}>
          {t('server.dockerTitle')}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, width: '100%' }}>
          {t('server.dockerDesc')}
        </Typography>
        <List dense sx={{ width: '100%' }}>
          {t.raw('server.dockerList').map((item, idx) => (
            <ListItem key={idx} sx={{ pl: 2}}>
              <ListItemText
                primary={
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3, bgcolor: '#ec4899', width: '100%' }} />

        {/* Security Section */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ width: '100%'}}>
          {t('server.securityTitle')}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, width: '100%' }}>
          {t('server.securityDesc')}
        </Typography>
        <List dense sx={{ width: '100%' }}>
          {t.raw('server.securityList').map((item, idx) => (
            <ListItem key={idx} sx={{ pl: 2}}>
              <ListItemText
                primary={
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3, bgcolor: '#ec4899', width: '100%' }} />

        {/* Automation Section */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ width: '100%' }}>
          {t('server.autoTitle')}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, width: '100%' }}>
          {t.rich('server.autoDesc', {
            b: (chunks) => <b>{chunks}</b>,
          })}
        </Typography>

        {/* Technologies Grid */}
        <Grid
          container
          spacing={3}
          sx={{ mt: 2 }}
          justifyContent="center"
          alignItems="center"
        >
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
                <Avatar
                  src={`/assets/${tech.toLowerCase()}.png`}
                  alt={tech}
                  sx={{ width: 56, height: 56, mx: 'auto', mb: 1 }}
                  variant="rounded"
                />
                <Typography variant="subtitle1">
                  {tech}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Server;