import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionPagePropertyValues } from '../enums/notion-table-values.enum';

// Filter the Notion API response to get only the pages that match the criteria
export function filterDatabaseRelevantPages(
  databasePagesResult: PageObjectResponse[]
): PageObjectResponse[] {
  return databasePagesResult.filter((page) => {
    const subscriptionStatusColumnName = process.env
      .NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME as string;
    const subscriptionStatusPageProperty = page.properties[subscriptionStatusColumnName];

    if (subscriptionStatusPageProperty.type !== 'select') {
      throw new Error(
        `Expected ${subscriptionStatusColumnName} to be of type 'select', check the environment variables`
      );
    }

    return subscriptionStatusPageProperty.select?.name === NotionPagePropertyValues.POSITIVE_VALUE;
  });
}
