'use client';

import { useLayoutEffect, useRef } from 'react';

const NAME = 'alex chen';
const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789!?#%&*+=/';
const DURATION = 1400;
const FRAME_INTERVAL = 65;
const DOT_SPACING = 1.3;

export default function HalftoneName({ variant = 'home' }: { variant?: 'home' | 'header' }) {
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
    let scatterFrame = 0;
    let scatterLast = 0;
    let pointer = { x: 0, y: 0, active: false };
    let pulseUntil = 0;
    let cloud: Array<{ x: number; y: number; px: number; py: number; vx: number; vy: number; radius: number }> = [];

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

      if (progress === 1) cloud = [];
      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
          const alpha = pixels[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] / 255;
          if (alpha < 0.12) continue;
          const radius = Math.sqrt(alpha) * DOT_SPACING * 0.5;
          if (progress === 1) cloud.push({ x, y, px: x, py: y, vx: 0, vy: 0, radius });
          context.moveTo(x + radius, y);
          context.arc(x, y, radius, 0, Math.PI * 2);
        }
      }
      context.fill();
      context.globalAlpha = 1;
      wrapper.dataset.rendered = 'true';
    };

    const scatter = (timestamp: number) => {
      scatterFrame = 0;
      if (cancelled || reducedMotion.matches || document.hidden || elapsed < DURATION) return;
      const step = Math.min(2, (timestamp - scatterLast) / 16.67 || 1);
      scatterLast = timestamp;
      let moving = false;
      context.clearRect(0, 0, width, height);
      context.fillStyle = ink;
      context.beginPath();
      for (const dot of cloud) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const force = (pointer.active || timestamp < pulseUntil) ? Math.max(0, 1 - distance / 34) : 0;
        const tx = dot.x + dx / Math.max(1, distance) * force * 9;
        const ty = dot.y + dy / Math.max(1, distance) * force * 7;
        dot.vx = (dot.vx + (tx - dot.px) * 0.1 * step) * Math.pow(0.72, step);
        dot.vy = (dot.vy + (ty - dot.py) * 0.1 * step) * Math.pow(0.72, step);
        dot.px += dot.vx * step;
        dot.py += dot.vy * step;
        moving ||= Math.abs(dot.px - dot.x) + Math.abs(dot.py - dot.y) + Math.abs(dot.vx) + Math.abs(dot.vy) > 0.03;
        context.moveTo(dot.px + dot.radius, dot.py);
        context.arc(dot.px, dot.py, dot.radius, 0, Math.PI * 2);
      }
      context.fill();
      if (pointer.active || timestamp < pulseUntil || moving) scatterFrame = requestAnimationFrame(scatter);
    };
    const wakeScatter = () => {
      if (!scatterFrame && !reducedMotion.matches && elapsed === DURATION) {
        scatterLast = performance.now();
        scatterFrame = requestAnimationFrame(scatter);
      }
    };
    const move = (event: PointerEvent) => {
      const bounds = wrapper.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, active: event.pointerType === 'mouse' };
      if (event.pointerType !== 'mouse') pulseUntil = performance.now() + 250;
      wakeScatter();
    };
    const leave = () => { pointer.active = false; wakeScatter(); };
    const focus = () => { pointer = { x: width / 2, y: height / 2, active: true }; wakeScatter(); };
    wrapper.addEventListener('pointermove', move);
    wrapper.addEventListener('pointerdown', move);
    wrapper.addEventListener('pointerleave', leave);
    wrapper.addEventListener('focus', focus);
    wrapper.addEventListener('blur', leave);

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
      window.cancelAnimationFrame(scatterFrame);
      scatterFrame = 0;
      pointer.active = false;
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
      cancelAnimationFrame(scatterFrame);
      wrapper.removeEventListener('pointermove', move);
      wrapper.removeEventListener('pointerdown', move);
      wrapper.removeEventListener('pointerleave', leave);
      wrapper.removeEventListener('focus', focus);
      wrapper.removeEventListener('blur', leave);
      window.cancelAnimationFrame(frameId);
      revealObserver.disconnect();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener('change', settle);
      document.removeEventListener('visibilitychange', settle);
    };
  }, []);

  return (
    <span ref={wrapperRef} className={`home-page__name home-page__name--${variant}`} role="img" aria-label={NAME} tabIndex={variant === 'home' ? 0 : undefined}>
      <span className="home-page__name-fallback" aria-hidden="true">{NAME}</span>
      <canvas ref={canvasRef} className="home-page__name-canvas" aria-hidden="true" />
    </span>
  );
}
