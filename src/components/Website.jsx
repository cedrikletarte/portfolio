"use client"

import { Box, Divider, Paper } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

const Website = () => {
  // Initialize translation function
  const t = useTranslations();

  return (
    // Main container with centered content and background styling
    <Box
      sx={{
        minHeight: '100vh',
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
          color: (theme) => theme.palette.text.primary,
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
          {t('website.title')}
        </Text>

        {/* Introduction text */}
        <Text variant="body1" sx={{ textAlign: 'justify', mb: 3, width: '100%' }}>
          {t('website.intro')}
        </Text>

        {/* Objectives section title */}
        <Text variant="h6" fontWeight="bold" sx={{ width: '100%' }}>
          {t('website.objectives')}
        </Text>

        {/* Divider for visual separation */}
        <Divider sx={{ my: 2, bgcolor: '#ec4899', width: '100%' }} />

        {/* Skills section */}
        <Text variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.skillsTitle')}
        </Text>
        <Text variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.skillsDesc')}
        </Text>
        <br /><br />

        {/* Projects section */}
        <Text variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.projectsTitle')}
        </Text>
        <Text variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.projectsDesc')}
        </Text>
        <br /><br />

        {/* UX section */}
        <Text variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.uxTitle')}
        </Text>
        <Text variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.uxDesc')}
        </Text>
        <br /><br />

        {/* Security section */}
        <Text variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.securityTitle')}
        </Text>
        <Text variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.securityDesc')}
        </Text>
        <br /><br />

        {/* Design section */}
        <Text variant="subtitle1" fontWeight="bold" sx={{ display: 'inline', fontSize: 20 }}>
          {t('website.designTitle')}
        </Text>
        <Text variant="body2" sx={{ display: 'inline', ml: 1 }}>
          {t('website.designDesc')}
        </Text>
        <br /><br />

        {/* Conclusion text */}
        <Text variant="body1" sx={{ width: '100%' }}>
          {t('website.conclusion')}
        </Text>
      </Paper>
    </Box>
  );
};

export default Website;