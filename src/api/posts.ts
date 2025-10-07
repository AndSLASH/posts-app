import type { Post, PostsResponse, PostResponse } from '../types/Posts';

export async function fetchPosts(): Promise<PostsResponse> {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      return {
        ok: false,
        error: `Ошибка ${response.status}: ${response.statusText}`,
      };
    }
    const data: Post[] = await response.json();
    return { ok: true, data };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    return { ok: false, error: `Ошибка загрузки постов: ${message}` };
  }
}

export async function fetchPost(postId: number): Promise<PostResponse> {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    if (response.status === 404) {
      return { ok: false, error: 'Пост не найден' };
    }

    if (!response.ok) {
      return {
        ok: false,
        error: `Ошибка ${response.status}: ${response.statusText}`,
      };
    }

    const data: Post = await response.json();
    return { ok: true, data };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    return { ok: false, error: `Ошибка загрузки поста: ${message}` };
  }
}
