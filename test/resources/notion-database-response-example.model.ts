import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const MockNotionDatabaseResponse: PageObjectResponse[] = [
  {
    archived: false,
    cover: null,
    created_by: { id: '', object: 'user' },
    created_time: '',
    icon: null,
    id: '',
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
    },
    public_url: null,
    url: '',
  },
];
