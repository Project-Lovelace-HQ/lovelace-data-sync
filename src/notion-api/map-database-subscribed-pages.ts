import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import validator from 'validator';
import { createLogger } from '../loggers/default-logger';
import { createQueryLogger } from '../loggers/query-logger';
import { LovelaceSubscribedGameInfo } from '../models/lovelace-subscribed-game-info.model';

interface ValidatedUrl {
  type: 'url';
  url: string | null;
  id: string;
}

interface RequiredPageColumns {
  url: string;
}

class PageStructureError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'PageStructureError';
  }
}

/**
 * Filter the database pages to collect the relevant info
 *
 * @export
 * @throws {PageStructureError} If the Notion page structure is incorrect
 * @param {QueryDatabaseResponse} databaseSubscribedPages The database pages from the Notion API
 * @return {LovelaceSubscribedGameInfo[]} The list of subscribed games info
 */
export function mapDatabasePagesToSubscribedGameInfoList(
  databaseSubscribedPages: QueryDatabaseResponse
): LovelaceSubscribedGameInfo[] {
  const databaseSubscribedPagesResult = databaseSubscribedPages.results as PageObjectResponse[];

  if (databaseSubscribedPagesResult.length === 0) {
    createLogger().warn('No subscribed pages found');
    return [];
  }

  const requiredPageColumns: RequiredPageColumns = {
    url: process.env.NOTION_DATABASE_LUDOPEDIA_URL_COLUMN_NAME as string,
  };

  const subscribedGamesInfo: LovelaceSubscribedGameInfo[] = [];

  databaseSubscribedPagesResult.forEach((page) => {
    const validatedUrl = validatePageStructure(page, requiredPageColumns);

    // If the URL is empty or invalid, skip this page
    if (!validatedUrl.url || !validator.isURL(validatedUrl.url)) {
      createLogger().warn(`No valid URL found for page ${page.id}, skipping...`);
      return;
    }

    subscribedGamesInfo.push({
      id: page.id,
      url: validatedUrl.url,
    });
  });

  // Log the subscribed pages
  createQueryLogger('mapped_database_pages').http(JSON.stringify(subscribedGamesInfo));

  return subscribedGamesInfo;
}

/**
 * Check if all the required columns are present in the page and have the correct type
 *
 * @throws {PageStructureError} If the page structure is incorrect
 * @param {PageObjectResponse} page The page from the database
 * @param {RequiredPageColumns} requiredPageColumns The required columns for the page
 * @return {ValidatedUrl} The validated URL column
 */
function validatePageStructure(
  page: PageObjectResponse,
  requiredPageColumns: RequiredPageColumns
): ValidatedUrl {
  const urlPageProperty = page.properties[requiredPageColumns.url];

  if (!urlPageProperty) {
    throw new PageStructureError(
      `Couldn't find the database column '${requiredPageColumns.url}', check the environment variables`
    );
  }

  if (urlPageProperty.type !== 'url') {
    throw new PageStructureError(
      `Expected '${requiredPageColumns.url}' to be of type 'URL', check the environment variables`
    );
  }

  return urlPageProperty;
}
