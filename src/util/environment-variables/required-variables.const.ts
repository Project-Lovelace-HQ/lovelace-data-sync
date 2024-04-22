import { RequiredVariable } from './models/required-variable.model';

export const RequiredVariables: RequiredVariable[] = [
  { name: 'NOTION_DATABASE_ID', expectedLength: 32 },
  { name: 'NOTION_KEY', expectedLength: 50 },
  { name: 'NOTION_DATABASE_SUBSCRIPTION_COLUMN_NAME' },
  { name: 'NOTION_DATABASE_SUBSCRIPTION_COLUMN_POSITIVE_VALUE_NAME' },
  { name: 'NOTION_DATABASE_LOWEST_PRICE_COLUMN_NAME' },
  { name: 'NOTION_DATABASE_LUDOPEDIA_URL_COLUMN_NAME' },
  { name: 'EXTRACTOR_SERVICE_URL' },
];
