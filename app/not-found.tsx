'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 
          className="text-[clamp(6rem,15vw,10rem)] font-extrabold leading-none tracking-tighter mb-4"
          style={{
            background: 'linear-gradient(135deg, var(--accent-color) 0%, #2a52be 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 30px rgba(0, 85, 255, 0.2)',
          }}
        >
          404
        </h1>
        
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-foreground mb-4">
          Oops! Looks like you're lost.
        </h2>
        
        <p className="text-lg text-muted-foreground mb-10 max-w-[500px] mx-auto leading-relaxed">
          The article or page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--accent-color)] text-white hover:bg-blue-600 transition-all shadow-[0_4px_15px_rgba(0,85,255,0.3)] hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-border text-foreground hover:-translate-y-1 hover:border-foreground transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Go Back
          </button>
        </div>
        
        <div className="mt-16 opacity-50 flex flex-col items-center">
          <svg className="w-12 h-12 text-muted-foreground animate-pulse mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <p className="font-mono text-sm text-muted-foreground">ERR_POST_NOT_FOUND</p>
        </div>
      </div>
    </div>
  );
}
