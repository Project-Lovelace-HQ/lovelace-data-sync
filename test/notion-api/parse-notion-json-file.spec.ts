import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { filterDatabaseRelevantPages } from '../../src/notion-api/parse-notion-json-file';
import { MockNotionDatabaseReponse } from '../resources/notion-database-response-example.model';
import { NotionTableValues } from '../../src/enums/notion-table-values.enum';

describe('filterDatabaseRelevantPages', () => {
  beforeAll(() => {
    process.env.NOTION_DATABASE_INTERESTED_COLUMN_NAME = 'Compartilhado?';
  });

  it('fake test', () => {
    const databasePagesResult: PageObjectResponse[] = MockNotionDatabaseReponse;

    const filteredPages = filterDatabaseRelevantPages(databasePagesResult);

    expect(filteredPages).toHaveLength(5);
    if (filteredPages[0].properties['Compartilhado?'].type === 'select') {
      expect(filteredPages[0].properties['Compartilhado?'].select?.name).toBe(
        NotionTableValues.POSITIVE_VALUE
      );
    }
  });
});
