'use client';

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  return (
    <>
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ fontWeight: 'bold', color: 'var(--foreground)', fontSize: '1.1rem', textDecoration: 'none' }}>
            Alex Chen
          </Link>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => setShowEmailPopup(true)}
              style={{ 
                display: 'flex', 
                opacity: 0.6, 
                transition: 'opacity 0.2s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} 
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </button>
            
            <a 
              href="https://www.linkedin.com/in/alexch7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'flex', opacity: 0.6, transition: 'opacity 0.2s' }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} 
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </a>
            <a 
              href="https://x.com/alexch1337" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'flex', opacity: 0.6, transition: 'opacity 0.2s' }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} 
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a 
              href="https://github.com/alexchen1337" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'flex', opacity: 0.6, transition: 'opacity 0.2s' }} 
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} 
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
          </div>
        </div>
        <nav className="nav">
          <Link href="/timeline" className="nav-link">Experience</Link>
          <Link href="/projects" className="nav-link">Projects</Link>
          <Link href="/instagram" className="nav-link">Instagram</Link>
        </nav>
      </header>

      {showEmailPopup && (
        <div 
          onClick={() => setShowEmailPopup(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.2s ease-in'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--background)',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              maxWidth: '400px',
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Email</h3>
            <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--foreground)' }}>
              alex.ch7@outlook.com
            </p>
            <button
              onClick={() => setShowEmailPopup(false)}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
