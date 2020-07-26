import { celebrate, Joi } from "celebrate";

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

export { employeeValidator, companyValidator, loginValidator };
