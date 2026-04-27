'use client';

import Image from 'next/image';

interface Experience {
  year: string;
  title: string;
  company: string;
  location: string;
  logo?: string;
}

export default function Experience() {

  const experiences: Experience[] = [
    {
      year: "Jun 2026",
      title: "Incoming Founding Engineer",
      company: "Melius",
      location: "New York, NY",
      logo: "/melius.png"
    },
    {
      year: "Mar 2026 — Present",
      title: "Software Engineering Intern",
      company: "Google",
      location: "New York, NY",
      logo: "/google.png"
    },
    {
      year: "Nov 2025 — Present",
      title: "Research Software Engineer",
      company: "MARCI Laboratory",
      location: "Remote",
      logo: "/marci.png"
    },
    {
      year: "Mar 2025 — Aug 2025",
      title: "Software Engineering Intern",
      company: "Nexus",
      location: "Knoxville, TN",
      logo: "/nexus.png"
    }
  ];

  return (
    <div style={{
      padding: '1rem 1.5rem 4rem',
      maxWidth: '720px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          fontWeight: '600',
          letterSpacing: '-0.04em',
          color: '#1d1d1f',
          marginBottom: '0.5rem'
        }}>
          Experience
        </h1>
        {/* <p style={{
          fontSize: '1.1rem',
          color: '#86868b',
          fontWeight: '400',
          letterSpacing: '-0.01em'
        }}>
          Where I've been building.
        </p> */}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0'
      }}>
        {experiences.map((exp, index) => {
          return (
            <div
              key={index}
              style={{
                position: 'relative',
                borderTop: index === 0 ? '1px solid #d2d2d7' : 'none',
                borderBottom: '1px solid #d2d2d7'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.5rem 0',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {exp.logo ? (
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)';
                  }}>
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={40}
                      height={40}
                      style={{
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ width: '56px', flexShrink: 0 }} aria-hidden />
                )}

                <div style={{
                  flex: 1,
                  minWidth: 0
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '0.25rem',
                    flexWrap: 'wrap'
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1d1d1f',
                      letterSpacing: '-0.02em',
                      lineHeight: '1.3'
                    }}>
                      {exp.company}
                    </h3>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      fontWeight: '400',
                      whiteSpace: 'nowrap'
                    }}>
                      {exp.year}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.9375rem',
                    color: '#1d1d1f',
                    fontWeight: '400',
                    marginBottom: '0.125rem',
                    letterSpacing: '-0.01em'
                  }}>
                    {exp.title}
                  </p>

                  <p style={{
                    fontSize: '0.875rem',
                    color: '#86868b',
                    fontWeight: '400'
                  }}>
                    {exp.location}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
