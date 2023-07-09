import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NotionData, PostData } from '@/types/notion';

interface INotion {
  getAllPublished(): Promise<NotionData[]>;
  getPageMetaData(post: any): NotionData;
  getTags(tags: any[]): string[];
  getToday(dateString: string): string;
}

export default class Notion implements INotion {
  private notion: Client;

  constructor(notionClient: Client) {
    this.notion = notionClient;
  }

  async getAllPublished() {
    const posts = await this.notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID ?? '',
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    return posts.results.map((post) => this.getPageMetaData(post));
  }

  getPageMetaData(post: any): NotionData {
    return {
      id: post.id ?? '',
      title: post.properties.Name.title[0].plain_text,
      tags: this.getTags(post.properties.Tags.multi_select),
      description: post.properties.Description.rich_text[0].plain_text,
      date: this.getToday(post.properties.Date.created_time),
      slug: post.properties.Slug.rich_text[0].plain_text,
    };
  }

  getTags(tags: any[]): string[] {
    const allTags = tags.map((tag) => {
      return tag.name;
    });

    return allTags;
  }

  getToday(dateString: string) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let date = new Date();

    if (dateString) {
      date = new Date(dateString);
    }

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  async getSinglePostBySlug(slug: string): Promise<PostData> {
    const n2m = new NotionToMarkdown({ notionClient: this.notion });
    const response = await this.notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID ?? '',
      filter: {
        property: 'Slug',
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    });

    const page = response.results[0];
    const metadata = this.getPageMetaData(page);
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks);

    return {
      metadata,
      markdown: mdString,
    };
  }
}
