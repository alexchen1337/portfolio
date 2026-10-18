'use client';

import { useEffect, useRef, useState } from 'react';

const EMAIL = 'chen.alex603@gmail.com';

type Props = { show: boolean; onClose: () => void };

export default function EmailPopup({ show, onClose }: Props) {
  return show ? <EmailDialog onClose={onClose} /> : null;
}

function EmailDialog({ onClose }: Pick<Props, 'onClose'>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mountedRef = useRef(false);
  const [status, setStatus] = useState<'idle' | 'folding' | 'copied' | 'error'>('idle');
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      mountedRef.current = false;
      clearTimeout(timerRef.current);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      dialogRef.current?.close();
      onClose();
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200);
    return () => clearTimeout(timer);
  }, [closing, onClose]);

  const copy = async () => {
    clearTimeout(timerRef.current);
    setStatus('folding');
    try {
      await navigator.clipboard.writeText(EMAIL);
      if (!mountedRef.current) return;
      timerRef.current = setTimeout(() => {
        setStatus('copied');
        timerRef.current = setTimeout(() => setStatus('idle'), 2200);
      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 360);
    } catch {
      if (mountedRef.current) setStatus('error');
    }
  };

  return (
    <dialog ref={dialogRef} className={`email-popup${closing ? ' email-popup--closing' : ''}`}
      aria-label="Email Alex" onCancel={(event) => { event.preventDefault(); setClosing(true); }}
      onClick={(event) => { if (event.target === event.currentTarget) setClosing(true); }}>
      <div className="email-popup__card">
        <button type="button" className="email-close" aria-label="Close email dialog" onClick={() => setClosing(true)}>×</button>
        <p className="email-address">{EMAIL}</p>
        <div className="email-actions">
          <button type="button" className="email-action" onClick={copy} disabled={status === 'folding'} data-status={status}>
            <span className="email-copy-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {status === 'copied' ? <path className="email-check" d="m4 12 5 5L20 6" /> : <>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path className="email-flap" d="m3 6 9 7 9-7" />
                </>}
              </svg>
            </span>
            <span>{status === 'copied' ? 'copied!' : status === 'folding' ? 'folding…' : 'copy email'}</span>
          </button>
          <a className="email-action" href={`mailto:${EMAIL}`}>
            <span aria-hidden="true" className="email-mail-arrow">↗</span>
            open mail
          </a>
        </div>
        <p className="email-feedback" role="status">{status === 'error' ? 'Copy unavailable. Select the address above to copy it.' : status === 'copied' ? 'Ready when you are.' : '\u00a0'}</p>
      </div>
    </dialog>
  );
}
