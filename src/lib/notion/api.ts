import { NOTION_API_KEY, NOTION_DATABASE_ID } from '@/config';
import { NotionPageData } from '@/types/notion';

async function fetcher(url: string, method = 'GET') {
  return fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
  });
}

export async function getBlogs(): Promise<NotionPageData[]> {
  const res = await fetcher(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    'POST',
  );
  const database = await res.json();
  return database.results;
}
