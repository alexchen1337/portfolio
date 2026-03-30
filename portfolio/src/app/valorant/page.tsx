'use client';

export default function Valorant() {
  return (
    <div className="copy-body" style={{ maxWidth: '720px', margin: '-1rem auto 0', padding: '0 0 1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="section-label">// valorant</span>
        <p style={{ color: '#fff', lineHeight: '1.6', marginTop: '8px', marginBottom: 0 }}>
          3x radiant, used to compete semi-professionally—retired now but check out my clips
        </p>
      </div>

      <div style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
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

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <a
          href="https://www.youtube.com/@ChiuceVAL/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-link"
          style={{ fontSize: '12px' }}
        >
          view all on youtube
          <span className="pill-link-arrow">{'->'}</span>
        </a>
      </div>
    </div>
  );
}
