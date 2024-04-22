/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  testPathIgnorePatterns: ['./dist/'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
