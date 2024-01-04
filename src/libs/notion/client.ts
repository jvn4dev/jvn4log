import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NOTION_API_KEY } from '@/config';

export const client = new Client({
  auth: NOTION_API_KEY,
});

export const n2m = new NotionToMarkdown({ notionClient: client });
