'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold text-foreground mb-4">
        404
      </h1>
      
      <p className="text-xl text-muted-foreground mb-10 max-w-[600px] mx-auto leading-relaxed">
        Engineer Playbook doesn't have this yet, or you are lost, but you can request a feature by reaching out to maintainers directly.
      </p>

      <Link 
        href="/" 
        className="px-8 py-3 rounded-full bg-[var(--accent-color)] text-white hover:bg-blue-600 transition-all font-medium"
      >
        Go to Playbook Profile
      </Link>
    </div>
  );
}
