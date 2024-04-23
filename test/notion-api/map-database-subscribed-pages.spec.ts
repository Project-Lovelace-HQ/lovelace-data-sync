import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { mockDefaultLogger } from '../../jest.setup';
import { mapDatabasePagesToSubscribedGameInfoList } from '../../src/notion-api/map-database-subscribed-pages';
import { MockNotionQueryDatabaseResponse } from '../resources/notion-query-database-response.mock';

describe('mapDatabaseSubscribedPages', () => {
  const originalEnv = process.env;

  beforeAll(() => {
    process.env.NOTION_DATABASE_LUDOPEDIA_URL_COLUMN_NAME = 'URL';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should map the database pages to the subscribed games info', () => {
    const mockDatabaseSubscribedPages: QueryDatabaseResponse = MockNotionQueryDatabaseResponse;

    const gamesUrl = mapDatabasePagesToSubscribedGameInfoList(mockDatabaseSubscribedPages);

    expect(gamesUrl).toHaveLength(1);
    expect(gamesUrl[0].id).toBe('1234');
    expect(gamesUrl[0].url).toBe('example.com');
  });

  it('should return an empty array if no subscribed pages are found', () => {
    const mockDatabaseSubscribedPages: QueryDatabaseResponse = {
      results: [],
    } as unknown as QueryDatabaseResponse;

    const gamesUrl = mapDatabasePagesToSubscribedGameInfoList(mockDatabaseSubscribedPages);

    expect(mockDefaultLogger().warn).toHaveBeenCalledWith('No subscribed pages found');
    expect(gamesUrl).toHaveLength(0);
  });

  it('should skip pages with empty or invalid URLs', () => {
    const mockDatabaseSubscribedPages: QueryDatabaseResponse = {
      ...MockNotionQueryDatabaseResponse,
      results: [
        {
          ...MockNotionQueryDatabaseResponse.results[0],
          id: '1234',
          properties: {
            URL: {
              type: 'url',
              url: null,
              id: 'url123',
            },
          },
        },
        {
          ...MockNotionQueryDatabaseResponse.results[0],
          id: '1234',
          properties: {
            URL: {
              type: 'url',
              url: 'invalid-url',
              id: 'url456',
            },
          },
        },
      ] as PageObjectResponse[],
    };

    const subscribedGamesInfo = mapDatabasePagesToSubscribedGameInfoList(
      mockDatabaseSubscribedPages
    );

    expect(mockDefaultLogger().warn).toHaveBeenNthCalledWith(
      2,
      `No valid URL found for page 1234, skipping...`
    );
    expect(subscribedGamesInfo).toHaveLength(0);
  });

  it('should throw an error if the required URL column is missing', () => {
    try {
      const mockDatabaseSubscribedPages: QueryDatabaseResponse = {
        ...MockNotionQueryDatabaseResponse,
        results: [
          {
            ...MockNotionQueryDatabaseResponse.results[0],
            id: '121314',
            properties: {},
          },
        ] as PageObjectResponse[],
      };

      mapDatabasePagesToSubscribedGameInfoList(mockDatabaseSubscribedPages);

      throw new Error('Expected an error to be thrown');
    } catch (error) {
      if (!(error instanceof Error)) {
        throw new Error('Expected an error to be thrown');
      }

      expect(error.message).toBe(
        `Couldn't find the database column 'URL', check the environment variables`
      );
    }
  });

  it('should throw an error if the required URL column is not of type URL', () => {
    try {
      const mockDatabaseSubscribedPages: QueryDatabaseResponse = {
        ...MockNotionQueryDatabaseResponse,
        results: [
          {
            ...MockNotionQueryDatabaseResponse.results[0],
            id: '121314',
            properties: {
              URL: {
                type: 'rich_text',
                id: 'url456',
                rich_text: [],
              },
            },
          },
        ] as PageObjectResponse[],
      };

      mapDatabasePagesToSubscribedGameInfoList(mockDatabaseSubscribedPages);

      throw new Error('Expected an error to be thrown');
    } catch (error) {
      if (!(error instanceof Error)) {
        throw new Error('Expected an error to be thrown');
      }

      expect(error.message).toBe(
        `Expected 'URL' to be of type 'URL', check the environment variables`
      );
    }
  });
});
