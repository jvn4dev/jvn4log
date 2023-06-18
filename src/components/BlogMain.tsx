import { PostCardWrapper } from '@/components/PostCardWrapper';
import { NotionData } from '@/types/notion';

type BlogMainProps = {
  notionData: NotionData[];
};

export const BlogMain = (props: BlogMainProps) => {
  const { notionData } = props;

  return (
    <div>
      <h1>정성준 블로그</h1>
      <PostCardWrapper notionData={notionData} />
    </div>
  );
};
