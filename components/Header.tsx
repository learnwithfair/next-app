export default function Header() {
  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <a href="/" className="text-blue-500 hover:underline">
            Postify
          </a>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/posts" className="text-blue-500 hover:underline">
                All Posts
              </a>
            </li>
            <li>
              <a
                href="/posts/create-post"
                className="text-blue-500 hover:underline"
              >
                Create Post
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
