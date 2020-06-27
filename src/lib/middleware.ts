import { celebrate, Joi } from "celebrate";
import { ErrorRequestHandler, RequestHandler } from "express";
import { Request, Response } from "express";
import logger from "../config/logger";

const employeeValidator = celebrate({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    role: Joi.string().valid("employee").required(),
  }),
});

const companyValidator = celebrate({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    companyName: Joi.string().required(),
    role: Joi.string().valid("company").required(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("employee", "company").required(),
  }),
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({
    status,
    message,
  });
};

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const checkRole = (roles: string[]): RequestHandler => (req, res, next) => {
  const hasRole = roles.find((role) => req.user?.role === role);

  return hasRole ? next() : res.status(401).send({ message: "Unauthrorized (role)"});
};

export {
  employeeValidator,
  companyValidator,
  loginValidator,
  errorHandler,
  unknownEndpoint,
  checkRole,
};
