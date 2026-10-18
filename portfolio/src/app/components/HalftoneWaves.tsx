'use client';

import { useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { createBoat, pushBoat, resizeBoat, stepBoat, waterline, type Boat, type WaterBounds } from '@/lib/boat-physics';

const DOT_SPACING = 4;
const DOT_SIZES = 10;
const FRAME_INTERVAL = 1000 / 24;
const SINK_DURATION = 700;

export default function HalftoneWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<HTMLButtonElement>(null);
  const elapsedRef = useRef(0);
  const boatRef = useRef<HTMLSpanElement>(null);
  const boatStateRef = useRef<Boat | null>(null);
  const boatBoundsRef = useRef<WaterBounds>({ width: 0, height: 0 });
  const pathname = usePathname();
  const isWritingPost = /^\/writings\/.+/.test(pathname);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ink = getComputedStyle(document.body).getPropertyValue('--halftone-ink').trim();
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastFrame = 0;
    let lastTick = 0;
    let isSunk = false;
    let sinkTimeout = 0;
    let pointer = { x: -1000, y: -1000, active: false, strength: 0 };
    let ripples: Array<{ x: number; y: number; born: number }> = [];
    const surface = surfaceRef.current;
    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = event.pointerType === 'mouse';
    };
    const leave = () => { pointer.active = false; };
    const splash = (event: MouseEvent) => {
      if (reducedMotion.matches) return;
      const bounds = canvas.getBoundingClientRect();
      const x = event.detail === 0 ? width / 2 : event.clientX - bounds.left;
      const y = event.detail === 0 ? height * 0.6 : event.clientY - bounds.top;
      ripples = [...ripples.slice(-4), { x, y, born: elapsedRef.current }];
      if (boatStateRef.current) pushBoat(boatStateRef.current, x, y);
    };
    surface?.addEventListener('pointermove', move);
    surface?.addEventListener('pointerleave', leave);
    surface?.addEventListener('click', splash);

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      pointer.strength += ((pointer.active && !reducedMotion.matches ? 1 : 0) - pointer.strength) * 0.18;
      ripples = ripples.filter((ripple) => time - ripple.born < 2.8);

      // Keep a regular print grid; varying dot area creates the wave shading.
      // Batch dots by size so the canvas only needs ten fills per frame.
      const dots = Array.from({ length: DOT_SIZES }, () => new Path2D());
      const columns = Math.ceil(width / DOT_SPACING);
      const rows = Math.ceil(height / DOT_SPACING);

      for (let column = 0; column < columns; column++) {
        const x = column * DOT_SPACING + DOT_SPACING / 2;
        const horizon = waterline(x, height, time);
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
          let px = x;
          let py = y;
          if (pointer.strength > 0.005) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const distance = Math.hypot(dx, dy);
            const push = Math.max(0, 1 - distance / 85) ** 2 * 22 * pointer.strength;
            px += dx / Math.max(1, distance) * push;
            py += dy / Math.max(1, distance) * push;
          }
          for (const ring of ripples) {
            const age = time - ring.born;
            const dx = x - ring.x;
            const dy = y - ring.y;
            const distance = Math.hypot(dx, dy);
            const band = (distance - age * 150) / 22;
            const push = Math.sin(band * 1.8) * Math.exp(-band * band * 0.5) * 13 * Math.exp(-age * 1.2);
            px += dx / Math.max(1, distance) * push;
            py += dy / Math.max(1, distance) * push;
          }
          dots[size].moveTo(px + radius, py);
          dots[size].arc(px, py, radius, 0, Math.PI * 2);
        }
      }

      context.fillStyle = ink;
      context.globalAlpha = 0.82;
      dots.forEach(path => context.fill(path));
      context.globalAlpha = 1;
    };

    const positionBoat = () => {
      const boat = boatStateRef.current;
      if (!boat || !boatRef.current) return;
      boatRef.current.style.transform = `translate3d(${boat.x - 24}px, ${boat.y - 22}px, 0) rotate(${boat.angle}deg)`;
    };

    const animate = (timestamp: number) => {
      // Physics runs at display speed; the more expensive dot field stays at 24fps.
      const delta = Math.min(Math.max(0, timestamp - lastTick), 80) / 1000;
      lastTick = timestamp;
      elapsedRef.current += delta;
      if (boatStateRef.current && width > 0 && height > 0) {
        stepBoat(boatStateRef.current, delta, { width, height }, elapsedRef.current);
        positionBoat();
      }
      if (timestamp - lastFrame >= FRAME_INTERVAL) {
        lastFrame = timestamp;
        draw(elapsedRef.current);
      }
      frameId = window.requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      window.cancelAnimationFrame(frameId);
      if (reducedMotion.matches && boatStateRef.current) {
        const boat = boatStateRef.current;
        boat.vx = 0;
        boat.vy = 0;
        boat.spin = 0;
        boat.angle = 0;
        ripples = [];
        pointer.active = false;
        pointer.strength = 0;
      }
      positionBoat();
      draw(elapsedRef.current);
      if (!isSunk && !reducedMotion.matches && !document.hidden) {
        lastTick = lastFrame = performance.now();
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      const nextBounds = { width, height };
      if (!boatStateRef.current) boatStateRef.current = createBoat(nextBounds, elapsedRef.current);
      else resizeBoat(boatStateRef.current, boatBoundsRef.current, nextBounds);
      boatBoundsRef.current = nextBounds;
      positionBoat();
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(elapsedRef.current);
    };
    const resizeObserver = new ResizeObserver(resize);
    resize();
    resizeObserver.observe(canvas);
    reducedMotion.addEventListener('change', syncAnimation);
    document.addEventListener('visibilitychange', syncAnimation);
    syncAnimation();

    // Keep the waves moving while they sink out of view, then stop drawing.
    if (isWritingPost) {
      sinkTimeout = window.setTimeout(() => {
        isSunk = true;
        syncAnimation();
      }, SINK_DURATION);
    }

    return () => {
      surface?.removeEventListener('pointermove', move);
      surface?.removeEventListener('pointerleave', leave);
      surface?.removeEventListener('click', splash);
      window.clearTimeout(sinkTimeout);
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener('change', syncAnimation);
      document.removeEventListener('visibilitychange', syncAnimation);
    };
  }, [isWritingPost]);

  return (
    <>
      <footer className="wave-footer" data-sunk={isWritingPost || undefined} inert={isWritingPost} aria-label="A little ocean">
        <canvas ref={canvasRef} className="halftone-waves" aria-hidden="true" />
        <button ref={surfaceRef} type="button" className="wave-surface" aria-label="Make a ripple to steer the boat" />
      </footer>
      <span ref={boatRef} className="paper-boat" data-sunk={isWritingPost || undefined} aria-hidden="true">
        <svg width="38" height="30" viewBox="0 0 48 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 22 21 28 45 19 34 32H14Z" fill="var(--background)" />
          <path d="m8 23 16-20 13 19M24 3v23L8 23M24 3l6 21" fill="var(--background)" />
        </svg>
      </span>
    </>
  );
}
