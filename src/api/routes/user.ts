import { Router } from "express";
import userService from "../../services/userService";
import loginService from "../../services/loginService";
import {
  employeeValidator,
  companyValidator,
  loginValidator,
} from "../middlewares/validators";
import { checkRole } from "../middlewares/auth";
import passport from "passport";
import asyncHandler from "express-async-handler";

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
    asyncHandler(async (req, res, next) => {
      const user = await userService
        .addUser(req.body)
        .catch((err) => next(err));
      res.status(200).json({ success: true, msg: user });
    })
  );

  route.post(
    "/register-company",
    companyValidator,
    asyncHandler(async (req, res, next) => {
      const user = await userService
        .addUser(req.body)
        .catch((err) => next(err));
      res.status(200).json({ success: true, msg: user });
    })
  );

  route.post(
    "/login",
    loginValidator,
    asyncHandler(async (req, res, _next) => {
      const { email, password, role } = req.body;
      const tokenObject = await loginService.login(email, password, role);

      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expires: tokenObject.expires,
      });
    })
  );
};
