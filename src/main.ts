import { loadEnvironmentVariables } from './util/load-environment-variables';

// Load the environment variables and check for errors
loadEnvironmentVariables();

import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import logger from './loggers/default-logger';
import { getDatabaseSubscribedPages } from './notion-api/get-database-subscribed-pages';
import { mapDatabaseSubscribedPagesToLovelaceGamesUrl } from './notion-api/map-database-subscribed-pages';
import { LovelaceGameUrl } from './notion-api/models/lovelace-game-url.model';

async function main() {
  try {
    // Start the process by getting the database pages from the Notion API
    const databaseSubscribedPages: QueryDatabaseResponse = await getDatabaseSubscribedPages(
      process.env.NOTION_DATABASE_ID as string
    );

    // Map the games which the user is subscribed to
    const gamesUrl: LovelaceGameUrl[] =
      mapDatabaseSubscribedPagesToLovelaceGamesUrl(databaseSubscribedPages);

    // Abort if there are no games
    if (gamesUrl.length === 0) return;
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message);
      return;
    }
  }
}

main();
