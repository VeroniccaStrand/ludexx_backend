import winston from 'winston';

const { combine, timestamp, printf, colorize, align } = winston.format;


// Format för konsoltransporten
const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

// Format för filtransporten
const fileFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf((info) => `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`)
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    // Filtransport med eget format
    new winston.transports.File({
      filename: 'combined.log',
      format: fileFormat,
    }),
    // Konsoltransport med eget format
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});


