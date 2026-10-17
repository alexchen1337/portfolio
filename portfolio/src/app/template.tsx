'use client';

import { usePathname } from 'next/navigation';
import HalftoneReveal from './components/HalftoneReveal';
import { willPlayIntro } from './components/PortfolioIntro';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The intro is home's own entrance; a reveal underneath would clip its overlay.
  return (
    <HalftoneReveal key={pathname} disabled={pathname === '/' && willPlayIntro()}>
      {children}
    </HalftoneReveal>
  );
}
