'use client';

import { useLayoutEffect, useRef } from 'react';

const NAME = 'alex chen';
const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789!?#%&*+=/';
const DURATION = 1400;
const FRAME_INTERVAL = 65;
const DOT_SPACING = 1.3;

export default function HalftoneName() {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const mask = document.createElement('canvas');
    const maskContext = mask.getContext('2d', { willReadFrequently: true });
    if (!wrapper || !canvas || !context || !maskContext) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const introContent = wrapper.closest<HTMLElement>('.portfolio-intro-content');
    const styles = getComputedStyle(wrapper);
    const ink = styles.getPropertyValue('--intro-name-ink').trim();
    let width = 0;
    let height = 0;
    let elapsed = 0;
    let startedAt = 0;
    let lastFrame = 0;
    let frameId = 0;
    let started = false;
    let prepared = false;
    let cancelled = false;

    const draw = (time: number) => {
      const progress = Math.min(1, time / DURATION);
      const resolved = Math.floor(Math.max(0, (time - 250) / (DURATION - 250)) * NAME.length);
      const tick = Math.floor(time / FRAME_INTERVAL);
      const text = Array.from(NAME, (character, index) => {
        if (character === ' ' || index < resolved || progress === 1) return character;
        const random = Math.sin(index * 127.1 + tick * 311.7) * 43758.5453;
        return CHARACTERS[Math.floor((random - Math.floor(random)) * CHARACTERS.length)];
      }).join('');
      const mix = Math.max(0, Math.min(1, (time - 300) / 850));
      const dotMix = mix * mix * (3 - 2 * mix);
      const font = `700 ${styles.fontSize} ${styles.fontFamily}`;

      maskContext.clearRect(0, 0, width, height);
      maskContext.font = font;
      maskContext.textBaseline = 'middle';
      maskContext.fillStyle = '#fff';
      maskContext.fillText(text, 0, height / 2);
      const pixels = maskContext.getImageData(0, 0, width, height).data;

      context.clearRect(0, 0, width, height);
      context.font = font;
      context.textBaseline = 'middle';
      context.fillStyle = ink;
      context.globalAlpha = 1 - dotMix;
      context.fillText(text, 0, height / 2);
      context.globalAlpha = dotMix;
      context.beginPath();

      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
          const alpha = pixels[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] / 255;
          if (alpha < 0.12) continue;
          const radius = Math.sqrt(alpha) * DOT_SPACING * 0.5;
          context.moveTo(x + radius, y);
          context.arc(x, y, radius, 0, Math.PI * 2);
        }
      }
      context.fill();
      context.globalAlpha = 1;
      wrapper.dataset.rendered = 'true';
    };

    const animate = (timestamp: number) => {
      if (cancelled) return;
      elapsed = Math.min(DURATION, timestamp - startedAt);
      if (timestamp - lastFrame >= FRAME_INTERVAL || elapsed === DURATION) {
        draw(elapsed);
        lastFrame = timestamp;
      }
      if (elapsed < DURATION) frameId = window.requestAnimationFrame(animate);
    };

    const startWhenRevealed = () => {
      if (introContent?.dataset.introState === 'docking' && prepared && !cancelled) {
        window.cancelAnimationFrame(frameId);
        started = true;
        elapsed = DURATION;
        draw(elapsed);
        return;
      }
      if (!prepared || started || cancelled) return;
      if (reducedMotion.matches) {
        started = true;
        elapsed = DURATION;
        draw(elapsed);
        return;
      }
      if (introContent?.dataset.introState === 'covered') return;
      started = true;
      startedAt = performance.now();
      frameId = window.requestAnimationFrame(animate);
    };

    const prepare = () => {
      const bounds = wrapper.getBoundingClientRect();
      width = Math.round(bounds.width);
      height = Math.round(bounds.height);
      if (!width || !height) return;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      mask.width = width;
      mask.height = height;
      prepared = true;
      draw(reducedMotion.matches ? DURATION : elapsed);
      startWhenRevealed();
    };

    const settle = () => {
      if (!reducedMotion.matches && !document.hidden) return;
      window.cancelAnimationFrame(frameId);
      started = true;
      elapsed = DURATION;
      if (prepared) draw(elapsed);
    };

    const revealObserver = new MutationObserver(startWhenRevealed);
    if (introContent) revealObserver.observe(introContent, { attributes: true, attributeFilter: ['data-intro-state'] });
    const resizeObserver = new ResizeObserver(prepare);
    resizeObserver.observe(wrapper);
    reducedMotion.addEventListener('change', settle);
    document.addEventListener('visibilitychange', settle);
    void document.fonts.ready.then(() => {
      if (!cancelled) prepare();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      revealObserver.disconnect();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener('change', settle);
      document.removeEventListener('visibilitychange', settle);
    };
  }, []);

  return (
    <span ref={wrapperRef} className="home-page__name" role="img" aria-label={NAME}>
      <span className="home-page__name-fallback" aria-hidden="true">{NAME}</span>
      <canvas ref={canvasRef} className="home-page__name-canvas" aria-hidden="true" />
    </span>
  );
}
