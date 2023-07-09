import { NextApiResponse } from 'next';

export const handleNotionErrors = (error: unknown, res?: NextApiResponse) => {
  console.error('Notion API Error: ', error);

  if (res) {
    res.status(500).json({ message: 'An error occurred with the Notion API' });
  } else {
    throw error;
  }
};
