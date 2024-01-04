import { NOTION_API_KEY, NOTION_DATABASE_ID } from '@/config';
import { n2m } from '@/libs/notion/client';
import { FetchOptions } from '@/types/fetch';
import {
  NotionDatabaseResponse,
  NotionPageData,
  PostData,
} from '@/types/notion';
import { getPageMetaData } from '@/utils/notion';

async function fetcher(
  url: string,
  method = 'GET',
  fetchOption: FetchOptions,
  body?: any,
) {
  const requestOptions: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
  };

  switch (fetchOption) {
    case 'SSG':
      requestOptions.cache = 'force-cache';
      break;
    case 'SSR':
      requestOptions.cache = 'no-store';
      break;
    case 'ISR':
      requestOptions.next = {
        revalidate: 30,
      };
  }

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

export async function getBlogs(
  fetchOption: FetchOptions,
): Promise<NotionPageData[]> {
  const res = await fetcher(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    'POST',
    fetchOption,
  );
  return res.results;
}

export async function getSinglePostBySlug(
  slug: string,
  fetchOption: FetchOptions,
): Promise<PostData> {
  const res = await fetcher(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    'POST',
    fetchOption,
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
