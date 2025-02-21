import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;