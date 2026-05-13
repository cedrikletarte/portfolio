"use client"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

const About = () => {
    const t = useTranslations();

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                color: (theme) => theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                py: { xs: 4, md: 8 },
                px: { xs: 2, md: 4 },
                position: 'relative',
            }}
            name="about"
        >
            <Box sx={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle at 50% 40%, rgba(236,72,153,0.16), transparent 70%)', filter: 'blur(70px)', opacity: .5, pointerEvents: 'none' }} />
            <Grid
                container
                spacing={{ xs: 3, md: 4 }}
                sx={{
                    alignItems: 'center',
                    maxWidth: 1200,
                    mx: 'auto',
                    width: '100%',
                    position: 'relative',
                }}
            >
                <Grid size={12}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 4 } }}>
                        <Reveal direction="up" distance={40}>
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
                                {t('about.title')}
                            </Text>
                        </Reveal>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
                    <Box
                        sx={{
                            textAlign: { xs: 'left', md: 'right' },
                            pr: { md: 4 },
                            mb: { xs: 2, md: 0 },
                            pb: { xs: 3, md: 0 },
                            borderRight: { md: '1px solid rgba(236,72,153,0.25)' },
                            borderBottom: { xs: '1px solid rgba(236,72,153,0.25)', md: 'none' },
                        }}
                    >
                        <Reveal direction="left" distance={50}>
                            <Text
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: 20, sm: 24, md: 28 },
                                    lineHeight: 1.3,
                                    width: '100%',
                                    maxWidth: { xs: 520, md: 'none' },
                                    mx: { xs: 'auto', md: 0 },
                                    overflowWrap: 'anywhere',
                                    wordBreak: 'break-word',
                                    hyphens: 'auto',
                                }}
                            >
                                {t('about.intro')}
                            </Text>
                        </Reveal>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
                    <Box sx={{ pl: { md: 4 }, textAlign: { xs: 'center', md: 'left' } }}>
                        <Reveal direction="right" distance={50} delay={0.05}>
                            <Text
                                sx={{
                                    textAlign: 'justify',
                                    fontSize: { xs: 14, sm: 15, md: 16 },
                                    lineHeight: 1.6,
                                    width: '100%',
                                    maxWidth: { xs: 520, md: 'none' },
                                    mx: { xs: 'auto', md: 0 },
                                    overflowWrap: 'anywhere',
                                    wordBreak: 'break-word',
                                    hyphens: 'auto',
                                }}
                            >
                                {t('about.desc')}
                            </Text>
                        </Reveal>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default About;
