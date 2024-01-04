'use client';

import { Post } from '@/components/Post';
import { PostData } from '@/types/notion';

export default async function PostMain({ post }: { post: PostData }) {
  return <Post post={post} />;
}
