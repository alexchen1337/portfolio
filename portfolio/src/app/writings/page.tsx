'use client';

import Link from "next/link";

export default function Writings() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Writings</h1>
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <Link
          href="/writings/january-2026-reflection"
          style={{
            display: 'block',
            padding: '1.5rem',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'var(--foreground)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#333';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e5e5';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <h2 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.5rem' }}>
            January 2026 Reflection
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
            Reflections on startup opportunities, coffee chats, and navigating my career path
          </p>
        </Link>

        <Link
          href="/writings/my-2025-in-review"
          style={{
            display: 'block',
            padding: '1.5rem',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'var(--foreground)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#333';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e5e5';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <h2 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.5rem' }}>
            My 2025 In Review
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
            A reflection on my journey through 2025
          </p>
        </Link>
      </div>
    </div>
  );
}
