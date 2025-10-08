import type { Post, PostsResponse, PostResponse } from '../types/Posts';

interface PostsQueryParams {
  page?: number;
  limit?: number;
}

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(
  options: PostsQueryParams = {}
): Promise<PostsResponse> {
  try {
    const { page = 1, limit = 20 } = options;
    const queryParams = new URLSearchParams({
      _page: page.toString(),
      _limit: limit.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/posts?${queryParams}`);
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

export async function fetchPostsCount(): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Не удалось получить количество сообщений.');
    }
    const data = await response.json();
    return data.length;
  } catch (error) {
    console.error('Ошибка при получении количества сообщений:', error);
    return 100;
  }
}

export async function fetchPost(postId: number): Promise<PostResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);

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
