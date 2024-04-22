import { mockQuery } from '../../jest.setup';
import { getDatabaseSubscribedPages } from '../../src/notion-api/get-database-subscribed-pages';
import { MockNotionQueryDatabaseResponse } from '../resources/notion-query-database-response-example.model';

describe('getDatabaseSubscribedPages', () => {
  it('should query the database and return the response', async () => {
    const result = await getDatabaseSubscribedPages();

    expect(result).toBe(MockNotionQueryDatabaseResponse);
    expect(mockQuery).toHaveBeenCalledWith({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: process.env.NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME,
        select: {
          equals: process.env.NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME,
        },
      },
    });
  });
});
