'use client';
import { useState } from 'react';

export default function Valorant() {
  const [hovering, setHovering] = useState(false);
  return (
    <div style={{ maxWidth: '720px', margin: '-2rem auto 0', padding: '0 1.5rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '600', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Valorant
        </h1>
        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>
          3x radiant, used to compete semi-professionally—retired now but check out my clips
        </p>
      </div>

      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        aspectRatio: '16/9',
        width: '100%',
      }}>
        <iframe
          src="https://www.youtube.com/embed/3v1ElN27dfU"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
        <a
          href="https://www.youtube.com/@ChiuceVAL/videos"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{
            fontSize: '0.85rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#111',
            opacity: hovering ? 0.5 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          view all on youtube
          <span style={{ transition: 'transform 0.2s', transform: hovering ? 'translateX(3px)' : 'translateX(0)' }}>→</span>
        </a>
      </div>
    </div>
  );
}
