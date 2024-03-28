import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

import logger from "../loggers/default-logger";
import queryLogger from "../loggers/query-logger";

// Notion SDK for JavaScript
import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function getDatabasePages(databaseId: string): Promise<any> {
  try {
    const myDatabasePagesResponse: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
    });

    // Log the HTTP response only if in development mode
    if (process.env.NODE_ENV === 'development') {
      queryLogger.http(myDatabasePagesResponse);
    }

    return myDatabasePagesResponse;
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
}
