import { fetchPost } from '@/api/posts';
import Container from '@/components/Container';
import type { Post } from '@/types/Posts';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function PostsPending() {
  const { t } = useTranslation('post');
  return (
    <div className="flex justify-center items-center h-screen text-2xl text-[#61dafb]">
      {t('loading')}
    </div>
  );
}

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const postId = parseInt(params.postId, 10);
    if (isNaN(postId)) return { ok: false, error: 'Неверный ID поста' };
    const result = await fetchPost(postId);
    return result;
  },
  component: PostPage,
  pendingComponent: PostsPending,
});

function PostPage() {
  const result = useLoaderData({ from: '/posts/$postId' });
  const { t } = useTranslation('post');

  if (!result.ok) {
    return (
      <section className="flex justify-center items-center h-screen py-10 px-5 bg-[#282c34] text-white text-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-red-400">
            {t('error_loading_post')}
          </h1>
          <p className="text-lg text-gray-300">{result.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#61dafb] text-black px-6 py-2 rounded hover:bg-blue-400 transition-colors"
          >
            {t('try_again')}
          </button>
        </div>
      </section>
    );
  }

  const post: Post = result.data!;

  return (
    <section className="py-10 px-5 bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <Container>
        <h1 className="text-4xl font-bold mb-4 text-center text-[#61dafb]">
          {`${t('title')} ${post.id}`}
        </h1>
        <p className="text-2xl">{post.body}</p>
        <button
          className="flex items-center justify-center h-[50px] w-[250px] bg-[#61dafb] text-black rounded-md hover:bg-blue-400 transition-colors ease-in-out duration-300 mt-10"
          onClick={() => window.history.back()}
        >
          <ArrowLeftIcon className="w-4 h-4 inline-block mr-2" />
          {t('back')}
        </button>
      </Container>
    </section>
  );
}
