"use client";

import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useAnimatedCanvas } from '../../hooks/useAnimatedCanvas';
import { hexToRgb } from '../../theme/colors';

const SPACING = 46;

export default function CircuitBackground() {
  const theme = useTheme();
  const COLOR = hexToRgb(theme.palette.primary.main);
  const dotsRef = useRef([]);

  const onResize = (width, height) => {
    const dots = [];
    for (let x = SPACING / 2; x < width; x += SPACING) {
      for (let y = SPACING / 2; y < height; y += SPACING) {
        dots.push({
          x,
          y,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.6,
          active: Math.random() < 0.35,
        });
      }
    }
    dotsRef.current = dots;
  };

  const onFrame = (ctx, { time }) => {
    for (const dot of dotsRef.current) {
      if (!dot.active) {
        ctx.fillStyle = `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},0.05)`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      const pulse = (Math.sin(time * dot.speed + dot.phase) + 1) / 2;
      const alpha = 0.05 + pulse * 0.22;
      const radius = 1 + pulse * 1.6;
      ctx.fillStyle = `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},${alpha})`;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const { canvasRef, containerRef, reduced } = useAnimatedCanvas({ onFrame, onResize });
  if (reduced) return null;

  return (
    <div ref={containerRef} aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
