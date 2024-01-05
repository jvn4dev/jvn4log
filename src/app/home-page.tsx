'use client';

import { Divider } from '@/components/Divider';
import { PostCard } from '@/components/PostCard';
import { NotionPageData } from '@/types/notion';

type HomeProps = { blogs: NotionPageData[] };

const Home = ({ blogs }: HomeProps) => {
  return (
    <main className="w-full flex justify-center">
      <div className="flex flex-col justify-between items-center w-11/12 max-w-screen-xl">
        <header className="flex flex-col mt-[100px] w-full pl-[70px] mb-[40px] md:pl-0">
          <h1 className="text-5xl text-red-400 font-light">Dev. articles</h1>
          <Divider />
        </header>
        <ul className="grid grid-cols-2 lg:grid-cols-1">
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
        </ul>
      </div>
    </main>
  );
};

export default Home;
