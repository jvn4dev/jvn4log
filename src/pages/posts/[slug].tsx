import { GetStaticProps, NextPage } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Post } from '@/components/Post';
import Notion from '@/lib/notion';
import { PostData } from '@/types/notion';

type PostProps = {
  post: PostData;
};

const PostPage: NextPage<PostProps> = (props) => {
  const { post } = props;

  return <Post post={post} />;
};

export const getStaticPaths = async () => {
  const notionInstance = new Notion();
  const posts = await notionInstance.getAllPublished();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const { slug } = context.params as Params;
  const notionInstance = new Notion();
  const post = await notionInstance.getSinglePostBySlug(slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default PostPage;
