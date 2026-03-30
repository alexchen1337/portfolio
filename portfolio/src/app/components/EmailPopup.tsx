'use client';

import { useState } from 'react';

export default function EmailPopup({ 
  show, 
  onClose 
}: { 
  show: boolean; 
  onClose: () => void; 
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('chen.alex603@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!show) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.2s ease-in',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          padding: '1.75rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          maxWidth: '380px',
          width: '100%',
          animation: 'slideUp 0.3s ease-out',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#8b949e',
            padding: 0,
            lineHeight: 1,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.875rem', margin: 0, color: '#c9d1d9' }}>chen.alex603@gmail.com</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <button
            onClick={copyToClipboard}
            title="copy"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: copied ? '#3fb950' : '#8b949e',
              transition: 'color 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.7rem',
              fontFamily: 'inherit',
            }}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
            {copied ? 'copied!' : 'copy'}
          </button>
          <a
            href="mailto:chen.alex603@gmail.com"
            title="open in mail app"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: '#8b949e',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.7rem',
              textDecoration: 'none',
              fontFamily: 'inherit',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            mailto
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
