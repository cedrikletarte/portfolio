"use client"

import { Box, Grid, Paper } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Reveal from './Reveal';

// Array of skill objects with image source, alt text, and translation label
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
    // Initialize translation function
    const t = useTranslations();

    return (
        // Main section container with responsive background and alignment
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
            }}
        >
            {/* Inner box to center content and set max width */}
            <Box sx={{ maxWidth: 1000, mx: 'auto', }}>
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
                {/* Grid of skill cards */}
                <Grid container spacing={3} sx={{ py: 4 }}>
                    {skills.map((skill, idx) => (
                        <Grid size={3} key={skill.alt}>
                            <Reveal direction="up" distance={50} delay={idx * 0.05}>
                                {/* Paper card for each skill */}
                                <Paper
                                    elevation={6}
                                    sx={{
                                        p: 2,
                                        textAlign: 'center',
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'scale(1.08)' },
                                        bgcolor: (theme) => theme.palette.background.paper,
                                    }}
                                >
                                    {/* Skill icon */}
                                    <Image
                                        src={skill.src}
                                        alt={skill.alt}
                                        width={80}
                                        height={80}
                                        style={{ margin: '0 auto' }}
                                    />
                                    {/* Skill label */}
                                    <Text variant="body1" sx={{ mt: 2 }}>
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