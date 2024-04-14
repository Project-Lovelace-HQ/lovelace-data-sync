import { Client } from '@notionhq/client';
import { UpdatedSubscribedGameInfo } from '../models/updated-subscribed-game-info.model';

// Update the retrieved data to the database pages
export async function updateDatabasePages(updatedGamesInfo: UpdatedSubscribedGameInfo[]) {
  // Notion SDK for JavaScript
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const lowestPriceColumnName = process.env.NOTION_DATABASE_LOWEST_PRICE_COLUMN_NAME as string;

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  updatedGamesInfo.forEach(async (updatedGameInfo) => {
    const pageId = updatedGameInfo.id;

    if (typeof updatedGameInfo.response === 'object') {
      await notion.pages.update({
        page_id: pageId,
        properties: {
          [lowestPriceColumnName]: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: formatter.format(updatedGameInfo.response.price),
                },
              },
            ],
            type: 'rich_text',
          },
        },
      });
    }
  });
}
