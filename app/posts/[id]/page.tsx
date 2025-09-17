
import Header from '@/components/Header';
import { prisma } from '@/lib/prisma';


type Props = {
  params: { id: string };
};

export default async function PostPage({ params }: Props) {
  const postId = parseInt(params.id);
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) return <p className="p-4">Post not found</p>;

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="max-w-full rounded my-4"
            width={400}
            height={200}
          />
        )}
        <p className="whitespace-pre-line">{post.content}</p>
      </main>
    </>
  );
}
