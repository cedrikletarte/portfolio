"use client"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

// About component definition
const About = () => {

    // Initialize the translation function
    const t = useTranslations()

    return (
        // Main container with responsive padding and background color
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                color: (theme) => theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                py: { xs: 4, md: 8 },
                px: { xs: 2, md: 4 },
            }}
            name="about"
        >
            {/* Grid container for layout, centered and responsive */}
            <Grid
                container
                spacing={{ xs: 3, md: 4 }}
                sx={{
                    alignItems: 'center',
                    maxWidth: 1200,
                    mx: 'auto',
                    width: '100%',
                }}
            >
                {/* Title section - always full width */}
                <Grid size={12}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            mb: { xs: 2, md: 4 },
                        }}
                    >
                        {/* Main title, bold with a pink underline */}
                        <Text
                            variant="h3"
                            sx={{
                                fontWeight: 'bold',
                                borderBottom: '4px solid #ec4899',
                                fontSize: { xs: 24, sm: 28, md: 36 },
                                display: 'inline-block',
                                pb: 1,
                            }}
                        >
                            {/* Translated title */}
                            {t('about.title')}
                        </Text>
                    </Box>
                </Grid>

                {/* Introduction section - left column on desktop */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            textAlign: { md: 'right' },
                            pr: { md: 2 },
                            mb: { xs: 2, md: 0 },
                        }}
                    >
                        {/* Translated introduction text, bold and larger */}
                        <Text
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: 20, sm: 24, md: 28 },
                                lineHeight: 1.3,
                            }}
                        >
                            {t('about.intro')}
                        </Text>
                    </Box>
                </Grid>

                {/* Description section - right column on desktop */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            pl: { md: 2 },
                        }}
                    >
                        {/* Translated description text, justified alignment */}
                        <Text
                            sx={{
                                textAlign: { xs: 'justify', md: 'justify' },
                                fontSize: { xs: 14, sm: 15, md: 16 },
                                lineHeight: 1.6,
                                maxWidth: { xs: '100%', md: 'none' },
                            }}
                        >
                            {t('about.desc')}
                        </Text>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default About