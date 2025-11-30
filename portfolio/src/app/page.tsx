'use client';

import Image from "next/image";
import { useState } from "react";
import PageTransition from "./components/PageTransition";

export default function Home() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleResumeRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email has already requested (rate limiting)
    const requestedEmails = JSON.parse(localStorage.getItem('resumeRequests') || '[]');
    if (requestedEmails.includes(email)) {
      setSubmitStatus('error');
      alert('You have already requested the resume with this email.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Using Web3Forms - replace YOUR_ACCESS_KEY with your actual key from https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '96ac960c-165e-44c1-bbbe-28b8134b5431',
          subject: 'Resume Request',
          from_name: 'Portfolio Resume Request',
          email: email,
          message: `Resume request from: ${email}`
        })
      });

      if (response.ok) {
        // Store email in localStorage to prevent duplicate requests
        requestedEmails.push(email);
        localStorage.setItem('resumeRequests', JSON.stringify(requestedEmails));
        
        setSubmitStatus('success');
        setTimeout(() => {
          setShowResumeModal(false);
          setEmail('');
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageTransition>
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
              <h1 className="animate-item stagger-1" style={{ fontSize: '2.3rem', lineHeight: '1.1', marginBottom: '0', letterSpacing: '-0.02em' }}>
                Hi, I'm Alex
              </h1>
              <p className="animate-item stagger-2" style={{ fontSize: '1.05rem', color: '#666', lineHeight: '1.6', marginBottom: '0', maxWidth: '540px' }}>
                Junior @ UT Knoxville studying Computer Science
              </p>
              <p className="animate-item stagger-3" style={{ fontSize: '1.05rem', color: '#666', lineHeight: '1.6', marginBottom: '0', maxWidth: '540px' }}>
                Connect with me or request my resume
              </p>
              
              <div className="button-container animate-item stagger-4" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="resume-button"
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  Request Resume
                </button>
              </div>
            </div>
            
            <div className="profile-image animate-scale stagger-2" style={{ 
              position: 'relative',
              width: '280px',
              height: '280px',
              flexShrink: 0,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transform: 'rotate(3deg)',
              transition: 'transform 0.3s ease',
              margin: '0 auto'
            }}>
              <Image 
                src="/profile.jpg" 
                alt="Alex Chen" 
                fill
                style={{ objectFit: 'cover' }} 
                priority
              />
            </div>
          </section>

          <style jsx>{`
            .profile-image:hover {
              transform: rotate(0deg) scale(1.02) !important;
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
                font-size: 2rem !important;
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
              }
              
              .button-container {
                justify-content: center !important;
              }
            }
            
            @media (max-width: 480px) {
              .hero-section h1 {
                font-size: 1.75rem !important;
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
      </PageTransition>

      {showResumeModal && (
        <div 
          onClick={() => setShowResumeModal(false)}
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
              padding: '2.5rem',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '450px',
              width: '100%',
              animation: 'modalSlideUp 0.3s ease-out'
            }}
          >
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '600' }}>
              Request Resume
            </h2>
            <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.95rem' }}>
              Enter your email and I'll send you my resume.
            </p>

            {submitStatus === 'success' ? (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: '#f0fdf4', 
                border: '1px solid #86efac',
                borderRadius: '8px',
                color: '#166534',
                textAlign: 'center'
              }}>
                ✓ Request sent! Check your email soon.
              </div>
            ) : (
              <form onSubmit={handleResumeRequest}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#111'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />

                {submitStatus === 'error' && (
                  <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowResumeModal(false)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      backgroundColor: '#f5f5f5',
                      color: '#666',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      backgroundColor: isSubmitting ? '#999' : '#111',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
