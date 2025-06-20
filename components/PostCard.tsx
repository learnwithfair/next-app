type PostCardProps = {
    id: number;
    title: string;
    excerpt?: string;
  };
  
  export default function PostCard({ id, title, excerpt }: PostCardProps) {
    return (
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
        <h2 className="text-lg font-semibold">{title}</h2>
        {excerpt && <p className="mt-2 text-gray-600">{excerpt}</p>}
        <a href={`/posts/${id}`} className="text-blue-500 hover:underline mt-2 block">
          Read more
        </a>
      </div>
    );
  }
  