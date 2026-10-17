'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';

const NAME_DELAY = 1100;
const NAME_TRAVEL = 900;
const NAME_LAND = NAME_DELAY + NAME_TRAVEL;
const DURATION = NAME_LAND + 150;
const REVEAL_START = NAME_DELAY;
const REVEAL_DURATION = 700;
const DOT_SIZES = 12;
let hasPlayedIntro = false;

export function willPlayIntro() {
  return !hasPlayedIntro;
}

function smoothstep(value: number) {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
}

type Dot = { x: number; y: number; letter: number; noise: number; column: number; phase: number; depth: number };

function addDot(paths: Path2D[], ink: number, x: number, y: number, spacing: number, radiusRatio = 0.48) {
  if (ink < 0.008) return;
  const size = Math.min(DOT_SIZES - 1, Math.floor(Math.sqrt(ink) * DOT_SIZES));
  const radius = ((size + 1) / DOT_SIZES) * spacing * radiusRatio;
  paths[size].moveTo(x + radius, y);
  paths[size].arc(x, y, radius, 0, Math.PI * 2);
}

export default function PortfolioIntro({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameCanvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    hasPlayedIntro = true;
    setIsPlaying(false);
  }, []);

  useLayoutEffect(() => {
    if (!isPlaying) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const nameCanvas = nameCanvasRef.current;
    const nameContext = nameCanvas?.getContext('2d');
    if (hasPlayedIntro || reducedMotion.matches || !canvas || !context || !nameCanvas || !nameContext) {
      finish();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const styles = getComputedStyle(document.body);
    const paper = styles.getPropertyValue('--background').trim();
    const fieldInk = styles.getPropertyValue('--halftone-ink').trim();
    const nameInk = styles.getPropertyValue('--intro-name-ink').trim();
    const font = styles.fontFamily;
    const waves = document.querySelector<HTMLCanvasElement>('.halftone-waves');
    const headerName = contentRef.current?.querySelector<HTMLCanvasElement>('.home-page__name-canvas');
    let width = 0;
    let height = 0;
    let waveTop = 0;
    let waveHeight = 0;
    let spacing = 6;
    let dots: Dot[] = [];
    let columnTides = new Float32Array(0);
    let columnDrifts = new Float32Array(0);
    let sourceNameX = 0;
    let sourceNameY = 0;
    let sourceNameWidth = 0;
    let sourceNameHeight = 0;
    let pixelRatio = 1;
    let nameMotion: Animation | undefined;
    let nameOpacity: Animation | undefined;
    let nameScale = 1;
    let targetNameX = 0;
    let targetNameY = 0;
    let targetNameWidth = 0;
    let targetNameHeight = 0;
    let frameId = 0;
    let startedAt = 0;
    let cancelled = false;
    let hasStartedReveal = false;
    let hasStartedDock = false;
    let started = false;

    const prepare = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.round(bounds.width);
      height = Math.round(bounds.height);
      if (!width || !height) return;

      const waveBounds = waves?.getBoundingClientRect();
      waveTop = waveBounds?.top ?? height;
      waveHeight = waveBounds?.height ?? 0;

      spacing = width < 600 ? 4 : 6;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      // Sample the name once, then render its letters entirely as halftone dots.
      const mask = document.createElement('canvas');
      mask.width = width;
      mask.height = height;
      const maskContext = mask.getContext('2d', { willReadFrequently: true });
      if (!maskContext) return;
      const fontSize = Math.min(144, width * 0.14);
      maskContext.font = `700 ${fontSize}px ${font}`;
      maskContext.textAlign = 'center';
      maskContext.textBaseline = 'middle';
      maskContext.fillStyle = '#fff';
      maskContext.fillText('alex chen', width / 2, height * 0.47, width - 40);
      sourceNameWidth = Math.ceil(maskContext.measureText('alex chen').width) + 12;
      sourceNameHeight = Math.ceil(fontSize * 1.5);
      sourceNameX = width / 2 - sourceNameWidth / 2;
      sourceNameY = height * 0.47 - sourceNameHeight / 2;
      const targetBounds = headerName?.getBoundingClientRect();
      const targetFontSize = headerName?.parentElement
        ? parseFloat(getComputedStyle(headerName.parentElement).fontSize)
        : 22;
      nameScale = targetFontSize / fontSize;
      targetNameX = targetBounds?.left ?? sourceNameX;
      targetNameY = (targetBounds?.top ?? 0) + (targetBounds?.height ?? 30) / 2;
      targetNameWidth = targetBounds?.width ?? 122;
      targetNameHeight = targetBounds?.height ?? 30;
      const pixels = maskContext.getImageData(0, 0, width, height).data;

      dots = [];
      for (let y = spacing / 2; y < height + spacing; y += spacing) {
        for (let x = spacing / 2; x < width + spacing; x += spacing) {
          const index = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
          const inBounds = x < width && y < height;
          const seed = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
          dots.push({ x, y, letter: inBounds ? pixels[index] / 255 : 0, noise: seed - Math.floor(seed), column: Math.floor(x / spacing), phase: x * 0.013 + y * 0.018, depth: 0.3 + y / height * 0.7 });
        }
      }
      columnTides = new Float32Array(Math.ceil(width / spacing) + 1);
      columnDrifts = new Float32Array(columnTides.length);

      // Rasterize the black name once. Its travel is a compositor transform,
      // independent of the full-screen canvas work on the main thread.
      nameCanvas.width = Math.round(sourceNameWidth * pixelRatio);
      nameCanvas.height = Math.round(sourceNameHeight * pixelRatio);
      nameCanvas.style.width = `${sourceNameWidth}px`;
      nameCanvas.style.height = `${sourceNameHeight}px`;
      nameContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const namePaths = Array.from({ length: DOT_SIZES }, () => new Path2D());
      for (const { x, y, letter } of dots) {
        if (letter > 0.01) addDot(namePaths, letter, x - sourceNameX, y - sourceNameY, spacing, 0.5);
      }
      nameContext.fillStyle = nameInk;
      namePaths.forEach(path => nameContext.fill(path));
      if (started) animateName(performance.now() - startedAt);
    };

    const dockName = () => {
      if (cancelled || !headerName?.width || !headerName.height) return;
      nameCanvas.style.transform = `translate3d(${targetNameX}px, ${targetNameY - targetNameHeight / 2}px, 0)`;
      nameMotion?.cancel();
      nameCanvas.style.width = `${targetNameWidth}px`;
      nameCanvas.style.height = `${targetNameHeight}px`;
      nameCanvas.width = Math.round(targetNameWidth * pixelRatio);
      nameCanvas.height = Math.round(targetNameHeight * pixelRatio);
      nameContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      nameContext.drawImage(headerName, 0, 0, targetNameWidth, targetNameHeight);
    };

    const animateName = (elapsed = 0) => {
      nameMotion?.cancel();
      nameOpacity?.cancel();
      const initial = `translate3d(${sourceNameX}px, ${sourceNameY}px, 0) scale(1)`;
      const destination = `translate3d(${targetNameX - 6 * nameScale}px, ${targetNameY - sourceNameHeight * nameScale / 2}px, 0) scale(${nameScale})`;
      nameCanvas.style.transform = initial;
      nameOpacity = nameCanvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, fill: 'both' });
      nameOpacity.currentTime = elapsed;
      nameMotion = nameCanvas.animate([{ transform: initial }, { transform: destination }], {
        delay: NAME_DELAY,
        duration: NAME_TRAVEL,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'both',
      });
      nameMotion.currentTime = elapsed;
      void nameMotion.finished.then(dockName).catch(() => {});
    };

    const draw = (elapsed: number) => {
      const time = elapsed / 1000;
      const opening = smoothstep(elapsed / 350);
      const reveal = smoothstep((elapsed - REVEAL_START) / REVEAL_DURATION);
      const settle = smoothstep((elapsed - (REVEAL_START - 100)) / 1000);
      const front = (-0.35 + reveal * 1.85) * height;
      const inkPaths = Array.from({ length: DOT_SIZES }, () => new Path2D());
      const paperPaths = Array.from({ length: DOT_SIZES }, () => new Path2D());
      context.clearRect(0, 0, width, height);

      if (!reveal) {
        context.fillStyle = paper;
        context.fillRect(0, 0, width, height);
      }

      // Cache the shared column waves instead of recomputing them per dot.
      for (let column = 0; column < columnTides.length; column++) {
        const x = column * spacing + spacing / 2;
        columnTides[column] = Math.sin(x * 0.009 - time * 1.2) * height * 0.045
          + Math.sin(x * 0.021 + time * 0.7) * height * 0.018;
        columnDrifts[column] = Math.sin(x * 0.005 + time * 0.5) * 2;
      }
      for (const dot of dots) {
        const { x, y, noise, column, phase, depth } = dot;
        const cleared = smoothstep((front - y + columnTides[column] + noise * 24) / (height * 0.22));
        // Hold the lower band opaque while the full-screen texture becomes
        // the live footer, so the waves never disappear or get drawn twice.
        const cover = y >= waveTop ? 1 : 1 - cleared;
        if (cover < 0.01) continue;

        if (reveal) {
          // Overlapping paper dots start opaque, then shrink to open real holes
          // onto the portfolio underneath, rather than fading a flat overlay.
          const size = Math.min(DOT_SIZES - 1, Math.floor(cover * DOT_SIZES));
          const radius = ((size + 1) / DOT_SIZES) * spacing * 0.74;
          paperPaths[size].moveTo(x + radius, y);
          paperPaths[size].arc(x, y, radius, 0, Math.PI * 2);
        }

        const swell = (Math.sin(phase - time * 1.2 + columnDrifts[column]) + 1) / 2;
        const field = (0.025 + swell * swell * 0.2) * depth;
        const dissolve = cover * (1 - settle);
        addDot(inkPaths, field * opening * dissolve, x, y, spacing);
      }

      context.fillStyle = paper;
      paperPaths.forEach(path => context.fill(path));
      context.fillRect(0, waveTop, width, waveHeight);
      context.fillStyle = fieldInk;
      inkPaths.forEach(path => context.fill(path));

      if (waves && waves.width && waves.height && settle > 0) {
        // Copy the actual running waves, including their current animation
        // phase. Removing the intro then leaves an identical image underneath.
        context.globalAlpha = settle;
        context.drawImage(waves, 0, waveTop, width, waveHeight);
        context.globalAlpha = 1;
      }
    };

    const animate = (timestamp: number) => {
      if (cancelled) return;
      const elapsed = timestamp - startedAt;
      if (!hasStartedReveal && elapsed >= NAME_DELAY) {
        hasStartedReveal = true;
        contentRef.current?.setAttribute('data-intro-state', 'revealing');
      }
      if (!hasStartedDock && elapsed >= REVEAL_START) {
        hasStartedDock = true;
        contentRef.current?.setAttribute('data-intro-state', 'docking');
      }
      if (elapsed >= DURATION) {
        draw(DURATION);
        finish();
        return;
      }
      draw(elapsed);
      frameId = window.requestAnimationFrame(animate);
    };

    const skipOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish();
    };

    const skipWhenHidden = () => {
      if (document.hidden) finish();
    };

    const resizeObserver = new ResizeObserver(prepare);
    resizeObserver.observe(canvas);
    window.addEventListener('keydown', skipOnEscape);
    reducedMotion.addEventListener('change', finish);
    document.addEventListener('visibilitychange', skipWhenHidden);

    // Use the loaded portfolio font for the dotted name, with a short fallback
    // so a slow font request never holds visitors behind the introduction.
    const fontTimeout = window.setTimeout(start, 250);
    function start() {
      if (cancelled || started) return;
      window.clearTimeout(fontTimeout);
      prepare();
      started = true;
      startedAt = performance.now();
      animateName();
      draw(0);
      setIsReady(true);
      frameId = window.requestAnimationFrame(animate);
    }
    void document.fonts.ready.then(start);

    return () => {
      cancelled = true;
      nameMotion?.cancel();
      nameOpacity?.cancel();
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(fontTimeout);
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('keydown', skipOnEscape);
      reducedMotion.removeEventListener('change', finish);
      document.removeEventListener('visibilitychange', skipWhenHidden);
    };
  }, [isPlaying, finish]);

  return (
    <>
      <div ref={contentRef} className="portfolio-intro-content" data-intro-state={isPlaying ? 'covered' : 'revealed'} inert={isPlaying && isReady}>
        {children}
      </div>
      {isPlaying && (
        <div className={`portfolio-intro${isReady ? '' : ' portfolio-intro--pending'}`}>
          <canvas ref={canvasRef} className="portfolio-intro__canvas" aria-hidden="true" />
          <canvas ref={nameCanvasRef} className="portfolio-intro__name" aria-hidden="true" />
        </div>
      )}
      <noscript><style>{'.portfolio-intro { display: none; }'}</style></noscript>
    </>
  );
}
