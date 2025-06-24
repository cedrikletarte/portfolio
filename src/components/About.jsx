"use client"

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const About = () => {
    const t = useTranslations()

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                bgcolor: (theme) => theme.palette.background.default,
                color: (theme) => theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                py: { xs: 4, md: 8 },
                px: { xs: 2, md: 4 },
            }}
            name="about"
        >
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
                {/* Titre - Toujours en pleine largeur */}
                <Grid size={12}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            mb: { xs: 2, md: 4 },
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 'bold',
                                borderBottom: '4px solid #ec4899',
                                fontSize: { xs: 24, sm: 28, md: 36 },
                                display: 'inline-block',
                                pb: 1,
                            }}
                        >
                            {t('about.title')}
                        </Typography>
                    </Box>
                </Grid>

                {/* Section Introduction */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            textAlign: { md: 'right' },
                            pr: { md: 2 },
                            mb: { xs: 2, md: 0 },
                        }}
                    >
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                fontWeight: 700,
                                fontSize: { xs: 20, sm: 24, md: 28 },
                                lineHeight: 1.3,
                            }}
                        >
                            {t('about.intro')}
                        </Typography>
                    </Box>
                </Grid>

                {/* Section Description */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            pl: { md: 2 },
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: { xs: 'justify', md: 'justify' },
                                fontSize: { xs: 14, sm: 15, md: 16 },
                                lineHeight: 1.6,
                                maxWidth: { xs: '100%', md: 'none' },
                            }}
                        >
                            {t('about.desc')}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default About