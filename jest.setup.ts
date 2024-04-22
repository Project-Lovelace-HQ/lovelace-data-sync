import { MockNotionQueryDatabaseResponse } from './test/resources/notion-query-database-response.mock';

export const mockQueryResponse = jest.fn().mockResolvedValue(MockNotionQueryDatabaseResponse);

export const mockUpdateResponse = jest.fn().mockResolvedValue({});

jest.mock('@notionhq/client', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        databases: {
          query: mockQueryResponse,
        },
        pages: {
          update: mockUpdateResponse,
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
