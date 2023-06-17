import { Client } from '@notionhq/client';
import { NextPage } from 'next';

type HomeProps = {
  notionData: any;
};

const Home: NextPage<HomeProps> = (props) => {
  console.log(props);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export const getStaticProps = async () => {
  const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? '';
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return {
    props: {
      notionData: response,
    },
  };
};

export default Home;
