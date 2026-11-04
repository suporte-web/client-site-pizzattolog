'use client';

import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';

export function NumbersBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !section || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const draw = () => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#ffb71b';

      for (let y = 8; y < height; y += 16) {
        for (let x = 8; x < width; x += 16) {
          const influence = pointer
            ? Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 110)
            : 0;

          context.globalAlpha = 0.6 + influence * 0.4;
          context.beginPath();
          context.arc(x, y, 1.6 + influence * 2.8, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const scheduleDraw = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      scheduleDraw();
    };

    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      scheduleDraw();
    };

    const resetPointer = () => {
      pointer = null;
      scheduleDraw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(section);
    section.addEventListener('pointermove', movePointer);
    section.addEventListener('pointerleave', resetPointer);
    section.addEventListener('pointercancel', resetPointer);
    resize();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      section.removeEventListener('pointermove', movePointer);
      section.removeEventListener('pointerleave', resetPointer);
      section.removeEventListener('pointercancel', resetPointer);
    };
  }, []);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
