import { app, HttpResponseInit } from '@azure/functions';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { createLogger } from './loggers/default-logger';
import { LovelaceSubscribedGameInfo } from './models/lovelace-subscribed-game-info.model';
import { getDatabaseSubscribedPages } from './notion-api/get-database-subscribed-pages';
import { mapDatabasePagesToSubscribedGameInfoList } from './notion-api/map-database-subscribed-pages';
import { loadEnvironmentVariables } from './util/load-environment-variables';
import { UpdatedSubscribedGameInfo } from './models/updated-subscribed-game-info.model';
import { getUpdatedGamesInfoFromExtractorService } from './extractor-service/get-updated-games-info';
import { updateDatabaseSubscribedPages } from './notion-api/update-database-subscribed-pages';

// AZURE FUNCTION ENTRYPOINT
//
// Should get the subscribed games from the Notion API,
// fetch the updated data from the extractor service
// and update the Notion database with the new data

export async function main(): Promise<HttpResponseInit> {
  try {
    // Load the environment variables and check for errors
    loadEnvironmentVariables();

    // Start the process by getting the database pages from the Notion API
    const databaseSubscribedPages: QueryDatabaseResponse = await getDatabaseSubscribedPages();

    // Filter the relevant info from the games which the user is subscribed to
    const subscribedGamesInfo: LovelaceSubscribedGameInfo[] =
      mapDatabasePagesToSubscribedGameInfoList(databaseSubscribedPages);

    // If there are no subscribed games, return 204 (No Content)
    if (subscribedGamesInfo.length === 0) {
      return {
        status: 204,
      };
    }

    // Fetch the subscribed games updated data from another service
    const updatedSubscribedGamesInfo: UpdatedSubscribedGameInfo[] =
      await getUpdatedGamesInfoFromExtractorService(subscribedGamesInfo);

    // Update data in the Notion API
    await updateDatabaseSubscribedPages(updatedSubscribedGamesInfo);

    return {
      status: 200,
      body: JSON.stringify(updatedSubscribedGamesInfo),
    };

    // Catch general errors, that will stop the execution of the function
    // Other specific errors should be caught in the corresponding function
  } catch (e) {
    let errorMessage = 'Internal server error';

    if (e instanceof Error) {
      errorMessage = e.message;
    }

    if (typeof e === 'string') {
      errorMessage = e;
    }

    createLogger().error(errorMessage);

    return {
      status: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
}

app.http('LovelaceDataSync', {
  methods: ['GET', 'POST'],
  authLevel: 'function',
  handler: main,
});

app.timer('TimerTrigger', {
  schedule: '0 0 8 * * *',
  handler: main,
});
