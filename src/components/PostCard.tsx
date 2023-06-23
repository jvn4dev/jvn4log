import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Divider } from '@/components/Divider';
import { Tag } from '@/components/Tag';
import { theme } from '@/themes';
import { NotionData } from '@/types/notion';

type PostCardProps = {
  data: NotionData;
};

export const PostCard = (props: PostCardProps) => {
  const { data } = props;
  const router = useRouter();

  const handleClickPost = () => {
    router.push(`/posts/${data.slug}`);
  };

  return (
    <Li key={data.id} onClick={handleClickPost}>
      <H2>{data.title}</H2>
      <Divider />
      <TagsWrapper>
        {data.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </TagsWrapper>
      <BottomWrapper>
        <P>{data.description}</P>
        <DateWrapper>
          <DateLabel>{data.date}</DateLabel>
        </DateWrapper>
      </BottomWrapper>
    </Li>
  );
};

const Li = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 520px;
  padding: 70px;
  &:hover {
    background-color: ${theme.colors.grayBackground};
    cursor: pointer;
  }

  @media ${theme.device.tablet} {
    padding: 70px 0;

    &:hover {
      background-color: initial;
      cursor: initial;
    }
  }
`;

const H2 = styled.h2`
  margin: 0;
  font-weight: 400;
  font-size: 1.5rem;
  color: ${theme.colors.textDark};
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const P = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: ${theme.lineHeights[5]};
  color: ${theme.colors.textLight};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 32px;
`;

const DateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const DateLabel = styled.label`
  font-weight: 300;
  font-size: 1.1rem;
  color: ${theme.colors.textLight};
`;
