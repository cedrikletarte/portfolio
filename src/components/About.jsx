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
                bgcolor: '#0a192f',
                display: 'flex',
                alignItems: 'center',
                py: { xs: 4, md: 0 },
            }}
            name="about"
        >
            <Grid
                container
                spacing={2}
                sx={{
                    bgcolor: '#0a192f',
                    color: 'grey.300',
                    alignItems: 'center',
                    maxWidth: 1000,
                    mx: 'auto',
                    display: 'flex',
                }}
                direction={{ xs: 'column', md: 'row' }} // Ajouté pour le responsive
            >
                <Grid item xs={12}>
                    <Box
                        sx={{
                            textAlign: { xs: 'left', md: 'right' },
                            fontWeight: 'bold',
                            fontSize: { xs: 22, md: 28 },
                            color: '#e2e8f0',
                            display: 'flex',
                            justifyContent: { xs: 'flex-start', md: 'center' },
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 'bold',
                                borderBottom: '4px solid #ec4899',
                                fontSize: { xs: 28, md: 36 },
                            }}
                        >
                            {t('about.title')}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            textAlign: { xs: 'left', sm: 'right' },
                            fontWeight: 'bold',
                            fontSize: { xs: 22, md: 28 },
                            color: '#e2e8f0',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {t('about.intro')}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography
                            sx={{
                                textAlign: 'justify',
                                fontSize: { xs: 14, md: 16 },
                                color: 'grey.300',
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