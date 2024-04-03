import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { createQueryLogger } from '../loggers/query-logger';

// Get the subscribed games pages from the database
export async function getDatabaseSubscribedPages(): Promise<QueryDatabaseResponse> {
  // Notion SDK for JavaScript
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const databaseId = process.env.NOTION_DATABASE_ID as string;

  const subscriptionStatusColumnName = process.env
    .NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME as string;

  const subscriptionStatusPositiveValue = process.env
    .NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME as string;

  // Query the database pages where the subscription status is positive
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
  createQueryLogger('subscribed_database_pages').http(JSON.stringify(databaseSubscribedPages));

  return databaseSubscribedPages;
}
