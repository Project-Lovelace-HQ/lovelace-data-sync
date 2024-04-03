import { loadEnvironmentVariables } from './util/load-environment-variables';
import { createLogger } from './loggers/default-logger';

import { app, HttpResponseInit } from '@azure/functions';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { LovelaceSubscribedGameUrl } from './models/lovelace-subscribed-game-url.model';
import { getDatabaseSubscribedPages } from './notion-api/get-database-subscribed-pages';
import { mapDatabaseSubscribedPagesToLovelaceSubscribedGamesUrl } from './notion-api/map-database-subscribed-pages';

export async function main(): Promise<HttpResponseInit> {
  try {
    // Load the environment variables and check for errors
    loadEnvironmentVariables();

    // Start the process by getting the database pages from the Notion API
    const databaseSubscribedPages: QueryDatabaseResponse = await getDatabaseSubscribedPages(
      process.env.NOTION_DATABASE_ID as string
    );

    // Map the games which the user is subscribed to
    const subscribedGamesUrl: LovelaceSubscribedGameUrl[] =
      mapDatabaseSubscribedPagesToLovelaceSubscribedGamesUrl(databaseSubscribedPages);

    return {
      status: 200,
      body: JSON.stringify(subscribedGamesUrl),
    };
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
