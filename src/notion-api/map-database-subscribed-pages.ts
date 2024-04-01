import validator from 'validator';

import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { LovelaceSubscribedGameUrl } from '../models/lovelace-subscribed-game-url.model';
import logger from '../loggers/default-logger';
import { ProjectInfo } from '../enums/project-info.enum';
import createQueryLogger from '../loggers/query-logger';

// Map the database pages to get the URLs
export function mapDatabaseSubscribedPagesToLovelaceSubscribedGamesUrl(
  databaseSubscribedPages: QueryDatabaseResponse
): LovelaceSubscribedGameUrl[] {
  const databaseSubscribedPagesResult = databaseSubscribedPages.results as PageObjectResponse[];

  if (databaseSubscribedPagesResult.length === 0) {
    logger.warn('No subscribed pages found');
    return [];
  }

  const ludopediaUrlColumnName = process.env.NOTION_DATABASE_LUDOPEDIA_URL_COLUMN_NAME as string;

  const lovelaceSubscribedGamesUrl: LovelaceSubscribedGameUrl[] = [];

  databaseSubscribedPagesResult.forEach((page) => {
    const ludopediaUrlPageProperty = page.properties[ludopediaUrlColumnName];

    if (!ludopediaUrlPageProperty) {
      throw new Error(
        `Couldn't find the database column '${ludopediaUrlColumnName}', check the environment variables`
      );
    }

    if (ludopediaUrlPageProperty.type !== 'url') {
      throw new Error(
        `Expected '${ludopediaUrlColumnName}' to be of type 'URL', check the environment variables`
      );
    }

    if (!ludopediaUrlPageProperty.url || !validator.isURL(ludopediaUrlPageProperty.url)) {
      logger.warn(`No valid URL found for page ${page.id}, skipping...`);
      return;
    }

    lovelaceSubscribedGamesUrl.push({
      id: page.id,
      url: ludopediaUrlPageProperty.url,
    });
  });

  // Log the subscribed pages if in development mode
  if (process.env.NODE_ENV === ProjectInfo.DEV_ENVIRONMENT) {
    createQueryLogger('mapped_database_pages').http(lovelaceSubscribedGamesUrl);
  }

  return lovelaceSubscribedGamesUrl;
}
