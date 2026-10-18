'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

// The original GIF has six 50ms frames, extracted into one transparent strip.
const FRAME_COUNT = 6;
const FRAME_DURATION = 50;
const IDLE_SPEED = 0.35;
const MAX_SPEED = 3;
const FRICTION = 1.4;

export default function FrierenCompanion() {
  const reduced = useReducedMotion();
  const tilt = useMotionValue(0);
  const rotate = useSpring(tilt, { stiffness: 180, damping: 16 });
  const offset = useMotionValue('0%');
  const speed = useRef(IDLE_SPEED);
  const phase = useRef(0);

  useEffect(() => {
    let frameId = 0;
    let lastTime = 0;
    let lastFrame = -1;
    speed.current = IDLE_SPEED;

    const animate = (timestamp: number) => {
      const delta = Math.min(100, timestamp - lastTime) / 1000;
      lastTime = timestamp;
      const decay = Math.exp(-delta / FRICTION);
      // Integrate the decaying momentum so clicks change speed without
      // restarting the animation or jumping to a different pose.
      phase.current += (IDLE_SPEED * delta + (speed.current - IDLE_SPEED) * FRICTION * (1 - decay)) * 1000;
      speed.current = IDLE_SPEED + (speed.current - IDLE_SPEED) * decay;
      const frame = Math.floor(phase.current / FRAME_DURATION) % FRAME_COUNT;
      if (frame !== lastFrame) {
        offset.set(`${-frame * 100 / FRAME_COUNT}%`);
        lastFrame = frame;
      }
      frameId = requestAnimationFrame(animate);
    };

    const sync = () => {
      cancelAnimationFrame(frameId);
      if (reduced || document.hidden) {
        speed.current = IDLE_SPEED;
        return;
      }
      lastTime = performance.now();
      frameId = requestAnimationFrame(animate);
    };

    if (reduced) { phase.current = 0; offset.set('0%'); }
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => { cancelAnimationFrame(frameId); document.removeEventListener('visibilitychange', sync); };
  }, [reduced, offset]);

  const boost = () => {
    if (reduced) {
      phase.current += FRAME_DURATION;
      offset.set(`${-(Math.floor(phase.current / FRAME_DURATION) % FRAME_COUNT) * 100 / FRAME_COUNT}%`);
      return;
    }
    speed.current = Math.min(MAX_SPEED, speed.current + 0.7);
  };

  return (
    <div className="frieren-companion">
      <motion.button
        type="button"
        className="home-page__avatar-link frieren-button"
        aria-label={reduced ? 'Change Frieren’s pose' : 'Spin Frieren faster'}
        aria-describedby="frieren-hint"
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== 'mouse') return;
          const bounds = event.currentTarget.getBoundingClientRect();
          tilt.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
        }}
        onPointerLeave={() => tilt.set(0)}
        onClick={boost}
        style={{ rotate: reduced ? 0 : rotate }}
      >
        <span className="home-page__avatar frieren-viewport" aria-hidden="true">
          <motion.img src="/frieren-frames.png" alt="" width={1200} height={179}
            className="frieren-frames" style={{ x: offset }} draggable={false} />
        </span>
      </motion.button>
      <span id="frieren-hint" className="frieren-hint">{reduced ? 'tap to change pose' : 'click to spin faster'}</span>
    </div>
  );
}
