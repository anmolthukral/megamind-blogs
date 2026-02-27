import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '../../lib/markdown';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (e) {
    notFound();
  }

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
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (e) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: `Engineer Playbook | ${post.title}`,
  };
}
