import { GetStaticProps, NextPage } from 'next';
import { getBlogs } from '@/lib/notion';
import { PostData } from '@/types/notion';

type PostProps = {
  post?: PostData;
};

const PostPage: NextPage<PostProps> = (props) => {
  console.log(props);
  return <h1>Post</h1>;
};

export async function getStaticPaths() {
  const blogs = await getBlogs();
  return {
    paths: blogs.map((el) => ({
      params: {
        id: el.id,
      },
    })),
  };
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  return {
    props: {},
  };
};

export default PostPage;
