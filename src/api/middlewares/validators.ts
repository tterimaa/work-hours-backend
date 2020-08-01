import { celebrate, Joi, Segments } from "celebrate";

const employeeSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  role: Joi.string().valid("employee").required(),
});

const companySchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  companyName: Joi.string().required(),
  role: Joi.string().valid("company").required(),
});

const employeeValidator = celebrate({
  [Segments.BODY]: employeeSchema,
});

const companyValidator = celebrate({
  [Segments.BODY]: companySchema,
});

const loginValidator = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("employee", "company").required(),
  }),
});

const hourValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    employee: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
  }),
});

export { employeeValidator, companyValidator, loginValidator, hourValidator };
