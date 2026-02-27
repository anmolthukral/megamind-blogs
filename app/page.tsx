import Link from 'next/link';
import { getPosts } from './data/posts';

export default async function Home() {
  const posts = await getPosts();
  return (
    <div style={{ minHeight: '100vh', padding: 'var(--space-20) 0' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: 'var(--space-18)' }}>
          <h1>Engineering Blog</h1>
          <p className="text-light text-xl">
            Deep dives into React, Frontend Performance, and Modern Web Development.
          </p>
        </div>

        <div className="row">
          {posts.map((post) => (
            <div key={post.slug} className="col-4">
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="badge secondary">Article</span>
                    <Link href={`/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }} className="block mt-2">
                       <h4 style={{ margin: 'var(--space-2) 0' }}>{post.title}</h4>
                      <p className="text-light text-sm lines-3">
                        {post.description}
                      </p>
                    </Link>
                  </div>
                  <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>
                    <div style={{ flexShrink: 0 }}>
                      <div style={{ height: '2.5rem', width: '2.5rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 'var(--text-8)' }}>
                        AT
                      </div>
                    </div>
                    <div style={{ marginLeft: 'var(--space-3)' }}>
                      <p style={{ margin: 0, fontWeight: 'var(--font-medium)', fontSize: 'var(--text-7)' }}>
                        Anmol Thukral
                      </p>
                      <div className="text-light text-xs">
                        <time dateTime={post.date}>
                          {post.date}
                        </time>
                        <span> &middot; 5 min read</span>
                      </div>
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
