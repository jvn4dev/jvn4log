import { Client } from '@notionhq/client';
import { NotionData } from '@/types/notion';

interface INotion {
  getAllPublished(): Promise<NotionData[]>;
  getPageMetaData(post: any): NotionData;
  getTags(tags: any[]): string[];
  getToday(dateString: string): string;
}

export default class Notion implements INotion {
  private notion: Client;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
  }

  getAllPublished = async () => {
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

    const allPosts = posts.results;

    return allPosts.map((post) => {
      return this.getPageMetaData(post);
    });
  };

  getPageMetaData = (post: any): NotionData => {
    return {
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      tags: this.getTags(post.properties.Tags.multi_select),
      description: post.properties.Description.rich_text[0].plain_text,
      date: this.getToday(post.properties.Date.last_edited_time),
      slug: post.properties.Slug.rich_text[0].plain_text,
    };
  };

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
}
