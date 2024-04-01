import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import createQueryLogger from '../loggers/query-logger';
import { ProjectInfo } from '../enums/project-info.enum';

// Notion SDK for JavaScript
import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_KEY });

export async function getDatabasePages(databaseId: string): Promise<QueryDatabaseResponse> {
  const myDatabasePagesResponse: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
  });

  // Log the HTTP response only if in development mode
  if (process.env.NODE_ENV === ProjectInfo.DEV_ENVIRONMENT) {
    createQueryLogger('database').http(myDatabasePagesResponse);
  }

  return myDatabasePagesResponse;
}
