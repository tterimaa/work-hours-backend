import { celebrate, Joi } from "celebrate";
import { ErrorRequestHandler } from "express";
import { Request, Response } from "express";

const employeeValidator = celebrate({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    role: Joi.string().valid("employee"),
  }),
});

const companyValidator = celebrate({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    companyName: Joi.string().required(),
    role: Joi.string().valid("company"),
  }),
});

const loginValidator = celebrate({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
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

export { employeeValidator, companyValidator, loginValidator, errorHandler, unknownEndpoint };
