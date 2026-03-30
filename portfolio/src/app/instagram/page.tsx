'use client';

export default function Instagram() {
  return (
    <div className="copy-body">
      <h1 className="instagram-title" style={{ textAlign: 'center' }}>Instagram</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--muted)', textAlign: 'center' }}>
        Follow me on Instagram:{' '}
        <a href="https://instagram.com/al3xch7" target="_blank" rel="noopener noreferrer" className="pill-link" style={{ display: 'inline-flex' }}>
          @al3xch7
        </a>
      </p>
      
      <div style={{ 
        width: '100%', 
        maxWidth: '540px', 
        margin: '0 auto',
        aspectRatio: '1/1',
        border: '1px solid #eee',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <iframe
          src="https://www.instagram.com/al3xch7/embed"
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none',
            overflow: 'hidden'
          }}
          scrolling="no"
        />
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a
          href="https://instagram.com/al3xch7"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-link"
          style={{ padding: '0.65rem 1.25rem' }}
        >
          View on Instagram
        </a>
      </div>
      
      <style jsx>{`
        @media (max-width: 768px) {
          .instagram-title {
            font-size: 2rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .instagram-title {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}

