import Link from 'next/link';
import { posts } from './data/posts';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-[family-name:var(--font-heading)]">
            Engineering Blog
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
            Deep dives into React, Frontend Performance, and Modern Web Development.
          </p>
        </div>

        <div className="mt-16 grid gap-8 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {posts.map((post) => (
            <div key={post.slug} className="flex flex-col rounded-xl shadow-lg run overflow-hidden bg-slate-800 border border-slate-700 hover:border-sky-400 transition-all duration-300 hover:-translate-y-1">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-sky-400">
                    Article
                  </p>
                  <Link href={`/${post.slug}`} className="block mt-2 group">
                    <p className="text-xl font-semibold text-white group-hover:text-sky-400 transition-colors">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-slate-400 line-clamp-3">
                      {post.description}
                    </p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center border-t border-slate-700 pt-4">
                  <div className="flex-shrink-0">
                    <span className="sr-only">Anmol Thukral</span>
                    <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-sky-400 font-bold border border-slate-600">
                      AT
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      Anmol Thukral
                    </p>
                    <div className="flex space-x-1 text-sm text-slate-500">
                      <time dateTime={post.date}>
                        {post.date}
                      </time>
                      <span aria-hidden="true">&middot;</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
