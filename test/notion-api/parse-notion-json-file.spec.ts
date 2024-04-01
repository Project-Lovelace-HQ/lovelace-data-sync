import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { filterDatabaseRelevantPages } from '../../src/notion-api/parse-notion-json-file';
import { MockNotionDatabaseResponse } from '../resources/notion-database-response-example.model';
import { NotionPagePropertyValues } from '../../src/enums/notion-table-values.enum';

describe('filterDatabaseRelevantPages', () => {
  beforeAll(() => {
    process.env.NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME = 'Compartilhado?';
  });

  it('fake test', () => {
    const databasePagesResult: PageObjectResponse[] = MockNotionDatabaseResponse;

    const filteredPages = filterDatabaseRelevantPages(databasePagesResult);

    expect(filteredPages).toHaveLength(5);
    if (filteredPages[0].properties['Compartilhado?'].type === 'select') {
      expect(filteredPages[0].properties['Compartilhado?'].select?.name).toBe(
        NotionPagePropertyValues.POSITIVE_VALUE
      );
    }
  });
});
