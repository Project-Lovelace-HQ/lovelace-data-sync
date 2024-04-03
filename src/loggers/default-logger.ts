import winston from 'winston';
import { ProjectInfo } from '../enums/project-info.enum';
import { LoggerLevel } from './models/logger-level.enum';

// Default logger for the application
export function createLogger() {
  // Set log level to 'warn' in production, 'debug' in other environments
  const level =
    process.env.NODE_ENV === ProjectInfo.PROD_ENVIRONMENT ? LoggerLevel.WARN : LoggerLevel.DEBUG;

  // The logger will always print to the console
  const logger = winston.createLogger({
    level: level,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    defaultMeta: { service: ProjectInfo.PROJECT_SERVICE },
    transports: new winston.transports.Console({
      format: winston.format.combine(
        winston.format.printf(({ level, message }) => `${level}: ${message}\n`)
      ),
    }),
  });

  // Log to files in non-production environments
  if (process.env.NODE_ENV !== ProjectInfo.PROD_ENVIRONMENT) {
    logger.add(
      new winston.transports.File({
        filename: 'logs/error.log',
        level: LoggerLevel.ERROR,
        lazy: true,
      })
    );
    logger.add(
      new winston.transports.File({
        filename: 'logs/combined.log',
        lazy: true,
      })
    );
  }

  return logger;
}
