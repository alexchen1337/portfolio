'use client';

import { useEffect, useRef, useState } from 'react';

export default function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // We only need this state to force re-render if needed, but for pause/play we use ref.
  // Actually, we don't even need state for pause if we don't show UI indicators.
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initialize from current position to avoid jumps
    let scrollAmount = container.scrollLeft;
    const scrollSpeed = 0.5;
    let animationFrameId: number;

    const autoScroll = () => {
      if (container && !isPausedRef.current) {
        scrollAmount += scrollSpeed;
        
        // Calculate single set width dynamically
        // We have 4 sets. 
        // The full scrollWidth is 4 * singleSetWidth.
        // We want to loop when we reach the end of the first set.
        const singleSetWidth = container.scrollWidth / 4;
        
        if (scrollAmount >= singleSetWidth) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        } else {
          container.scrollLeft = scrollAmount;
        }
      } else if (container) {
        // If paused, keep scrollAmount synced with actual scroll position
        // so when we resume, we start from where the user left off
        scrollAmount = container.scrollLeft;
      }
      
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    const handleMouseEnter = () => {
      isPausedRef.current = true;
    };

    const handleMouseLeave = () => {
      isPausedRef.current = false;
    };

    const handleScroll = () => {
      // We only care about scroll events if we want to detect MANUAL scrolling.
      // If the loop is running (isPausedRef is false), scroll events are fired by autoScroll too.
      // We need to differentiate.
      
      // If we are already paused (hovering), manual scroll is fine, we stay paused.
      
      // If we are NOT paused (auto-scrolling), and a scroll event happens...
      if (!isPausedRef.current) {
        // Check if the scroll position is significantly different from what we expect
        // (Allow small margin for float/rounding differences)
        if (Math.abs(container.scrollLeft - scrollAmount) > 5) {
           // User manually scrolled!
           isPausedRef.current = true;
           
           if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
           
           scrollTimeoutRef.current = setTimeout(() => {
             isPausedRef.current = false;
             // scrollAmount will be synced in the loop else branch
           }, 2000);
        }
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('scroll', handleScroll);

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array - effect runs once!

  const projectsRaw = [
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
      description: "Machine learning analysis on Uber dataset to predict if a ride is profitable.",
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

  // Duplicate projects 4 times to ensure seamless infinite scroll
  const projects = [...projectsRaw, ...projectsRaw, ...projectsRaw, ...projectsRaw];

  return (
    <div>
      <h1 className="projects-title" style={{ marginBottom: '2rem' }}>Projects</h1>
      <div 
        ref={scrollContainerRef}
        className="full-width-scroll hide-scrollbar"
        style={{ 
          display: 'flex',
          overflowX: 'auto',
          gap: '0',
          paddingBottom: '2rem', 
          paddingTop: '1rem',
          paddingLeft: '0',  // Override global padding
          paddingRight: '0', // Override global padding
          scrollBehavior: 'auto',
          cursor: 'grab'
        }}
      >
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="project-card"
            style={{ 
              minWidth: '350px',
              maxWidth: '350px',
              borderRight: '1px solid #eee',
              borderTop: '1px solid #eee',
              borderBottom: '1px solid #eee',
              borderLeft: index === 0 ? '1px solid #eee' : 'none',
              padding: '2rem', 
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              position: 'relative',
              zIndex: 1
            }}
          >
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem', fontWeight: '600' }}>{project.title}</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--muted)', flex: 1, lineHeight: '1.6' }}>
              {project.description}
            </p>
            <div style={{ marginTop: 'auto' }}>
                <a href={project.link} style={{ fontSize: '0.9rem', fontWeight: '500', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                View Project <span>→</span>
                </a>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .project-card:hover {
          transform: scale(1.02) translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          z-index: 10 !important;
          border-color: transparent !important;
          border-radius: 12px;
        }
        
        @media (max-width: 768px) {
          .projects-title {
            font-size: 2rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .project-card {
            min-width: 280px !important;
            max-width: 280px !important;
            padding: 1.5rem !important;
          }
          
          .project-card h3 {
            font-size: 1.1rem !important;
          }
          
          .project-card p {
            font-size: 0.9rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .projects-title {
            font-size: 1.75rem !important;
          }
          
          .project-card {
            min-width: 260px !important;
            max-width: 260px !important;
          }
        }
      `}</style>
    </div>
  );
}
