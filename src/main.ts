import { loadEnvironmentVariables } from './util/load-environment-variables';
// import { getDatabasePages } from './util/get-board-games-database-pages';

// Load the environment variables and check for errors
loadEnvironmentVariables();

// Start the process by getting the database pages from the Notion API
// getDatabasePages(process.env.NOTION_DATABASE_ID!);
