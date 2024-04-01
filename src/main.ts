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

async function main() {
  try {
    // Start the process by getting the database pages from the Notion API
    const databasePages: QueryDatabaseResponse | undefined = await getDatabasePages(
      process.env.NOTION_DATABASE_ID as string
    );

    if (!databasePages) return;

    const databasePagesResult: PageObjectResponse[] = databasePages.results as PageObjectResponse[];

    // Filter the pages so it only has the ones with the desired value
    const subscribedPages = filterDatabaseSubscribedPages(databasePagesResult);

    createQueryLogger('subscribed_pages').http(subscribedPages);
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
}

main();
