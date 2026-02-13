import { notFound } from 'next/navigation';
import { posts } from '../data/posts';
import Link from 'next/link';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="blog-container">
      <article>
        <header className="blog-header">
          <Link href="/" className="back-link">
            &larr; Back to all posts
          </Link>
          <h1 className="blog-title">
            {post.title}
          </h1>
          <div className="blog-meta">
             <time dateTime={post.date}>{post.date}</time>
             <span className="mx-2">&middot;</span>
             <span>Anmol Thukral</span>
          </div>
        </header>
        
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: `Engineer Playbook | ${post.title}`,
  };
}
