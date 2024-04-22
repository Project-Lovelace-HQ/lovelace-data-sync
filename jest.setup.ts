import { MockNotionQueryDatabaseResponse } from './test/resources/notion-query-database-response-example.model';

export const mockQuery = jest.fn().mockResolvedValue(MockNotionQueryDatabaseResponse);

jest.mock('@notionhq/client', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        databases: {
          query: mockQuery,
        },
      };
    }),
  };
});

jest.mock('./src/loggers/query-logger.ts', () => {
  return {
    createQueryLogger: jest.fn().mockReturnValue({
      http: jest.fn().mockImplementation(() => {}),
    }),
  };
});
