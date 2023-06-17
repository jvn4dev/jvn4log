import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? '';

export async function addItem(text: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log('Success! Entry added.');
  } catch (error: any) {
    console.error(error);
  }
}
