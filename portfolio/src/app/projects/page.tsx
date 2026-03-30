'use client';
export default function Projects() {
  const projects = [
    { title: "Valorant Tracker TUI", link: "https://github.com/alexchen1337/valorant-tracker-tui" },
    { title: "SpeakWell", link: "https://github.com/alexchen1337/SpeakWell" },
    { title: "AI Summary Footer", link: "https://www.npmjs.com/package/ai-summary-footer" },
    { title: "Smart Ride", link: "https://github.com/ericcht/Smart-Ride" },
    { title: "Socket Chat Server", link: "https://github.com/alexchen1337/multithreaded-socket-chat-server" },
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
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link"
            style={{
              padding: '2rem',
              backgroundColor: '#fff',
              border: '1px solid #eaeaea',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600', lineHeight: '1.3', color: '#1d1d1f' }}>
              {project.title}
            </h3>
          </a>
        ))}
      </div>
      
      <style jsx>{`
        .project-card-link:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
          border-color: #ddd;
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
            margin-bottom: 2rem !important;
          }
          
          .project-card-link {
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
