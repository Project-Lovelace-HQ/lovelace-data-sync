import winston from 'winston';
import { ProjectInfo } from '../enums/project-info.enum';
import { LoggerLevel } from './models/logger-level.enum';

// Set log level to 'warn' in production, 'debug' in other environments
const level = process.env.NODE_ENV === 'production' ? LoggerLevel.WARN : LoggerLevel.DEBUG;

const logger = winston.createLogger({
  level: level,
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: { service: ProjectInfo.PROJECT_SERVICE },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: LoggerLevel.ERROR,
      lazy: true,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      lazy: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.printf(({ level, message }) => `${level}: ${message}\n`)
      ),
    })
  );

  logger.info('Not running in production mode. Logging to console.');
}

export default logger;
