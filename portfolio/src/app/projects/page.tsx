'use client';
export default function Projects() {
  const projects = [
    {
      title: "Float.AI - Valorant AI Coach",
      description: "AI-powered coaching system using policy-gradient models trained on 200+ professional matches. Built with React, FastAPI, Overwolf, Azure, and PyTorch.",
      link: "https://floatdemo.vercel.app/"
    },
    {
      title: "Reinforcement Learning in Terraria",
      description: "Applying reinforcement learning algorithms to train agents in the Terraria game environment.",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7394860085287530496/"
    },
    {
      title: "SpeakGeek - Google AI Hackathon",
      description: "Behavioral interview feedback platform using Google Gemini. Built with React, Firebase, and TailwindCSS.",
      link: "https://6610ac02dfac427cb4cf4d6b--serene-douhua-d88e0e.netlify.app/"
    },
    {
      title: "Video Compression Tool",
      description: "C++ tool to compress files into smaller chunks for Discord upload and reconstruction.",
      link: "https://github.com/alexchen1337/video-compression-tool"
    },
    {
      title: "Smart Ride",
      description: "Machine learning analysis on Uber dataset to predict ride patterns and optimize routes.",
      link: "https://github.com/ericcht/Smart-Ride"
    },
    {
      title: "Multithreaded Socket Chat Server",
      description: "High-performance chat server implementation using multithreading and socket programming.",
      link: "https://github.com/alexchen1337/multithreaded-socket-chat-server"
    },
    {
      title: "9to5 - Python Game",
      description: "Interactive Python-based game exploring work-life balance themes.",
      link: "https://github.com/alexchen1337/9to5"
    }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2.5rem', fontSize: '2.5rem', fontWeight: '600' }}>Projects</h1>
      
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
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem', fontWeight: '600', lineHeight: '1.3' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--muted)', flex: 1, lineHeight: '1.6' }}>
              {project.description}
            </p>
            <div style={{ marginTop: 'auto' }}>
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
