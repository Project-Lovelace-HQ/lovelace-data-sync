import winston from 'winston';

const level = process.env.NODE_ENV === 'production' ? 'warn' : 'debug';

const logger = winston.createLogger({
  level: level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'project-lovelace-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
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
