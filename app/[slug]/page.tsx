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
    <div className="min-h-screen bg-white pt-20 pb-12">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 mb-6">
            &larr; Back to all posts
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-gray-500">
             <time dateTime={post.date}>{post.date}</time>
             <span className="mx-2">&middot;</span>
             <span>Anmol Thukral</span>
          </div>
        </header>
        
        <div 
          className="prose prose-lg prose-indigo mx-auto [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>code]:bg-gray-100 [&>code]:text-indigo-600 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>pre>code]:bg-transparent [&>pre>code]:text-inherit [&>pre>code]:p-0"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}
