import { RequestHandler } from "express";

const checkRole = (roles: string[]): RequestHandler => (req, res, next) => {
  const hasRole = roles.find((role) => req.user?.role === role);

  return hasRole
    ? next()
    : res.status(401).send({ message: "Unauthrorized (role)" });
};

export { checkRole };
