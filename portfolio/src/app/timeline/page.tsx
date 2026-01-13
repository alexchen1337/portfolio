'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Experience {
  year: string;
  title: string;
  company: string;
  location: string;
  logo: string;
  details: string[];
}

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences: Experience[] = [
    {
      year: "Mar 2026",
      title: "Incoming Software Engineering Intern — Google Search Team",
      company: "Google",
      location: "New York, NY",
      logo: "/google.png",
      details: [
        "• Search Team",
        // "•",
        // "•"
      ]
    },
    {
      year: "Nov 2025 — Present",
      title: "Research Software Engineer",
      company: "Multimodal Analytics, Reasoning, and Computational Imaging",
      location: "Remote",
      logo: "/utk.png",
      details: [
        "• Led the development of an analytics platform for the Defense Counterintelligence and Security Agency, supporting real-time decision-making for federal users",
        "• Implemented RESTful APIs and inference pipelines, achieving ∼200 ms p95 response latency in production",
        "• Orchestrated cloud-native deployments on AWS using Kubernetes and Docker, achieving 99.9% uptime and automated horizontal scaling",
      ]
    },
    {
      year: "Mar 2025 — Aug 2025",
      title: "Software Engineering Intern",
      company: "Nexus",
      location: "Knoxville, TN",
      logo: "/nexus.png",
      details: [
        "• Shipped full-stack product features addressing customer needs, streamlining user journeys and onboarding",
        "• Built a VM monitoring tool to detect data ingestion failures, cutting identification time from 30+ min to <10 sec",
        "• Automated customer support tickets by developing a custom email protocol layer, improving team-to-customer response times by 41%",
      ]
    },
    {
      year: "Dec 2023 — May 2024",
      title: "AI/ML Research Assistant",
      company: "Zhao Robot Laboratory",
      location: "Knoxville, TN",
      logo: "/utk.png",
      details: [
        "• Leveraged LLMs (e.g. ChatGPT, Gemini) to extract linguistic patterns from responses for Alzheimer’s research",
        "• Integrated vector search and retrieval pipelines using FAISS to improve data indexing precision by 27%",
      ]
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
          const isExpanded = expandedIndex === index;
          
          return (
            <div
              key={index}
              onClick={() => toggleExpand(index)}
              style={{
                position: 'relative',
                cursor: 'pointer',
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

                <div style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="#86868b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div style={{
                overflow: 'hidden',
                maxHeight: isExpanded ? '300px' : '0',
                opacity: isExpanded ? 1 : 0,
                transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease'
              }}>
                <div style={{
                  paddingBottom: '1.5rem',
                  paddingLeft: 'calc(56px + 1.25rem)'
                }}>
                  <ul style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.625rem'
                  }}>
                    {exp.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        style={{
                          fontSize: '0.9375rem',
                          color: '#1d1d1f',
                          lineHeight: '1.5',
                          paddingLeft: '1rem',
                          position: 'relative'
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: '#86868b'
                        }}>
                          {detail.startsWith('•') ? '•' : ''}
                        </span>
                        {detail.startsWith('•') ? detail.slice(1).trim() || '\u00A0' : detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
