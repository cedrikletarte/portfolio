"use client";

import { useAnimatedCanvas } from '../../hooks/useAnimatedCanvas';

const COLOR = [236, 72, 153]; // #ec4899
const GRID_SIZE = 42;

export default function BlueprintGridBackground() {
  const onFrame = (ctx, { width, height, time }) => {
    ctx.strokeStyle = `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},0.06)`;
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const sweepPos = ((time * 60) % (width + 400)) - 200;
    const gradient = ctx.createLinearGradient(sweepPos - 150, 0, sweepPos + 150, 0);
    gradient.addColorStop(0, `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},0)`);
    gradient.addColorStop(0.5, `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},0.07)`);
    gradient.addColorStop(1, `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  const { canvasRef, containerRef, reduced } = useAnimatedCanvas({ onFrame });
  if (reduced) return null;

  return (
    <div ref={containerRef} aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
