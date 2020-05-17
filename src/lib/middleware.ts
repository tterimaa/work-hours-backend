import { celebrate, Joi } from "celebrate";

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

export { employeeValidator, companyValidator, loginValidator };
