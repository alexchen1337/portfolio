'use client';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      {children}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
