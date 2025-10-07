import { fetchPosts } from '@/api/posts';
import Container from '@/components/Container';
import type { Post } from '@/types/Posts';
import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  loader: async () => {
    const result = await fetchPosts();
    if (!result.ok) throw new Error(result.error);
    return result.data;
  },
  component: PostsIndexPage,
  pendingComponent: () => (
    <div className="flex justify-center items-center h-screen text-2xl text-[#61dafb]">
      Загрузка...
    </div>
  ),
  errorComponent: ({ error }) => (
    <section className="flex justify-center items-center h-screen py-10 px-5 bg-[#282c34] text-white text-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-red-400">
          Ошибка загрузки постов
        </h1>
        <p className="text-lg text-gray-300">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#61dafb] text-black px-6 py-2 rounded hover:bg-blue-400 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    </section>
  ),
});

function PostsIndexPage() {
  const allPosts: Post[] = useLoaderData({ from: '/posts/' });
  const posts = allPosts.slice(0, 20);

  return (
    <section className="py-10 px-5 bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <Container>
        <h1 className="text-4xl font-bold mb-4 text-center text-[#61dafb]">
          Посты
        </h1>
        <ul className="flex flex-col gap-3">
          {posts.map(post => (
            <li
              className="rounded-md p-4 hover:bg-gray-700 hover:text-[#61dafb] hover:underline transform transition-all ease-in-out duration-300"
              key={post.id}
            >
              <Link to="/posts/$postId" params={{ postId: post.id.toString() }}>
                <h2>{`${post.id}. ${post.title}`}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
