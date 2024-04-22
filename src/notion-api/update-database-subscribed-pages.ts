import { Client } from '@notionhq/client';
import { UpdatedSubscribedGameInfo } from '../models/updated-subscribed-game-info.model';

/**
 * Update the retrieved data to the database pages
 *
 * @export
 * @throws {Error} If the Notion API is not available
 * @param {UpdatedSubscribedGameInfo[]} updatedGamesInfo The updated data to be saved in the database pages
 * @return {Promise<void>} A promise that resolves when the updated database pages are saved
 */
export async function updateDatabaseSubscribedPages(
  updatedGamesInfo: UpdatedSubscribedGameInfo[]
): Promise<void> {
  // Notion SDK for JavaScript
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const lowestPriceColumnName = process.env.NOTION_DATABASE_LOWEST_PRICE_COLUMN_NAME as string;

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Update the database pages one by one
  updatedGamesInfo.forEach(async (updatedGameInfo) => {
    const pageId = updatedGameInfo.id;
    let price_content = '';

    // If the response is a string, it means that there was an error
    if (typeof updatedGameInfo.response === 'string') {
      price_content = updatedGameInfo.response;
    }

    // If the response is an object, it means that the price was fetched successfully
    if (typeof updatedGameInfo.response === 'object') {
      price_content = formatter.format(updatedGameInfo.response.price);
    }

    await notion.pages.update({
      page_id: pageId,
      properties: {
        [lowestPriceColumnName]: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: price_content,
              },
            },
          ],
          type: 'rich_text',
        },
      },
    });
  });
}
