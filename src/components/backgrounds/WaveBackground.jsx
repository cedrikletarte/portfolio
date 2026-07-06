"use client";

import { useRef } from 'react';
import { useAnimatedCanvas } from '../../hooks/useAnimatedCanvas';

const COLOR = [236, 72, 153]; // #ec4899

export default function WaveBackground() {
  const wavesRef = useRef([]);

  const onResize = (width, height) => {
    wavesRef.current = [
      { amplitude: height * 0.035, wavelength: width * 0.9, speed: 0.15, yOffset: height * 0.32, alpha: 0.1, phase: Math.random() * Math.PI * 2 },
      { amplitude: height * 0.05, wavelength: width * 0.7, speed: 0.1, yOffset: height * 0.56, alpha: 0.08, phase: Math.random() * Math.PI * 2 },
      { amplitude: height * 0.04, wavelength: width * 1.1, speed: 0.07, yOffset: height * 0.8, alpha: 0.06, phase: Math.random() * Math.PI * 2 },
    ];
  };

  const onFrame = (ctx, { width, height, time }) => {
    for (const wave of wavesRef.current) {
      ctx.beginPath();
      ctx.moveTo(0, wave.yOffset);
      for (let x = 0; x <= width; x += 8) {
        const y = wave.yOffset + Math.sin((x / wave.wavelength) * Math.PI * 2 + time * wave.speed + wave.phase) * wave.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},${wave.alpha})`;
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
