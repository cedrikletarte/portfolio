"use client"

import { Box, Paper } from '@mui/material';
import Text from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CircuitBackground from '../backgrounds/CircuitBackground';
import ParallaxGlow from '../ui/ParallaxGlow';
import Reveal from '../ui/Reveal';

const skills = [
    { src: "/assets/icons/java.png", alt: "JAVA", label: "skills.java" },
    { src: "/assets/icons/csharp.png", alt: "C#", label: "skills.csharp" },
    { src: "/assets/icons/python.png", alt: "PYTHON", label: "skills.python" },
    { src: "/assets/icons/react.png", alt: "REACT", label: "skills.react" },
    { src: "/assets/icons/nextjs.svg", alt: "NEXT.JS", label: "skills.nextjs" },
    { src: "/assets/icons/typescript.svg", alt: "TYPESCRIPT", label: "skills.typescript" },
    { src: "/assets/icons/javascript.png", alt: "JAVASCRIPT", label: "skills.javascript" },
    { src: "/assets/icons/html.png", alt: "HTML", label: "skills.html" },
    { src: "/assets/icons/css.png", alt: "CSS", label: "skills.css" },
    { src: "/assets/icons/tailwind.png", alt: "TAILWIND CSS", label: "skills.tailwind" },
    { src: "/assets/icons/dotnet.svg", alt: "ASP.NET", label: "skills.dotnet" },
    { src: "/assets/icons/unity.svg", alt: "UNITY", label: "skills.unity" },
    { src: "/assets/icons/android.svg", alt: "ANDROID", label: "skills.android" },
    { src: "/assets/icons/apple.svg", alt: "IOS", label: "skills.ios" },
    { src: "/assets/icons/linux.svg", alt: "LINUX", label: "skills.linux" },
    { src: "/assets/icons/bash.svg", alt: "BASH", label: "skills.bash" },
    { src: "/assets/icons/powershell.svg", alt: "POWERSHELL", label: "skills.powershell" },
    { src: "/assets/icons/docker.png", alt: "DOCKER", label: "skills.docker" },
    { src: "/assets/icons/github.png", alt: "GITHUB", label: "skills.github" },
    { src: "/assets/icons/cloudflare.png", alt: "CLOUDFLARE", label: "skills.cloudflare" },
    { src: "/assets/icons/mariadb.png", alt: "MARIADB", label: "skills.mariadb" },
    { src: "/assets/icons/mysql.svg", alt: "MYSQL", label: "skills.mysql" },
    { src: "/assets/icons/mongo.png", alt: "MongoDB", label: "skills.mongodb" },
];

// The marquee row isn't width-constrained (unlike the rest of the site) so it
// can stretch edge-to-edge on very wide screens. One "half" of the track needs
// to stay comfortably wider than any realistic viewport, or the visible strip
// could scroll past the end of the duplicated content and show a blank gap.
const HALF_REPEATS = 2;

// Marquee rows use a per-tile margin instead of a container `gap`. With a flex
// `gap`, translateX(-50%) lands half a gap short of the true repeat-unit width
// (a container of 2n items has 2n-1 gaps, so halving the total overshoots the
// n-item/n-gap repeat boundary by gap/2) — a visible jump every loop. A margin
// on every tile (including the last) makes the total width exactly 2×(tile+gap),
// so -50% lands exactly on the repeat boundary.
const SkillTile = ({ skill, t, spacing = 0 }) => (
    <Paper
        elevation={0}
        sx={{
            width: 150,
            flexShrink: 0,
            mr: spacing,
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
            width={64}
            height={64}
            loading="eager"
            style={{ margin: '0 auto', position: 'relative', zIndex: 1 }}
        />
        <Text
            variant="body2"
            sx={{
                mt: 1.5,
                fontWeight: 600,
                letterSpacing: .5,
                fontSize: '0.8rem',
                position: 'relative',
                zIndex: 1,
                whiteSpace: 'nowrap',
            }}
        >
            {t(skill.label)}
        </Text>
    </Paper>
);

const MarqueeRow = ({ items, duration, reverse, t }) => (
    <Box
        sx={{
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            py: 2,
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
    >
        <Box
            className="marquee-track"
            sx={{
                display: 'flex',
                width: 'max-content',
                animation: `skills-marquee ${duration}s linear infinite`,
                animationDirection: reverse ? 'reverse' : 'normal',
            }}
        >
            {Array.from({ length: HALF_REPEATS * 2 }, () => items).flat().map((skill, idx) => (
                <SkillTile key={`${skill.alt}-${idx}`} skill={skill} t={t} spacing={3} />
            ))}
        </Box>
    </Box>
);

const Skills = () => {
    const t = useTranslations();
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        }
    }, []);

    return (
        <Box
            component="section"
            id="skills"
            sx={{
                width: '100%',
                minHeight: '100vh',
                color: (theme) => theme.palette.text.primary,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                py: { xs: 4, md: 6 },
                position: 'relative',
                overflowX: 'hidden',
            }}
        >
            <CircuitBackground />
            <ParallaxGlow origin="50% 30%" color="rgba(236,72,153,0.18)" blur={60} opacity={0.6} />
            <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, width: '100%', position: 'relative' }}>
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
            </Box>

            {reduced ? (
                <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, width: '100%', display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', mt: 2 }}>
                    {skills.map((skill) => (
                        <SkillTile key={skill.alt} skill={skill} t={t} />
                    ))}
                </Box>
            ) : (
                <Reveal direction="up" distance={40} delay={0.1}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                        <MarqueeRow items={skills} duration={32} t={t} />
                        <MarqueeRow items={[...skills].reverse()} duration={26} reverse t={t} />
                    </Box>
                </Reveal>
            )}
        </Box>
    );
};

export default Skills;
