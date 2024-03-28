import winston from 'winston';
import moment from 'moment';

import { ProjectInfo } from '../enums/project-info.enum';
import { LoggerLevel } from './models/logger-level.enum';

// Get current local time
const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');

// Logger for saving http queries with timestamp
const queryLogger = winston.createLogger({
  level: LoggerLevel.HTTP,
  format: winston.format.json(),
  defaultMeta: { service: ProjectInfo.PROJECT_SERVICE },
  transports: [
    new winston.transports.File({
      filename: `logs/query_${timestamp}.json`,
      level: LoggerLevel.HTTP,
      lazy: true,
      options: { flags: 'w' },
    }),
  ],
});

export default queryLogger;
