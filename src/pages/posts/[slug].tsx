import { GetStaticProps } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Post } from '@/components/Post';
import { getBlogs, getSinglePostBySlug } from '@/lib/notion';
import { PostData } from '@/types/notion';

type PostProps = {
  post?: PostData;
};

const PostPage = ({ post }: PostProps) => {
  if (!post) return null;

  return <Post post={post} />;
};

export async function getStaticPaths() {
  const blogs = await getBlogs();
  return {
    paths: blogs.map((blog) => ({
      params: {
        slug: blog.properties.Slug.rich_text[0].plain_text,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const { slug } = context.params as Params;
  const post = await getSinglePostBySlug(slug);

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
