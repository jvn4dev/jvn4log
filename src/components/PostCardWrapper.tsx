import { PostCard } from '@/components/PostCard';
import { NotionData } from '@/types/notion';

type PostCardWrapperProps = {
  notionData: NotionData[];
};

export const PostCardWrapper = (props: PostCardWrapperProps) => {
  const { notionData } = props;

  return (
    <ul>
      {notionData.map((data) => (
        <PostCard key={data.id} data={data} />
      ))}
    </ul>
  );
};
