import { MdStringObject } from 'notion-to-md/build/types';

export type PostCardData = {
  title: string;
  tags: string[];
  description: string;
  date: string;
  slug: string;
};

export type PostData = {
  metadata: PostCardData;
  markdown: MdStringObject;
};

export interface NotionDatabaseResponse {
  object: string;
  results: NotionPageData[];
  next_cursor: unknown;
  has_more: boolean;
  type: string;
  page_or_database: unknown;
  developer_survey: string;
  request_id: string;
}

export interface NotionPageData {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover: Cover;
  icon: any;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
  public_url: any;
}

export interface CreatedBy {
  object: string;
  id: string;
}

export interface LastEditedBy {
  object: string;
  id: string;
}

export interface Cover {
  type: string;
  external: string[];
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  Description: Description;
  Date: Date;
  Slug: Slug;
  Published: Published;
  Tags: Tags;
  Name: Name;
}

export type Description = {
  id: string;
  rich_text: RichText[];
  type: string;
};

export type Date = {
  created_time: string;
  id: string;
  type: string;
};

export type Slug = {
  id: string;
  rich_text: RichText[];
  type: string;
};

export type Published = {
  id: string;
  checkbox: boolean;
  type: string;
};

export type Tags = {
  id: string;
  multi_select: MultiSelect[];
  type: string;
};

export type Name = {
  id: string;
  title: Title[];
  type: string;
};

export type Title = {
  annotations: Annotation;
  href: string | null;
  plain_text: string;
  text: Text;
  type: string;
};

export type RichText = {
  annotations: Annotation;
  href: string | null;
  plain_text: string;
  text: Text;
  type: string;
};

export type Text = {
  content: string;
  link: string | null;
};

export type Annotation = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
};

export type MultiSelect = {
  id: string;
  color: string;
  name: string;
};
