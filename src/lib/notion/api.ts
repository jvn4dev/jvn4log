import { NOTION_API_KEY, NOTION_DATABASE_ID } from '@/config';
import { n2m } from '@/lib/notion/client';
import {
  NotionDatabaseResponse,
  NotionPageData,
  PostData,
} from '@/types/notion';
import { getPageMetaData } from '@/utils/notion';

async function fetcher(url: string, method = 'GET', body?: any) {
  const requestOptions: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const res = await fetch(url, requestOptions);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data: NotionDatabaseResponse = await res.json();
  return data;
}

export async function getBlogs(): Promise<NotionPageData[]> {
  const res = await fetcher(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    'POST',
  );
  return res.results;
}

export async function getSinglePostBySlug(slug: string): Promise<PostData> {
  const res = await fetcher(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    'POST',
    {
      filter: {
        property: 'Slug',
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    },
  );

  const page = res.results[0];
  const metadata = getPageMetaData(page);
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    metadata,
    markdown: mdString,
  };
}
