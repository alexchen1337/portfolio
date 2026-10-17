'use client';

import { useEffect, useState } from 'react';

// The first paint is a full page load, not a navigation, so it stays static.
let isInitialLoad = true;

export default function HalftoneReveal({ children, disabled = false }: { children: React.ReactNode; disabled?: boolean }) {
  const [isRevealing, setIsRevealing] = useState(() => !isInitialLoad && !disabled);

  useEffect(() => {
    isInitialLoad = false;
  }, []);

  return (
    <div
      className={isRevealing ? 'halftone-reveal' : undefined}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setIsRevealing(false);
      }}
    >
      {children}
    </div>
  );
}
