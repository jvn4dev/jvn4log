'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Divider } from '@/components/Divider';
import { Tag } from '@/components/Tag';
import useFormattedDate from '@/libs/hooks/useFormattedDate';
import { theme } from '@/themes';
import { PostCardData } from '@/types/notion';

type PostCardProps = {
  postCard: PostCardData;
};

export const PostCard = ({ postCard }: PostCardProps) => {
  const formattedDate = useFormattedDate(postCard.date);

  return (
    <Link
      className="flex flex-col items-start h=[520px] p-[70px] hover:bg-gray-100 cursor-pointer md:py-[70px]"
      href={`posts/${postCard.slug}`}
    >
      <h2 className="m-0 font-medium text-2xl text-zinc-800">
        {postCard.title}
      </h2>
      <Divider />
      <div className="flex flex-wrap justify-start gap-2.5">
        {postCard.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <div className="flex flex-col justify-between items-start w-full h-full">
        <p className="font-medium text-lg leading-[37px] text-gray-600 ">
          {postCard.description}
        </p>
        <DateWrapper>
          <DateLabel>{formattedDate}</DateLabel>
        </DateWrapper>
      </div>
    </Link>
  );
};

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
