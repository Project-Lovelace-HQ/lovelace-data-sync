import { RequiredVariables } from '../../src/util/environment-variables/required-variables.const';
import { validateEnvironmentVariables } from '../../src/util/environment-variables/validate-environment-variables';

const requiredVariables = RequiredVariables;

describe('validateEnvironmentVariables', () => {
  // Save the original process.env
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Set up fake environment variables
    requiredVariables.forEach((envVar) => {
      process.env[envVar.name] = 'X'.repeat(envVar.expectedLength ?? 10);
    });
  });

  afterEach(() => {
    // Restore the original process.env after each test
    process.env = originalEnv;
  });

  it('should load environment variables', () => {
    validateEnvironmentVariables();

    // If no error was thrown, the function worked correctly
    expect(true).toBeTruthy();
  });

  it('should throw an error if a required variable is missing', () => {
    // Mock the process.env object
    const mockEnv = process.env;

    requiredVariables.forEach((envVar) => {
      process.env = {
        ...mockEnv,
        [envVar.name]: undefined,
      };

      try {
        validateEnvironmentVariables();

        // If no error was thrown, fail the test
        throw new Error('loadEnvironmentVariables() should throw an error');
      } catch (error) {
        if (!(error instanceof Error)) {
          // If the error is not correct, fail the test
          throw new Error();
        }

        // If an error was thrown, the function worked correctly
        expect(error.message).toBe(
          `Invalid or missing required environment variable: ${envVar.name}`
        );
      }
    });
  });

  it('should throw an error if a required variable does not meet the required length', () => {
    // Mock the process.env object
    const mockEnv = process.env;

    requiredVariables.forEach((envVar) => {
      if (!envVar.expectedLength) {
        return;
      }

      process.env = {
        ...mockEnv,
        [envVar.name]: 'X'.repeat(envVar.expectedLength + 1),
      };

      try {
        validateEnvironmentVariables();

        // If no error was thrown, reset the envs and fail the test
        process.env = mockEnv;
        throw new Error('loadEnvironmentVariables() should throw an error');
      } catch (error) {
        if (!(error instanceof Error)) {
          // If the error is not correct, reset the envs and fail the test
          process.env = mockEnv;
          throw new Error();
        }

        // If an error was thrown, the function worked correctly and reset the envs
        process.env = mockEnv;
        expect(error.message).toBe(`Invalid length for environment variable: ${envVar.name}`);
      }
    });
  });
});
