import { celebrate, Joi, Segments } from "celebrate";

const employeeSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(60),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  role: Joi.string().valid("employee").required(),
});

const companySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(60),
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
    day: Joi.number().required(),
    month: Joi.number().required(),
    year: Joi.number().required(),
    startHour: Joi.number().required(),
    startMin: Joi.number().required(),
    endHour: Joi.number().required(),
    endMin: Joi.number().required(),
  }),
});

export { employeeValidator, companyValidator, loginValidator, hourValidator };
