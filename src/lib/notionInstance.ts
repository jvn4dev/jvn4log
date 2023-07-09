import { Client } from '@notionhq/client';
import Notion from '@/lib/notion';

const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});
export const notionInstance = new Notion(notionClient);
