export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface LoaderResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export type PostsResponse = LoaderResult<Post[]>;
export type PostResponse = LoaderResult<Post>;
