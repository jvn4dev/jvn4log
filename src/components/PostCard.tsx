import { Fragment } from 'react';
import styled from 'styled-components';
import { Divider } from '@/components/Divider';
import { theme } from '@/themes';
import { NotionData } from '@/types/notion';

type PostCardProps = {
  data: NotionData;
};

export const PostCard = (props: PostCardProps) => {
  const { data } = props;

  return (
    <Li key={data.id}>
      <H2>{data.title}</H2>
      <Divider />
      <TagsWrapper>
        {data.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </TagsWrapper>
      <P>{data.description}</P>
      <Label>{data.date}</Label>
    </Li>
  );
};

const Li = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 70px 70px;
  &:hover {
    background-color: ${theme.colors.grayBackground};
    cursor: pointer;
  }
`;

const H2 = styled.h2`
  margin: 0;
`;

const TagsWrapper = styled.div``;

const P = styled.p``;
const Label = styled.label``;
