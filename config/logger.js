import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

// Convert ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: path.join(__dirname, "../logs/error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(__dirname, "../logs/combined.log") })
  ],
});

// Export logger
export default logger;
