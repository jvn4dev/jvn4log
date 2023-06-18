import { Fragment } from 'react';
import { NotionData } from '@/types/notion';

type PostCardProps = {
  data: NotionData;
};

export const PostCard = (props: PostCardProps) => {
  const { data } = props;

  return (
    <Fragment key={data.id}>
      <li>
        <h2>{data.title}</h2>
        <div>
          {data.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p>{data.description}</p>
        <label>{data.date}</label>
      </li>
    </Fragment>
  );
};
