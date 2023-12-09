import { MultiSelect, NotionPageData } from '@/types/notion';

export function getPageMetaData(post: NotionPageData) {
  return {
    id: post.id ?? '',
    title: post.properties.Name.title[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
    description: post.properties.Description.rich_text[0].plain_text,
    date: getToday(post.last_edited_time),
    slug: post.properties.Slug.rich_text[0].plain_text,
  };
}

export function getTags(tags: MultiSelect[]): string[] {
  return tags.map((tag) => {
    return tag.name;
  });
}

export function getToday(dateString: string) {
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
