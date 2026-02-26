'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('chen.alex603@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '60vh', justifyContent: 'center' }}>
      <section style={{ 
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4rem',
        flexWrap: 'wrap-reverse'
      }} className="hero-section">
        
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <h1 className="stagger-2" style={{ 
            fontSize: '2.5rem', 
            lineHeight: '1.1', 
            marginBottom: '0', 
            letterSpacing: '-0.02em',
            background: 'linear-gradient(to right, #111, #555)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Hi, I'm Alex
          </h1>
          <p className="stagger-3" style={{ fontSize: '1.05rem', color: '#666', lineHeight: '1.6', marginBottom: '0', maxWidth: '540px' }}>
            B.S. in Computer Science @ UTK
          </p>
          <p className="stagger-4" style={{ fontSize: '1.05rem', color: '#666', lineHeight: '1.6', marginBottom: '0', maxWidth: '540px' }}>
            Reach out if you want to chat!
          </p>
          
          <div className="stagger-5 button-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => setShowEmailPopup(true)}
                style={{ 
                  display: 'flex', 
                  opacity: 0.6, 
                  transition: 'all 0.2s',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }} 
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-2px)'; }} 
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
              
              <a 
                href="https://www.linkedin.com/in/alexch7/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ display: 'flex', opacity: 0.6, transition: 'all 0.2s' }} 
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-2px)'; }} 
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
              
              <a 
                href="https://github.com/alexchen1337" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ display: 'flex', opacity: 0.6, transition: 'all 0.2s' }} 
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-2px)'; }} 
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
            </div>
            
            <a
              href="https://cal.com/alex-chen/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
              style={{
                display: 'inline-block',
                position: 'relative',
                overflow: 'hidden',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: '#666',
                border: '1px solid #666',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 1,
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#111';
                e.currentTarget.style.color = '#fff';
                const pseudo = e.currentTarget.querySelector('.hover-bg') as HTMLElement;
                if(pseudo) pseudo.style.transform = 'translateY(0)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#666';
                e.currentTarget.style.color = '#666';
                const pseudo = e.currentTarget.querySelector('.hover-bg') as HTMLElement;
                if(pseudo) pseudo.style.transform = 'translateY(100%)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>Schedule a Chat</span>
              <div className="hover-bg" style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: '#111',
                transform: 'translateY(100%)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: 0
              }}></div>
            </a>
          </div>
        </div>
        
        <div style={{ 
          position: 'relative',
          width: '280px',
          height: '280px',
          flexShrink: 0,
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          transform: 'rotate(3deg)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          margin: '0 auto'
        }} className="profile-image stagger-5">
          <Image 
            src="/profile.jpg" 
            alt="Alex Chen" 
            fill
            style={{ objectFit: 'cover' }} 
            priority
          />
        </div>
      </section>

      {/* Email Popup */}
      {showEmailPopup && (
        <div 
          onClick={() => setShowEmailPopup(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '1rem'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(0,0,0,0.05)',
              maxWidth: '450px',
              width: '100%',
              animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Email</h3>
            <div style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              alignItems: 'center',
              marginBottom: '1.5rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={copyToClipboard}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: copied ? '#22c55e' : '#111',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  flexShrink: 0
                }}
              >
                {copied ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
              <p style={{ fontSize: '1rem', margin: 0, color: '#111' }}>
                chen.alex603@gmail.com
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => setShowEmailPopup(false)}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: '#111',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .profile-image:hover {
          transform: rotate(0deg) scale(1.02) !important;
          box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column-reverse !important;
            gap: 2rem !important;
            text-align: center;
            justify-content: center;
          }
          
          .hero-section h1 {
            font-size: 2.2rem !important;
          }
          
          .hero-section p {
            margin: 0 auto;
            font-size: 1rem !important;
          }
          
          .profile-image {
            width: 200px !important;
            height: 200px !important;
          }
          
          .hero-section > div:first-child {
            min-width: auto !important;
            align-items: center !important;
          }
          
          .button-container {
            justify-content: center !important;
            align-items: center !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-section h1 {
            font-size: 1.8rem !important;
          }
          
          .modal-content {
            padding: 1.5rem !important;
          }
          
          .resume-button {
            padding: 0.85rem 1.75rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
