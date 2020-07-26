import logger from "../../loaders/logger";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({
    status,
    message,
  });
};

export { errorHandler };
