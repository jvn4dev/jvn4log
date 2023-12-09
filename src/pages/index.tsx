import styled from 'styled-components';
import { Divider } from '@/components/Divider';
import { PostCard } from '@/components/PostCard';
import { NOTION_API_KEY, NOTION_DATABASE_ID } from '@/config';
import { theme } from '@/themes';
import { NotionPageData } from '@/types/notion';

type HomeProps = { pageDataList: NotionPageData[] };

const Home = ({ pageDataList }: HomeProps) => {
  console.log(pageDataList[0].properties);
  return (
    <Container>
      <Wrapper>
        <Header>
          <H1>Dev. articles</H1>
          <Divider />
        </Header>
        <Ul>
          {pageDataList.map((page) => (
            <PostCard
              key={page.id}
              postCard={{
                title: page.properties.Name.title[0].plain_text,
                slug: page.properties.Slug.rich_text[0].plain_text,
                tags: page.properties.Tags.multi_select.map((tag) => tag.name),
                description:
                  page.properties.Description.rich_text[0].plain_text,
                date: page.properties.Date.created_time,
              }}
            />
          ))}
        </Ul>
      </Wrapper>
    </Container>
  );
};

export const getStaticProps = async () => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      Authorization: `${NOTION_API_KEY}`,
    },
    body: JSON.stringify({ page_size: 100 }),
  };

  const result = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    options,
  );
  const pageData = await result.json();

  return {
    props: {
      pageDataList: pageData.results,
    },
  };
};

const Container = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1140px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  width: 100%;
  padding-left: 70px;
  margin-bottom: 40px;

  @media ${theme.device.tablet} {
    padding-left: 0;
  }
`;

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  color: ${theme.colors.textDark};
`;

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media ${theme.device.laptop} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default Home;
