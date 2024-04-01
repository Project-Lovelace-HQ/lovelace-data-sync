import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { mapDatabaseSubscribedPagesToLovelaceGamesUrl } from '../../src/notion-api/map-database-subscribed-pages';
import { MockNotionQueryDatabaseResponse } from '../resources/notion-query-database-response-example.model';

const ludopediaUrlColumnName = 'URL';

describe('mapDatabaseSubscribedPages', () => {
  beforeAll(() => {
    process.env.NOTION_DATABASE_LUDOPEDIA_URL_COLUMN_NAME = ludopediaUrlColumnName;
  });

  it('#mapDatabaseSubscribedPagesToLovelaceGamesUrl', () => {
    const mockDatabaseSubscribedPages: QueryDatabaseResponse = MockNotionQueryDatabaseResponse;

    const gamesUrl = mapDatabaseSubscribedPagesToLovelaceGamesUrl(mockDatabaseSubscribedPages);

    expect(gamesUrl).toHaveLength(1);
    expect(gamesUrl[0].id).toBe('1234');
    expect(gamesUrl[0].url).toBe('example.com');
  });
});
