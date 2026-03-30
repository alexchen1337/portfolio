'use client';

import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWritings =
    pathname === '/writings' || pathname.startsWith('/writings/');

  return (
    <div
      style={
        isWritings
          ? undefined
          : { animation: 'routeTransition 0.2s ease-out' }
      }
    >
      {children}
    </div>
  );
}
