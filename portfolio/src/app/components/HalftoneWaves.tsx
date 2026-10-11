'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const DOT_SPACING = 4;
const DOT_SIZES = 10;
const FRAME_INTERVAL = 1000 / 24;

export default function HalftoneWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isWritingPost = /^\/writings\/.+/.test(pathname);

  useEffect(() => {
    if (isWritingPost) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ink = getComputedStyle(document.body).getPropertyValue('--halftone-ink').trim();
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastFrame = 0;
    let elapsed = 0;

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      // Keep a regular print grid; varying dot area creates the wave shading.
      // Batch dots by size so the canvas only needs ten fills per frame.
      const dots = Array.from({ length: DOT_SIZES }, () => new Path2D());
      const columns = Math.ceil(width / DOT_SPACING);
      const rows = Math.ceil(height / DOT_SPACING);

      for (let column = 0; column < columns; column++) {
        const x = column * DOT_SPACING + DOT_SPACING / 2;
        const horizon = height * (0.23
          + Math.sin(x * 0.008 - time * 0.5) * 0.075
          + Math.sin(x * 0.017 + time * 0.3) * 0.035);
        const drift = Math.sin(x * 0.008 + time * 0.35) * 1.4;

        for (let row = 0; row < rows; row++) {
          const y = row * DOT_SPACING + DOT_SPACING / 2;
          if (y <= horizon) continue;

          const depth = (y - horizon) / (height - horizon);
          const edge = Math.min(1, depth / 0.18);
          const edgeFade = edge * edge * (3 - 2 * edge);
          const swell = Math.sin(x * 0.021 + y * 0.052 - time * 0.85 + drift);
          const ripple = Math.sin(x * 0.012 - y * 0.075 + time * 0.6);
          const shade = (swell + ripple * 0.55 + 1.55) / 3.1;
          const coverage = edgeFade * (0.12 + depth * 0.24 + shade * shade * 0.64);
          const size = Math.min(DOT_SIZES - 1, Math.floor(Math.sqrt(coverage) * DOT_SIZES));
          if (coverage < 0.008) continue;

          const radius = ((size + 1) / DOT_SIZES) * DOT_SPACING * 0.46;
          dots[size].moveTo(x + radius, y);
          dots[size].arc(x, y, radius, 0, Math.PI * 2);
        }
      }

      context.fillStyle = ink;
      context.globalAlpha = 0.82;
      dots.forEach(path => context.fill(path));
      context.globalAlpha = 1;
    };

    const animate = (timestamp: number) => {
      if (timestamp - lastFrame >= FRAME_INTERVAL) {
        // Clamp the delta so returning to a backgrounded tab stays smooth.
        elapsed += Math.min(timestamp - lastFrame, 80) / 1000;
        lastFrame = timestamp;
        draw(elapsed);
      }
      frameId = window.requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      window.cancelAnimationFrame(frameId);
      draw(elapsed);
      if (!reducedMotion.matches && !document.hidden) {
        lastFrame = performance.now();
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(elapsed);
    });

    resizeObserver.observe(canvas);
    reducedMotion.addEventListener('change', syncAnimation);
    document.addEventListener('visibilitychange', syncAnimation);
    syncAnimation();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener('change', syncAnimation);
      document.removeEventListener('visibilitychange', syncAnimation);
    };
  }, [isWritingPost]);

  return isWritingPost ? null : <canvas ref={canvasRef} className="halftone-waves" aria-hidden="true" />;
}
