'use client';

import { useState, useEffect } from 'react';

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardYOffset = 140;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
 
  const experiences = [
    {
      year: "Winter 2025",
      title: "Incoming SWE Intern",
      company: "IBM",
      location: "Yorktown Heights, NY",
      description: "Working with IBM Research on AI integration, site reliability, and automation.",
      details: []
    },
    {
      year: "Aug 2025 - Present",
      title: "Software Engineer/ML Research Assistant",
      company: "MARCI Lab",
      location: "Remote",
      description: "Building a government project with Next.js and Python on Azure, covering frontend, backend, database design, auth, and ML pipelines end-to-end.",
      details: []
    },
    {
      year: "Mar 2025 - Aug 2025",
      title: "Software Engineer Intern",
      company: "Nexus",
      location: "Knoxville, TN",
      description: "Worked across Nexus’s core product surface, from customer-facing dashboards to the internal support backbone, so support agents and end users stayed aligned.",
      details: [
        "Built and iterated on internal support workflows plus customer dashboards, threading chat histories and suggested prompts to keep responses consistent and fast.",
        "Developed and hardened ETL pipelines, adding an internal monitoring tool that flags potential data failures before they hit production.",
        "Improved mobile stability by fixing React Native race conditions and tightening error visibility through VM health tracking."
      ]
    },
    {
      year: "Dec 2023 - May 2024",
      title: "AI/ML Research Assistant",
      company: "Zhao Robot Lab",
      location: "Knoxville, TN",
      description: "Researched language understanding for patient studies by pairing GPT/Gemini analyses with search and evaluation tooling.",
      details: [
        "Extracted linguistic patterns from patient responses and validated them with custom metrics and automated reporting.",
        "Implemented FAISS-based search to boost indexing precision while optimizing pipelines to cut analysis turnaround."
      ]
    }
  ];

  if (isMobile) {
    const reversedExperiences = experiences.slice().reverse();
    
    return (
      <>
        <div style={{ padding: '2rem 0' }}>
          <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem', fontWeight: '600' }}>Experience</h1>
          <p style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#666' }}>(Click a card for more info)</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reversedExperiences.map((exp, index) => (
              <div
                key={index}
                onClick={() => setSelectedExp(experiences.length - 1 - index)}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #eaeaea',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#666',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {exp.year}
                </div>

                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '0.25rem',
                  color: '#111',
                  lineHeight: '1.3'
                }}>
                  {exp.title}
                </h3>

                <div style={{
                  fontSize: '0.9rem',
                  color: '#444',
                  marginBottom: '0.25rem'
                }}>
                  {exp.company}
                </div>

                <div style={{
                  fontSize: '0.8rem',
                  color: '#888'
                }}>
                  {exp.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedExp !== null && (
          <div 
            onClick={() => setSelectedExp(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              backdropFilter: 'blur(8px)',
              padding: '1rem'
            }}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: '600', 
                color: '#666',
                marginBottom: '0.5rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                {experiences[selectedExp].year}
              </div>
              
              <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
                {experiences[selectedExp].title}
              </h2>
              
              <div style={{ 
                fontSize: '1rem', 
                marginBottom: '1.5rem', 
                color: '#444',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <span style={{ fontWeight: '500' }}>{experiences[selectedExp].company}</span>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>{experiences[selectedExp].location}</span>
              </div>
              
              <p style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6', color: '#444' }}>
                {experiences[selectedExp].description}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {experiences[selectedExp].details.map((detail, i) => (
                  <p key={i} style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: '#333' }}>
                    {detail}
                  </p>
                ))}
              </div>
              
              <button
                onClick={() => setSelectedExp(null)}
                style={{
                  padding: '0.85rem 1.5rem',
                  backgroundColor: '#111',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  width: '100%'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  const reversedExperiences = experiences.slice().reverse();
  
  return (
    <>
      <div className="timeline-wrapper" style={{ padding: '2rem 0 4rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <div className="timeline-container" style={{ position: 'relative', width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="timeline-line" style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            right: '0',
            height: '2px',
            background: '#e5e5e5',
            zIndex: 0,
            transform: 'translateY(-50%)'
          }} />

          <div className="timeline-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            position: 'relative'
          }}>
            {reversedExperiences.map((exp, index) => {
              const originalIndex = experiences.length - 1 - index;
              const isHovered = hoveredIndex === originalIndex;
              const isTop = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className="timeline-item"
                  style={{
                    position: 'relative',
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div className="timeline-dot" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '12px',
                    height: '12px',
                    backgroundColor: isHovered ? '#000' : '#fff',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    transition: 'all 0.3s ease'
                  }} />

                  <div className="timeline-connector" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '1px',
                    height: `${cardYOffset}px`,
                    backgroundColor: '#e5e5e5',
                    transform: `translate(-50%, ${isTop ? `-${cardYOffset}px` : '0'})`,
                    zIndex: 0
                  }} />

                  <div
                    onClick={() => setSelectedExp(originalIndex)}
                    onMouseEnter={() => setHoveredIndex(originalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="timeline-card"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, ${isTop ? `calc(-50% - ${cardYOffset}px)` : `calc(-50% + ${cardYOffset}px)`})`,
                      width: '100%',
                      maxWidth: '280px',
                      padding: '1.5rem',
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '1px solid #eaeaea',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isHovered ? '0 8px 30px rgba(0,0,0,0.12)' : '0 4px 6px rgba(0,0,0,0.04)',
                      zIndex: 5
                    }}
                  >
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#666',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {exp.year}
                    </div>

                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      marginBottom: '0.25rem',
                      color: '#111',
                      lineHeight: '1.3'
                    }}>
                      {exp.title}
                    </h3>

                    <div style={{
                      fontSize: '0.9rem',
                      color: '#444',
                      marginBottom: '0.25rem'
                    }}>
                      {exp.company}
                    </div>

                    <div style={{
                      fontSize: '0.8rem',
                      color: '#888'
                    }}>
                      {exp.location}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedExp !== null && (
        <div 
          onClick={() => setSelectedExp(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(8px)',
            padding: '1rem'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
            style={{
              backgroundColor: '#fff',
              padding: '3rem',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ 
              fontSize: '0.85rem', 
              fontWeight: '600', 
              color: '#666',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {experiences[selectedExp].year}
            </div>
            
            <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
              {experiences[selectedExp].title}
            </h2>
            
            <div style={{ 
              fontSize: '1.1rem', 
              marginBottom: '2rem', 
              color: '#444',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontWeight: '500' }}>{experiences[selectedExp].company}</span>
              <span style={{ color: '#ccc' }}>•</span>
              <span style={{ color: '#666' }}>{experiences[selectedExp].location}</span>
            </div>
            
            <p style={{ marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.7', color: '#444' }}>
              {experiences[selectedExp].description}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {experiences[selectedExp].details.map((detail, i) => (
                <p key={i} style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.7', color: '#333' }}>
                  {detail}
                </p>
              ))}
            </div>
            
            <button
              onClick={() => setSelectedExp(null)}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                width: '100%',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @media (max-width: 1024px) {
          .timeline-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
