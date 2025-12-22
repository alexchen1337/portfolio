'use client';

import { useState, useEffect } from 'react';

export default function Experience() {
  const [isMobile, setIsMobile] = useState(false);

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
      year: "Mar 2026",
      title: "Incoming Software Engineer Intern",
      company: "Google",
      location: "New York, NY"
    },
    {
      year: "Aug 2025 - Present",
      title: "Software Engineer — AI/ML Research",
      company: "MARCI Laboratory",
      location: "Remote"
    },
    {
      year: "Mar 2025 - Aug 2025",
      title: "Software Engineer Intern",
      company: "Nexus",
      location: "Knoxville, TN"
    },
    {
      year: "Dec 2023 - May 2024",
      title: "AI/ML Research Assistant",
      company: "Zhao Robot Laboratory",
      location: "Knoxville, TN"
    }
  ];

  if (isMobile) {
    return (
      <div style={{
        padding: '2rem 1.5rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #111 0%, #444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Experience
          </h1>
        </div>

        <div style={{
          position: 'relative',
          paddingLeft: '2rem'
        }}>
          <div style={{
            position: 'absolute',
            left: '0.75rem',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'linear-gradient(180deg, transparent 0%, #111 10%, #111 90%, transparent 100%)',
            borderRadius: '2px'
          }} />

          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                marginBottom: '2.5rem',
                paddingBottom: '2rem',
                borderBottom: index === experiences.length - 1 ? 'none' : '1px solid #f0f0f0'
              }}
            >
              <div style={{
                position: 'absolute',
                left: '-1.375rem',
                top: '0.5rem',
                width: '14px',
                height: '14px',
                backgroundColor: '#111',
                borderRadius: '50%',
                border: '3px solid #fff',
                boxShadow: '0 0 0 2px #111',
                zIndex: 2
              }} />

              <div style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                color: '#111',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {exp.year}
              </div>

              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '0.35rem',
                color: '#111',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}>
                {exp.title}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
                fontSize: '0.85rem',
                color: '#555',
                fontWeight: '500'
              }}>
                <span style={{ color: '#111' }}>{exp.company}</span>
                <span style={{ color: '#666' }}>{exp.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      //need experience to have less gap between the top of page  and the experience
      padding: '-5rem 2rem 2rem',
      maxWidth: '1100px',
      margin: '0 auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '1rem'
      }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: '800',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #111 0%, #444 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Experience
        </h1>
      </div>

      <div style={{
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '2px',
          background: 'linear-gradient(180deg, transparent 0%, #111 10%, #111 90%, transparent 100%)',
          transform: 'translateX(-50%)',
          zIndex: 0
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          position: 'relative',
          zIndex: 1
        }}>
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end'
                }}
              >
                <div style={{
                  width: '42%',
                  padding: '1rem',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  border: '2px solid #111',
                  boxShadow: '3px 3px 0px #111',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '5px 5px 0px #111';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '3px 3px 0px #111';
                }}>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    color: '#111',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    {exp.year}
                  </div>

                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    marginBottom: '0.4rem',
                    color: '#111',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em'
                  }}>
                    {exp.title}
                  </h3>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.15rem',
                    fontSize: '0.85rem',
                    color: '#555',
                    fontWeight: '500'
                  }}>
                    <span style={{ color: '#111', fontWeight: '600' }}>{exp.company}</span>
                    <span style={{ color: '#666', fontSize: '0.8rem' }}>{exp.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
