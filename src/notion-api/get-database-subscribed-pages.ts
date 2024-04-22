import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { createQueryLogger } from '../loggers/query-logger';

/**
 * Get the subscribed games pages from the database
 *
 * @export
 * @throws {Error} If the Notion API is not available
 * @return {Promise<QueryDatabaseResponse>} A promise that resolves to the response from the Notion API. The response contains the pages in the database that represent subscribed games.
 */
export async function getDatabaseSubscribedPages(): Promise<QueryDatabaseResponse> {
  // Notion SDK for JavaScript
  const notion = new Client({ auth: process.env.NOTION_KEY });

  // The database with the user games entries
  const databaseId = process.env.NOTION_DATABASE_ID as string;

  // The column name where the subscription status is stored
  const subscriptionStatusColumnName = process.env
    .NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME as string;

  // The value that indicates that the subscription status is positive
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
