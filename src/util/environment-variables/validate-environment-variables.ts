import { EnvironmentVariableError } from './errors/environment-variable.error';
import { RequiredVariables } from './required-variables.const';

/**
 * Validates the required environment variables
 *
 * @export
 * @throws {EnvironmentVariableError} If any of the required environment variables are missing or invalid
 */
export function validateEnvironmentVariables(): void {
  const requiredVariables = RequiredVariables;

  const errors: string[] = [];

  for (const variable of requiredVariables) {
    const value = process.env[variable.name];

    if (!value) {
      errors.push(`Invalid or missing required environment variable: ${variable.name}`);
    } else if (variable.expectedLength && value.length !== variable.expectedLength) {
      errors.push(`Invalid length for environment variable: ${variable.name}`);
    }
  }

  if (errors.length > 0) {
    throw new EnvironmentVariableError(errors.join('\n'));
  }
}
