'use client';

import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useAnimatedCanvas } from '../../hooks/useAnimatedCanvas';
import { hexToRgb } from '../../theme/colors';

const DOT_COUNT = 26;

export default function DotsDriftBackground() {
  const theme = useTheme();
  const COLOR = hexToRgb(theme.palette.primary.main);
  const dotsRef = useRef([]);

  const onResize = (width, height) => {
    dotsRef.current = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      radius: 1 + Math.random() * 1.6,
      alpha: 0.08 + Math.random() * 0.1,
    }));
  };

  const onFrame = (ctx, { width, height }) => {
    for (const dot of dotsRef.current) {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.x < 0) dot.x = width;
      if (dot.x > width) dot.x = 0;
      if (dot.y < 0) dot.y = height;
      if (dot.y > height) dot.y = 0;

      ctx.fillStyle = `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},${dot.alpha})`;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const { canvasRef, containerRef, reduced } = useAnimatedCanvas({ onFrame, onResize });
  if (reduced) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
