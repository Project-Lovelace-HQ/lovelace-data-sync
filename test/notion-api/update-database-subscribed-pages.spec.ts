import { mockUpdateResponse } from '../../jest.setup';
import { updateDatabaseSubscribedPages } from '../../src/notion-api/update-database-subscribed-pages';
import { CurrencyFormatter } from '../../src/util/formatters/currency-formatter.util';
import { MockNotionUpdateDatabaseRequest } from '../resources/notion-update-database-request.mock';

describe('updateDatabaseSubscribedPages', () => {
  it('should update the database pages with the provided data', async () => {
    const mockRequest = MockNotionUpdateDatabaseRequest;

    await updateDatabaseSubscribedPages(mockRequest);

    expect(mockUpdateResponse).toHaveBeenCalledTimes(2);
    expect(mockUpdateResponse).toHaveBeenNthCalledWith(1, {
      page_id: 'pageId1',
      properties: {
        [process.env.NOTION_DATABASE_LOWEST_PRICE_COLUMN_NAME!]: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: CurrencyFormatter.format(99.99),
              },
            },
          ],
          type: 'rich_text',
        },
      },
    });
    expect(mockUpdateResponse).toHaveBeenNthCalledWith(2, {
      page_id: 'pageId2',
      properties: {
        [process.env.NOTION_DATABASE_LOWEST_PRICE_COLUMN_NAME!]: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Error: Failed to fetch price',
              },
            },
          ],
          type: 'rich_text',
        },
      },
    });
  });
});
