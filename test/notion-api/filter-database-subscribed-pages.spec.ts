import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { filterDatabaseSubscribedPages } from '../../src/notion-api/filter-database-subscribed-pages';
import { MockNotionDatabaseResponse } from '../resources/notion-database-response-example.model';

const textColumnName = 'Subscribed?';
const textPositiveValue = 'Yes';

describe('filterDatabaseSubscribedPages', () => {
  beforeAll(() => {
    process.env.NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME = textColumnName;
    process.env.NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME = textPositiveValue;
  });

  it('#filterDatabaseSubscribedPages', () => {
    const databasePagesResult: PageObjectResponse[] = MockNotionDatabaseResponse;

    const filteredPages = filterDatabaseSubscribedPages(databasePagesResult);

    expect(filteredPages).toHaveLength(1);
    if (filteredPages[0].properties[textColumnName].type === 'select') {
      expect(filteredPages[0].properties[textColumnName].select?.name).toBe(textPositiveValue);
    }
  });
});
