'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import HalftoneName from "./HalftoneName";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  /** Individual post: /writings/[slug] — back goes to index, not home */
  const isWritingPost = /^\/writings\/.+/.test(pathname);
  const backHref = isWritingPost ? '/writings' : '/';

  if (isHomePage) return null;

  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '1.5rem 0 1rem' }}>
      <Link
        href={backHref}
        className="header-back-link"
        style={{
          fontSize: '14px',
          fontWeight: 700,
          color: 'var(--accent)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: 'var(--dim)' }}>{'<-'}</span>
        {isWritingPost ? 'writings' : <HalftoneName variant="header" />}
      </Link>
    </header>
  );
}
