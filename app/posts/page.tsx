
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { prisma } from '@/lib/prisma';
import { Post } from '../generated/prisma';

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post:Post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.content?.slice(0, 80) + '...'}
            />
          ))}
        </div>
      </main>
    </>
  );
}
