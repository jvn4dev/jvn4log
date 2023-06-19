import { BlogMain } from '@/components/BlogMain';
import Notion from '@/lib/notion';

export const revalidate = 60;

export default async function Home() {
  const notionInstance = new Notion();
  const notionData = await notionInstance.getAllPublished();

  return <BlogMain notionData={notionData} />;
}
