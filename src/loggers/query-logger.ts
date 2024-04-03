import winston from 'winston';
import moment from 'moment';

import { ProjectInfo } from '../enums/project-info.enum';
import { LoggerLevel } from './models/logger-level.enum';

// Logger for saving queries with timestamp
export function createQueryLogger(name: string) {
  // Get current local time
  const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');

  const devTransporter = new winston.transports.File({
    filename: `logs/query_${name}_${timestamp}.json`,
    level: LoggerLevel.HTTP,
    lazy: true,
    options: { flags: 'w' },
  });

  const prodTransporter = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.printf(({ message }) => `${name}_${timestamp}: ${message}\n`)
    ),
  });

  return winston.createLogger({
    level: LoggerLevel.HTTP,
    format: winston.format.json(),
    defaultMeta: { service: ProjectInfo.PROJECT_SERVICE },
    transports:
      process.env.NODE_ENV !== ProjectInfo.PROD_ENVIRONMENT ? devTransporter : prodTransporter,
  });
}
