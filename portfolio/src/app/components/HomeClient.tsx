'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EmailPopup from './EmailPopup';

const EXPERIENCES: Array<
  | { kind: 'affiliation'; href: string; logo: string; label: string; date: string }
  | { kind: 'plain'; label: string; date: string }
> = [
  { kind: 'plain', label: 'incoming eng @ startup', date: 'summer 2026' },
  { kind: 'affiliation', href: 'https://www.google.com', logo: '/google.png', label: 'eng @ google', date: 'spring 2026' },
  { kind: 'affiliation', href: 'https://marci.eecs.utk.edu/index.html', logo: '/marci.png', label: 'eng @ marci lab', date: 'fall 2026' },
  { kind: 'affiliation', href: 'https://www.asknexus.ai/', logo: '/nexus.png', label: 'eng @ nexus', date: 'spring 2025/summer 2025' },
];

const SPOTIFY_PROFILE =
  'https://open.spotify.com/user/6z3faxr3uj7zcwdr2idhbsxmy?si=e1d22e4bbd0e439a';

const projects = [
  { title: "valorant tracker tui", link: "https://github.com/alexchen1337/valorant-tracker-tui" },
  { title: "speakwell", link: "https://github.com/alexchen1337/SpeakWell" },
  { title: "ai summary footer", link: "https://www.npmjs.com/package/ai-summary-footer" },
  { title: "smart ride", link: "https://github.com/ericcht/Smart-Ride" },
  { title: "socket chat server", link: "https://github.com/alexchen1337/multithreaded-socket-chat-server" },
];

export default function HomeClient() {
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  return (
    <div className="home-page" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* header: name + socials | avatar */}
      <div className="stagger-1 home-page__top">
        <div className="home-page__top-left">
        <span className="home-page__name">alex chen</span>

        <button
          onClick={() => setShowEmailPopup(true)}
          style={{ display: 'flex', opacity: 0.6, transition: 'opacity 0.2s', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </button>
        <a href="https://www.linkedin.com/in/alexch7/" target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', opacity: 0.6, transition: 'opacity 0.2s', color: 'var(--muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        </a>
        <a href="https://github.com/alexchen1337" target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', opacity: 0.6, transition: 'opacity 0.2s', color: 'var(--muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        </div>

        <a
          href={SPOTIFY_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="home-page__avatar-link"
          aria-label="Alex on Spotify"
        >
          <Image
            src="/profile.jpg"
            alt=""
            width={48}
            height={48}
            className="home-page__avatar"
            priority
          />
        </a>
      </div>

      {/* exp */}
      <div className="stagger-2 home-section home-section--stack">
        <span className="section-label home-section__label-pad">// exp</span>
        {EXPERIENCES.map((exp, i) =>
          exp.kind === 'affiliation' ? (
            <a
              key={i}
              href={exp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="home-experience-row home-experience-row--link"
            >
              <span className="home-experience-row__left">
                <span className="home-experience-row__affiliation">
                  <span className="affiliation-link__label">{exp.label}</span>
                  <span className="affiliation-logo-wrap" aria-hidden>
                    <img src={exp.logo} alt="" className="affiliation-logo" />
                  </span>
                </span>
              </span>
              <span className="list-meta home-experience-row__date">{exp.date}</span>
            </a>
          ) : (
            <div key={i} className="home-experience-row">
              <span className="home-experience-row__left">
                <span className="home-experience-row__plain">{exp.label}</span>
              </span>
              <span className="list-meta home-experience-row__date">{exp.date}</span>
            </div>
          )
        )}
      </div>

      {/* proj */}
      <div className="stagger-3 home-section home-section--stack">
        <span className="section-label home-section__label-pad">// proj</span>
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-row"
          >
            {project.title}
          </a>
        ))}
      </div>

      {/* yapping */}
      <div className="stagger-4 home-section home-section--stack">
        <span className="section-label home-section__label-pad">// yapping</span>
        <div className="home-section__under-label valorant-home-inner">
          <span>me rambling</span>
          <span className="valorant-home-sep" aria-hidden>|</span>
          <Link href="/writings" className="pill-link pill-link--underline">
            {'read here ->'}
          </Link>
        </div>
      </div>

      {/* valorant */}
      <div className="stagger-5 home-section home-section--stack">
        <span className="section-label home-section__label-pad">// valorant</span>
        <div className="home-section__under-label valorant-home-inner">
          <span>3x radiant, used to compete</span>
          <span className="valorant-home-sep" aria-hidden>|</span>
          <a
            href="https://www.youtube.com/@ChiuceVAL/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link pill-link--underline"
          >
            {'watch clips ->'}
          </a>
        </div>
      </div>

      <EmailPopup show={showEmailPopup} onClose={() => setShowEmailPopup(false)} />
    </div>
  );
}
