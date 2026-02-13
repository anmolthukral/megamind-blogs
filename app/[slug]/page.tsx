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
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-sky-400 hover:text-sky-300 mb-8 font-medium transition-colors">
            &larr; Back to all posts
          </Link>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-6 font-[family-name:var(--font-heading)]">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-slate-400">
             <time dateTime={post.date}>{post.date}</time>
             <span className="mx-2">&middot;</span>
             <span>Anmol Thukral</span>
          </div>
        </header>
        
        <div 
          className="prose prose-lg prose-invert prose-sky mx-auto
            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-white 
            [&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-slate-300
            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul]:text-slate-300 [&>ul>li]:mb-2 
            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>ol]:text-slate-300
            [&>pre]:bg-slate-950 [&>pre]:border [&>pre]:border-slate-800 [&>pre]:text-slate-50 
            [&>pre]:p-6 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-8 
            [&>code]:bg-slate-800 [&>code]:text-sky-300 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded 
            [&>pre>code]:bg-transparent [&>pre>code]:text-inherit [&>pre>code]:p-0"
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
