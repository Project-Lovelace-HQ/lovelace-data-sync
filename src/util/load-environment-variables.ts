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
    throw new Error(errors.join('\n'));
  }
}
