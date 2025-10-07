import { fetchPost } from '@/api/posts';
import Container from '@/components/Container';
import type { Post } from '@/types/Posts';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const postId = parseInt(params.postId, 10);
    if (isNaN(postId)) throw new Error('Неверный ID поста');
    const result = await fetchPost(postId);
    if (!result.ok) throw new Error(result.error);
    return result.data;
  },
  component: PostPage,
  pendingComponent: () => (
    <div className="flex justify-center items-center h-screen text-2xl text-[#61dafb]">
      Загрузка...
    </div>
  ),
  errorComponent: ({ error }) => (
    <section className="flex justify-center items-center h-screen py-10 px-5 bg-[#282c34] text-white text-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-red-400">
          Ошибка загрузки поста
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

function PostPage() {
  const post: Post = useLoaderData({ from: '/posts/$postId' });
  return (
    <section className="py-10 px-5 bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <Container>
        <h1 className="text-4xl font-bold mb-4 text-center text-[#61dafb]">
          {`Пост ${post.id}`}
        </h1>
        <p className="text-2xl">{post.body}</p>
        <button
          className="flex items-center justify-center h-[50px] w-[250px] bg-[#61dafb] text-black rounded-md hover:bg-blue-400 transition-colors ease-in-out duration-300 mt-10"
          onClick={() => window.history.back()}
        >
          <ArrowLeftIcon className="w-4 h-4 inline-block mr-2" />
          Назад
        </button>
      </Container>
    </section>
  );
}
