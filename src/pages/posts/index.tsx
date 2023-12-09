import styled from 'styled-components';
import { Divider } from '@/components/Divider';
import { PostCard } from '@/components/PostCard';
import useFormattedDate from '@/lib/hooks/useFormattedDate';
import { getBlogs } from '@/lib/notion';
import { theme } from '@/themes';
import { NotionPageData } from '@/types/notion';

type HomeProps = { blogs: NotionPageData[] };

const Home = ({ blogs }: HomeProps) => {
  return (
    <Container>
      <Wrapper>
        <Header>
          <H1>Dev. articles</H1>
          <Divider />
        </Header>
        <Ul>
          {blogs.map((blog) => (
            <PostCard
              key={blog.id}
              postCard={{
                title: blog.properties.Name.title[0].plain_text,
                slug: blog.properties.Slug.rich_text[0].plain_text,
                tags: blog.properties.Tags.multi_select.map((tag) => tag.name),
                description:
                  blog.properties.Description.rich_text[0].plain_text,
                date: blog.last_edited_time,
              }}
            />
          ))}
        </Ul>
      </Wrapper>
    </Container>
  );
};

export const getStaticProps = async () => {
  const blogs = await getBlogs();

  return {
    props: {
      blogs,
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
