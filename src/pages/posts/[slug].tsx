import { GetStaticProps, NextPage } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Post } from '@/components/Post';
import { handleNotionErrors } from '@/lib/errorHandlers';
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
  return {};
};

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  try {
    return {
      props: {},
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
