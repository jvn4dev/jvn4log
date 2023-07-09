import { GetStaticProps, NextPage } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Post } from '@/components/Post';
import { handleNotionErrors } from '@/lib/errorHandlers';
import { notionInstance } from '@/lib/notionInstance';
import { PostData } from '@/types/notion';

type PostProps = {
  post?: PostData;
};

const PostPage: NextPage<PostProps> = (props) => {
  const { post } = props;

  if (!post) {
    return null;
  }

  return <Post post={post} />;
};

export const getStaticPaths = async () => {
  const posts = await notionInstance.getAllPublished();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const { slug } = context.params as Params;

  try {
    const post = await notionInstance.getSinglePostBySlug(slug);

    return {
      props: {
        post,
      },
      revalidate: 60,
    };
  } catch (error) {
    handleNotionErrors(error);

    // Return empty props when an error occurs
    return {
      props: {},
    };
  }
};

export default PostPage;
