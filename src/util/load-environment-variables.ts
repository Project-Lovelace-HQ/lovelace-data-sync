interface RequiredVariable {
  name: string;
  expectedLength?: number;
}

class EnvironmentVariableError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'EnvironmentVariableError';
  }
}

/**
 * Load the required environment variables and check for errors
 *
 * @export
 * @throws {EnvironmentVariableError} If any of the required environment variables are missing or invalid
 */
export function loadEnvironmentVariables(): void {
  const requiredVariables: RequiredVariable[] = [
    { name: 'NOTION_DATABASE_ID', expectedLength: 32 },
    { name: 'NOTION_KEY', expectedLength: 50 },
    { name: 'NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME' },
    { name: 'NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME' },
    { name: 'NOTION_DATABASE_LOWEST_PRICE_COLUMN_NAME' },
    { name: 'NOTION_DATABASE_LUDOPEDIA_URL_COLUMN_NAME' },
    { name: 'EXTRACTOR_SERVICE_URL' },
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
    throw new EnvironmentVariableError(errors.join('\n'));
  }
}
