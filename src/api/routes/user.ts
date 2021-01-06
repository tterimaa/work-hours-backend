import { Router } from "express";
import registrationService from "../../services/registration";
import loginService from "../../services/login";
import accountService from "../../services/account";
import requestService from "../../services/request";
import {
  employeeValidator,
  companyValidator,
  loginValidator,
  requestValidator,
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

  route.get(
    "/get-user",
    passport.authenticate("jwt", { session: false }),
    asyncHandler(async (req, res, _next) => {
      const accountWithDetails = await accountService.getAdditionalInformation(
        req.user!._id
      );
      res.status(200).json(accountWithDetails);
    })
  );

  route.post(
    "/find-user",
    passport.authenticate("jwt", { session: false }),
    asyncHandler(async (req, res, _next) => {
      const account = await accountService.findAccountByEmail(req.body.email);
      const accountWithDetails = await accountService.getAdditionalInformation(
        account._id
      );
      res.status(200).json(accountWithDetails);
    })
  );

  route.post(
    "/send-request",
    requestValidator,
    passport.authenticate("jwt", { session: false }),
    asyncHandler(async (req, res, _next) => {
      await requestService.sendRequest(req.user!._id, req.body.toId);
      res.status(200).json({
        success: true,
      });
    })
  );

  route.get(
    "/get-requests-to/:toId",
    passport.authenticate("jwt", { session: false }),
    asyncHandler(async (req, res, _next) => {
      const incomingRequests = await requestService.getIncoming(
        req.params.toId
      );
      res.status(200).json({
        success: true,
        incomingRequests,
      });
    })
  );

  route.post(
    "/register-employee",
    employeeValidator,
    asyncHandler(async (req, res, _next) => {
      const { account, employee } = await registrationService.registerEmployee(
        req.body
      );
      res.status(200).json({ success: true, msg: { account, employee } });
    })
  );

  route.post(
    "/register-company",
    companyValidator,
    asyncHandler(async (req, res, _next) => {
      const user = await registrationService.registerCompany(req.body);
      res.status(200).json({ success: true, msg: user });
    })
  );

  route.post(
    "/login",
    loginValidator,
    asyncHandler(async (req, res, _next) => {
      const { email, password } = req.body;
      const tokenObject = await loginService.login(email, password);

      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expires: tokenObject.expires,
      });
    })
  );
};
