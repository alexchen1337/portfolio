'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'motion/react';

const DOTS = 15;

export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const article = document.querySelector('.writings-article');
    const progress = ref.current;
    if (!article || !progress) return;
    const update = () => {
      const bounds = article.getBoundingClientRect();
      const distance = bounds.height - window.innerHeight;
      const value = distance <= 0 ? 1 : Math.max(0, Math.min(1, -bounds.top / distance));
      progress.setAttribute('aria-valuenow', String(Math.round(value * 100)));
      progress.dataset.complete = String(value >= 0.995);
      Array.from(progress.children).forEach((dot, index) => {
        (dot as HTMLElement).dataset.filled = String(index / (DOTS - 1) <= value);
      });
    };
    const unsubscribe = scrollY.on('change', update);
    const observer = new ResizeObserver(update);
    observer.observe(article);
    window.addEventListener('resize', update);
    update();
    return () => { unsubscribe(); observer.disconnect(); window.removeEventListener('resize', update); };
  }, [scrollY]);

  return (
    <div ref={ref} className="reading-progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
      {Array.from({ length: DOTS }, (_, index) => <span key={index} />)}
    </div>
  );
}
