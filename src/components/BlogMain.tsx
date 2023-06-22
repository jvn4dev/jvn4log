import styled from 'styled-components';
import { Divider } from '@/components/Divider';
import { PostCardWrapper } from '@/components/PostCardWrapper';
import withLoading from '@/hoc/withLoading';
import { theme } from '@/themes';
import { NotionData } from '@/types/notion';

type BlogMainProps = {
  notionData: NotionData[];
};

const BlogMain = (props: BlogMainProps) => {
  const { notionData } = props;

  return (
    <Container>
      <Wrapper>
        <Header>
          <H1>Dev. articles</H1>
          <Divider />
        </Header>
        <PostCardWrapper notionData={notionData} />
      </Wrapper>
    </Container>
  );
};

export default withLoading(BlogMain);

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
