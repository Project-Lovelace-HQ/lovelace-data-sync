import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionTableValues } from '../enums/notion-table-values.enum';

// Filter the Notion API response to get only the pages that match the criteria
export function filterDatabaseRelevantPages(
  databasePagesResult: PageObjectResponse[]
): PageObjectResponse[] {
  return databasePagesResult.filter((page) => {
    const columnName_Interested = process.env.NOTION_DATABASE_INTERESTED_COLUMN_NAME as string;
    const selectField_Interested = page.properties[columnName_Interested];

    if (selectField_Interested.type !== 'select') {
      throw new Error(
        `Expected ${columnName_Interested} to be of type 'select', check the environment variables`
      );
    }

    return selectField_Interested.select?.name === NotionTableValues.POSITIVE_VALUE;
  });
}
