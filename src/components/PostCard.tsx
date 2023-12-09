import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Divider } from '@/components/Divider';
import { Tag } from '@/components/Tag';
import { theme } from '@/themes';
import { PostCardData } from '@/types/notion';

type PostCardProps = {
  postCard: PostCardData;
};

export const PostCard = (props: PostCardProps) => {
  const { postCard } = props;
  const router = useRouter();

  const handleClickPost = () => {
    router.push(`/posts/${postCard.slug}`);
  };

  return (
    <Li onClick={handleClickPost}>
      <H2>{postCard.title}</H2>
      <Divider />
      <TagsWrapper>
        {postCard.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </TagsWrapper>
      <BottomWrapper>
        <P>{postCard.description}</P>
        <DateWrapper>
          <DateLabel>{postCard.date}</DateLabel>
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
