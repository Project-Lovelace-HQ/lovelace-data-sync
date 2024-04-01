import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export const MockNotionQueryDatabaseResponse: QueryDatabaseResponse = {
  has_more: false,
  next_cursor: null,
  object: 'list',
  page_or_database: {},
  type: 'page_or_database',
  results: [
    {
      archived: false,
      cover: null,
      created_by: { id: '', object: 'user' },
      created_time: '',
      icon: null,
      id: '1234',
      last_edited_by: { id: '', object: 'user' },
      last_edited_time: '',
      object: 'page',
      parent: { database_id: '', type: 'database_id' },
      properties: {
        'Subscribed?': {
          id: '',
          select: { color: 'green', id: '', name: 'Yes' },
          type: 'select',
        },
        URL: {
          id: '',
          url: 'example.com',
          type: 'url',
        },
      },
      public_url: null,
      url: '',
    },
  ],
};
