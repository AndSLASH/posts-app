import { fetchPosts, fetchPostsCount } from '@/api/posts';
import Container from '@/components/Container';
import Pagination from '@/components/Pagination';
import type { Post } from '@/types/Posts';
import {
  createFileRoute,
  Link,
  useLoaderData,
  useSearch,
} from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  validateSearch: (searchParams: Record<string, unknown>) => {
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 20;
    return {
      page,
      limit,
      from: (page - 1) * limit + 1,
      to: page * limit,
    };
  },
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
  }),
  loader: async ({ deps }) => {
    const [postsResult, totalCount] = await Promise.all([
      fetchPosts({ page: deps.page, limit: deps.limit }),
      fetchPostsCount(),
    ]);

    return {
      ...postsResult,
      total: totalCount,
    };
  },
  component: PostsIndexPage,
  pendingComponent: () => (
    <div className="flex justify-center items-center h-screen text-2xl text-[#61dafb]">
      Загрузка...
    </div>
  ),
});

function PostsIndexPage() {
  const result = useLoaderData({ from: '/posts/' });
  const search = useSearch({ from: '/posts/' });

  if (!result.ok) {
    return (
      <section className="flex justify-center items-center h-screen py-10 px-5 bg-[#282c34] text-white text-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-red-400">
            Ошибка загрузки постов
          </h1>
          <p className="text-lg text-gray-300">{result.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#61dafb] text-black px-6 py-2 rounded hover:bg-blue-400 transform transition-bg ease-in-out duration-300"
          >
            Попробовать снова
          </button>
        </div>
      </section>
    );
  }

  const totalPages = Math.ceil((result.total || 100) / search.limit);
  const posts: Post[] = result.data || [];

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
              <Link
                to="/posts/$postId"
                params={{ postId: post.id.toString() }}
                preload="intent"
              >
                <h2>{`${post.id}. ${post.title}`}</h2>
              </Link>
            </li>
          ))}
        </ul>

        <Pagination
          currentPage={search.page}
          totalPages={totalPages}
          basePath="/posts"
          searchParams={{ limit: search.limit }}
        />
      </Container>
    </section>
  );
}
