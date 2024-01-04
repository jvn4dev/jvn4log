import PostMain from '@/app/posts/[slug]/post-page';
import { getBlogs, getSinglePostBySlug } from '@/libs/notion';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getSinglePostBySlug(slug, 'SSR');

  return <PostMain post={post} />;
}

export async function generateStaticParams() {
  const blogs = await getBlogs('SSG');
  return blogs.map((blog) => ({
    slug: blog.properties.Slug.rich_text[0].plain_text,
  }));
}
