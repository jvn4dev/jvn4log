import { NextPage } from 'next';
import { Fragment } from 'react';
import Notion from '@/lib/notion';
import { NotionData } from '@/types/notion';

type HomeProps = {
  notionData: NotionData[];
};

const Home: NextPage<HomeProps> = (props) => {
  const { notionData } = props;

  return (
    <div>
      <h1>정성준 블로그</h1>
      <ul>
        {notionData.map((data) => (
          <Fragment key={data.id}>
            <li>
              <h2>{data.title}</h2>
              <div>
                {data.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p>{data.description}</p>
              <label>{data.date}</label>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const notionInstance = new Notion();
  const response = await notionInstance.getAllPublished();

  return {
    props: {
      notionData: response,
    },
    revalidate: 60 * 5, // 5분마다 재생성
  };
};

export default Home;
