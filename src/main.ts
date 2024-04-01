import { loadEnvironmentVariables } from './util/load-environment-variables';

// Load the environment variables and check for errors
loadEnvironmentVariables();

import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import logger from './loggers/default-logger';
import createQueryLogger from './loggers/query-logger';
import { getDatabasePages } from './notion-api/get-database-pages';
import { filterDatabaseSubscribedPages } from './notion-api/filter-database-subscribed-pages';
import { ProjectInfo } from './enums/project-info.enum';

async function main() {
  try {
    // Start the process by getting the database pages from the Notion API
    const databasePages: QueryDatabaseResponse | undefined = await getDatabasePages(
      process.env.NOTION_DATABASE_ID as string
    );

    if (!databasePages) return;

    const databasePagesResult: PageObjectResponse[] = databasePages.results as PageObjectResponse[];

    // Filter the pages which the user is subscribed to
    const subscribedPages = filterDatabaseSubscribedPages(databasePagesResult);

    // Log the subscribed pages if in development mode
    if (process.env.NODE_ENV === ProjectInfo.DEV_ENVIRONMENT) {
      createQueryLogger('subscribed_pages').http(subscribedPages);
    }
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
}

main();
