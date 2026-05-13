"use client"

import { Box, Grid, Paper } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Reveal from './Reveal';

const skills = [
    { src: "/assets/java.png", alt: "JAVA", label: "skills.java" },
    { src: "/assets/csharp.png", alt: "C#", label: "skills.csharp" },
    { src: "/assets/python.png", alt: "PYTHON", label: "skills.python" },
    { src: "/assets/react.png", alt: "REACT", label: "skills.react" },
    { src: "/assets/ubuntu.png", alt: "UBUNTU SERVER", label: "skills.ubuntu" },
    { src: "/assets/docker.png", alt: "DOCKER", label: "skills.docker" },
    { src: "/assets/mariadb.png", alt: "MARIADB", label: "skills.mariadb" },
    { src: "/assets/mongo.png", alt: "MongoDB", label: "skills.mongodb" },
];

const Skills = () => {
    const t = useTranslations();

    return (
        <Box
            component="section"
            id="skills"
            sx={{
                width: '100%',
                minHeight: '100vh',
                color: (theme) => theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                py: { xs: 4, md: 0 },
                position: 'relative',
            }}
        >
            <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle at 50% 30%, rgba(236,72,153,0.18), transparent 70%)', filter: 'blur(60px)', opacity: .6, pointerEvents: 'none' }} />
            <Box sx={{ maxWidth: 1000, mx: 'auto', position: 'relative' }}>
                <Reveal direction="up" distance={40}>
                    <Text
                        variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            borderBottom: '4px solid #ec4899',
                            fontSize: { xs: 28, md: 36 },
                            display: 'inline-block',
                        }}
                    >
                        {t('skills.title')}
                    </Text>
                </Reveal>
                <Reveal direction="up" distance={40} delay={0.05}>
                    <Text variant="subtitle1" sx={{ py: 2 }}>
                        {t('skills.desc')}
                    </Text>
                </Reveal>
                <Grid container spacing={3} sx={{ py: 4 }}>
                    {skills.map((skill, idx) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={skill.alt}>
                            <Reveal direction="up" distance={50} delay={idx * 0.05}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2.5,
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        background: (theme) => theme.palette.mode === 'dark'
                                            ? 'rgba(255,255,255,0.03)'
                                            : 'rgba(236,72,153,0.04)',
                                        border: '1px solid rgba(236,72,153,0.35)',
                                        backdropFilter: 'blur(4px)',
                                        borderRadius: 3,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 18px -4px rgba(0,0,0,0.25)',
                                        transition: 'transform .45s cubic-bezier(.22,.9,.25,1), box-shadow .4s, border-color .4s',
                                        '&:before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'radial-gradient(circle at 50% 20%, rgba(236,72,153,0.22), transparent 70%)',
                                            opacity: 0,
                                            transition: 'opacity .5s',
                                        },
                                        '&:hover:before': { opacity: 1 },
                                        '&:hover': {
                                            transform: 'translateY(-6px) scale(1.04)',
                                            boxShadow: '0 14px 32px -8px rgba(0,0,0,0.5)',
                                            borderColor: 'rgba(236,72,153,0.65)',
                                        },
                                    }}
                                >
                                    <Image
                                        src={skill.src}
                                        alt={skill.alt}
                                        width={72}
                                        height={72}
                                        style={{ margin: '0 auto', position: 'relative', zIndex: 1 }}
                                    />
                                    <Text
                                        variant="body2"
                                        sx={{
                                            mt: 1.5,
                                            fontWeight: 600,
                                            letterSpacing: .5,
                                            fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                            position: 'relative',
                                            zIndex: 1,
                                        }}
                                    >
                                        {t(skill.label)}
                                    </Text>
                                </Paper>
                            </Reveal>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Skills;
