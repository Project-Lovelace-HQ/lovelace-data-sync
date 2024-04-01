import dotenv from 'dotenv';
dotenv.config();

import logger from '../loggers/default-logger';

interface RequiredVariable {
  name: string;
  expectedLength?: number;
}

export function loadEnvironmentVariables() {
  const requiredVariables: RequiredVariable[] = [
    { name: 'NOTION_DATABASE_ID', expectedLength: 32 },
    { name: 'NOTION_KEY', expectedLength: 50 },
    { name: 'NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME' },
    { name: 'NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME' },
  ];

  const errors: string[] = [];

  for (const variable of requiredVariables) {
    if (!process.env[variable.name]) {
      errors.push(`Invalid or missing required environment variable: ${variable.name}`);
    } else if (
      variable.expectedLength &&
      process.env[variable.name]?.length !== variable.expectedLength
    ) {
      errors.push(`Invalid length for environment variable: ${variable.name}`);
    }
  }

  if (errors.length > 0) {
    logger.error(errors.join('\n'), () => {
      logger.on('finish', () => process.exit(1));
      logger.end();
    });
  }
}
