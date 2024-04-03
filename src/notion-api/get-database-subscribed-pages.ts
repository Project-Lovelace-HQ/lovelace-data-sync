import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import createQueryLogger from '../loggers/query-logger';

// Notion SDK for JavaScript
import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function getDatabaseSubscribedPages(
  databaseId: string
): Promise<QueryDatabaseResponse> {
  const subscriptionStatusColumnName = process.env
    .NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME as string;

  const subscriptionStatusPositiveValue = process.env
    .NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME as string;

  const databaseSubscribedPages: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: subscriptionStatusColumnName,
      select: {
        equals: subscriptionStatusPositiveValue,
      },
    },
  });

  // Log the HTTP response
  createQueryLogger('subscribed_database_pages').http(databaseSubscribedPages);

  return databaseSubscribedPages;
}
