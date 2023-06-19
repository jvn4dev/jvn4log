'use client';

import { NextPage } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { Post } from '@/components/Post';
import Notion from '@/lib/notion';
import { PostData } from '@/types/notion';

type PostProps = {
  post: PostData;
};

export const revalidate = 60;

const PostPage: NextPage<PostProps> = async () => {
  const params = useParams();
  console.log(params);
  const { slug } = params as Params;
  const notionInstance = new Notion();
  const post = await notionInstance.getSinglePostBySlug(slug);

  return <Post post={post} />;
};

export async function generateStaticParams() {
  const notionInstance = new Notion();
  const posts = await notionInstance.getAllPublished();
  return posts.map(({ slug }) => ({ params: { slug } }));
}

export default PostPage;
