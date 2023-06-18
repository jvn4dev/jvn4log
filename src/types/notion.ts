import { MdStringObject } from 'notion-to-md/build/types';

export type NotionData = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
  slug: string;
};

export type PostData = {
  metadata: NotionData;
  markdown: MdStringObject;
};
