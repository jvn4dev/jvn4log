import Home from '@/app/home-page';
import { getBlogs } from '@/libs/notion';

export default async function Page() {
  const blogs = await getBlogs('SSG');
  return <Home blogs={blogs} />;
}
