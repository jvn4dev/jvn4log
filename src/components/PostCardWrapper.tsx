import styled from 'styled-components';
import { PostCard } from '@/components/PostCard';
import { theme } from '@/themes';
import { NotionDataType } from '@/types/notion';

type PostCardWrapperProps = {
  notionData: NotionDataType[];
};

export const PostCardWrapper = (props: PostCardWrapperProps) => {
  const { notionData } = props;

  return (
    <Ul>
      {notionData.map((data) => (
        <PostCard key={data.id} data={data} />
      ))}
    </Ul>
  );
};

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media ${theme.device.tablet} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
