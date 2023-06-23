import { NextPage } from 'next';
import { BlogMain } from '@/components/BlogMain';
import Notion from '@/lib/notion';
import { NotionData } from '@/types/notion';

type HomeProps = {
  notionData: NotionData[];
};

const Home: NextPage<HomeProps> = (props) => {
  const { notionData } = props;

  return <BlogMain notionData={notionData} />;
};

export const getStaticProps = async () => {
  const notionInstance = new Notion();
  const response = await notionInstance.getAllPublished();

  return {
    props: {
      notionData: response,
    },
    revalidate: 60, // 1분마다 정적페이지 재생성
  };
};

export default Home;
