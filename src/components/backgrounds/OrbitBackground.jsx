"use client";

import { useRef } from 'react';
import { useAnimatedCanvas } from '../../hooks/useAnimatedCanvas';

const ACCENT = [167, 139, 250]; // #a78bfa
const SYSTEM_COUNT = 6;

export default function OrbitBackground() {
  const systemsRef = useRef([]);

  const onResize = (width, height) => {
    systemsRef.current = Array.from({ length: SYSTEM_COUNT }, () => ({
      cx: Math.random() * width,
      cy: Math.random() * height,
      satellites: Array.from({ length: 1 + Math.floor(Math.random() * 2) }, () => ({
        radius: 24 + Math.random() * 46,
        angle: Math.random() * Math.PI * 2,
        speed: (0.15 + Math.random() * 0.25) * (Math.random() < 0.5 ? 1 : -1),
      })),
    }));
  };

  const onFrame = (ctx, { time }) => {
    for (const system of systemsRef.current) {
      ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0.35)`;
      ctx.beginPath();
      ctx.arc(system.cx, system.cy, 2, 0, Math.PI * 2);
      ctx.fill();

      for (const sat of system.satellites) {
        const angle = sat.angle + time * sat.speed;
        const x = system.cx + Math.cos(angle) * sat.radius;
        const y = system.cy + Math.sin(angle) * sat.radius;

        ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0.12)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(system.cx, system.cy, sat.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0.2)`;
        ctx.beginPath();
        ctx.moveTo(system.cx, system.cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0.55)`;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
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
