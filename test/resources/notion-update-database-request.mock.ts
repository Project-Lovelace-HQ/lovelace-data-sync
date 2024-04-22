import { UpdatedSubscribedGameInfo } from '../../src/models/updated-subscribed-game-info.model';

export const MockNotionUpdateDatabaseRequest: UpdatedSubscribedGameInfo[] = [
  {
    id: 'pageId1',
    error: false,
    response: {
      price: 99.99,
      city: 'São Paulo',
      condition: 'New',
      details: 'Brand new sealed',
      link: 'Auction',
    },
  },
  {
    id: 'pageId2',
    error: true,
    response: 'Error: Failed to fetch price',
  },
];
