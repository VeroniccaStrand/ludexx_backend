import winston from 'winston';

const { combine, timestamp, printf, colorize, align, errors } = winston.format;


// Format för konsoltransporten
const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

// Format för filtransporten
const fileFormat = combine(
  errors({ stack: true }), 
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf((info) => {
    if (info.stack) {
      return `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}\nStacktrace: ${info.stack}`;
    }
    return `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`;
  })
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
   
    new winston.transports.File({
      filename: 'Error.log',
      format: fileFormat,
      level: 'error'
    }),
   
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});


logger.info('info log')
logger.error('error log', new Error('test error'))
logger.warn('warn log')