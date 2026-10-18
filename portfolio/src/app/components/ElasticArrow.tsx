'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

export default function ElasticArrow() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 240, damping: 15 });
  const y = useSpring(targetY, { stiffness: 240, damping: 15 });

  useEffect(() => {
    const link = ref.current?.closest('a');
    if (!link || reduced) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = link.getBoundingClientRect();
      targetX.set(((event.clientX - bounds.left) / bounds.width) * 5);
      targetY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 5);
    };
    const reset = () => { targetX.set(0); targetY.set(0); };
    link.addEventListener('pointermove', move);
    link.addEventListener('pointerleave', reset);
    return () => { link.removeEventListener('pointermove', move); link.removeEventListener('pointerleave', reset); };
  }, [reduced, targetX, targetY]);

  return <motion.span ref={ref} className="elastic-arrow" style={{ x, y }} aria-hidden="true">↗</motion.span>;
}
