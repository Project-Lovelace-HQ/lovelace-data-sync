import { MockNotionQueryDatabaseResponse } from './test/resources/notion-query-database-response.mock';

export const mockQueryResponse = jest.fn().mockResolvedValue(MockNotionQueryDatabaseResponse);

export const mockUpdateResponse = jest.fn().mockResolvedValue({});

export const mockQueryLogger = jest.fn().mockReturnValue({
  http: jest.fn().mockImplementation(() => {}),
});

export const mockDefaultLogger = jest.fn().mockReturnValue({
  error: jest.fn().mockImplementation(() => {}),
  warn: jest.fn().mockImplementation(() => {}),
  info: jest.fn().mockImplementation(() => {}),
  http: jest.fn().mockImplementation(() => {}),
  verbose: jest.fn().mockImplementation(() => {}),
  debug: jest.fn().mockImplementation(() => {}),
  silly: jest.fn().mockImplementation(() => {}),
});

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
    createQueryLogger: mockQueryLogger,
  };
});

jest.mock('./src/loggers/default-logger.ts', () => {
  return {
    createLogger: mockDefaultLogger,
  };
});
