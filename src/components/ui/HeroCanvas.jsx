"use client";

import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useAnimatedCanvas } from '../../hooks/useAnimatedCanvas';
import { useThemeMode } from '../../theme/ThemeContext';
import { hexToRgb } from '../../theme/colors';

const PARTICLE_COUNT = 70;
const CONNECT_DISTANCE = 130;
const MOUSE_RADIUS = 140;

export default function HeroCanvas() {
  const { mode } = useThemeMode();
  const theme = useTheme();
  const particlesRef = useRef([]);

  const COLORS = {
    dark: { dot: 'rgba(226,232,240,0.55)', link: hexToRgb(theme.palette.primary.main), link2: [111, 194, 176] },
    light: { dot: 'rgba(10,25,47,0.45)', link: [219, 39, 119], link2: [45, 138, 118] },
  };

  const onResize = (width, height) => {
    const count = Math.min(PARTICLE_COUNT, Math.floor((width * height) / 12000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  };

  const onFrame = (ctx, { width, height, mouse }) => {
    const palette = COLORS[mode] || COLORS.dark;
    const particles = particlesRef.current;

    for (const p of particles) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        p.vx += (dx / (dist || 1)) * force * 0.03;
        p.vy += (dy / (dist || 1)) * force * 0.03;
      }
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < CONNECT_DISTANCE) {
          const alpha = (1 - d / CONNECT_DISTANCE) * 0.35;
          const [r, g, bch] = i % 2 === 0 ? palette.link : palette.link2;
          ctx.strokeStyle = `rgba(${r},${g},${bch},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = palette.dot;
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const { canvasRef, containerRef, reduced } = useAnimatedCanvas({
    onFrame,
    onResize,
    mouseTracking: true,
  });

  if (reduced) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
