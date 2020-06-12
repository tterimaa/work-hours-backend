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

// TODO: No req.body.role here. Role has to be extracted from token somehow?
const checkRole = (roles: string[]): RequestHandler => (req, res, next) => {
    if(roles.includes(req.body.role)) {
        next();
    }
    return res.status(401).json({
        message: "Unauthorized (role)",
        success: false
    });
};

export {
  employeeValidator,
  companyValidator,
  loginValidator,
  errorHandler,
  unknownEndpoint,
  checkRole
};
