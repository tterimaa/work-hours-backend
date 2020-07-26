import { Router } from "express";
import userService from "../../services/userService";
import loginService from "../../services/loginService";
import {
  employeeValidator,
  companyValidator,
  loginValidator,
} from "../middlewares/validators";
import { checkRole } from "../middlewares/auth";
import logger from "../../loaders/logger";
import passport from "passport";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    (_req, res, _next) => {
      res.status(200).json({
        success: true,
        msg: "This route is visible for all authenticated users!",
      });
    }
  );

  route.get(
    "/protected-company",
    passport.authenticate("jwt", { session: false }),
    checkRole(["company"]),
    (_req, res, _next) => {
      res.status(200).json({
        success: true,
        msg: "This route is for company users only!",
      });
    }
  );

  route.get(
    "/protected-employee",
    passport.authenticate("jwt", { session: false }),
    checkRole(["employee"]),
    (_req, res, _next) => {
      res.status(200).json({
        success: true,
        msg: "This route is for employee users only!",
      });
    }
  );

  route.post(
    "/register-employee",
    employeeValidator,
    async (req, res, next) => {
      try {
        const user = await userService.addUser(req.body);
        res.status(200).json({ success: true, msg: user });
      } catch (e) {
        return next(e);
      }
    }
  );

  route.post("/register-company", companyValidator, async (req, res, next) => {
    try {
      const user = await userService.addUser(req.body);
      res.status(200).json({ success: true, msg: user });
    } catch (e) {
      return next(e);
    }
  });

  route.post("/login", loginValidator, async (req, res, next) => {
    try {
      const { email, password, role } = req.body;
      const tokenObject = await loginService.login(email, password, role);
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expires: tokenObject.expires,
      });
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  });
};
