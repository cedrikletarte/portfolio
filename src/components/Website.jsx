"use client"

import { useTranslations } from 'next-intl';
import { Box, Paper, Typography, Divider } from '@mui/material';

const Website = () => {
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
          {t('website.title')}
        </Typography>

        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 3, width: '100%' }}>
          {t('website.intro')}
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ width: '100%' }}>
          {t('website.objectives')}
        </Typography>

        <Divider sx={{ my: 2, bgcolor: '#ec4899', width: '100%' }} />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.skillsTitle')}
        </Typography>
        <Typography variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.skillsDesc')}
        </Typography>
        <br /><br />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.projectsTitle')}
        </Typography>
        <Typography variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.projectsDesc')}
        </Typography>
        <br /><br />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.uxTitle')}
        </Typography>
        <Typography variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.uxDesc')}
        </Typography>
        <br /><br />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.securityTitle')}
        </Typography>
        <Typography variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.securityDesc')}
        </Typography>
        <br /><br />

        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.designTitle')}
        </Typography>
        <Typography variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.designDesc')}
        </Typography>
        <br /><br />

        <Typography variant="body1" sx={{ width: '100%' }}>
          {t('website.conclusion')}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Website;