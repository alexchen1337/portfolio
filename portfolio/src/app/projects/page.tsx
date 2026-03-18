'use client';
export default function Projects() {
  const projects = [
    { title: "Valorant Tracker TUI", link: "https://github.com/alexchen1337/valorant-tracker-tui" },
    { title: "SpeakWell", link: "https://github.com/alexchen1337/SpeakWell" },
    { title: "AI Summary Footer", link: "https://www.npmjs.com/package/ai-summary-footer" },
    { title: "Smart Ride", link: "https://github.com/ericcht/Smart-Ride" },
    { title: "Socket Chat Server", link: "https://github.com/alexchen1337/multithreaded-socket-chat-server" },
    { title: "9to5 Simulator", link: "https://github.com/alexchen1337/9to5" }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2.5rem', fontSize: '2.5rem', fontWeight: '600', textAlign: 'center' }}>Projects</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="project-card"
            style={{ 
              padding: '2rem',
              backgroundColor: '#fff',
              border: '1px solid #eaeaea',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600', lineHeight: '1.3' }}>
              {project.title}
            </h3>
            <div>
              <a 
                href={project.link} 
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '500', 
                  textDecoration: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  color: 'var(--foreground)'
                }}
              >
                View Project <span>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
          border-color: #ddd;
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
            margin-bottom: 2rem !important;
          }
          
          .project-card {
            padding: 1.5rem !important;
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}
