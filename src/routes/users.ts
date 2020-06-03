import express from "express";
import userService from "../services/userService";
import loginService from "../services/loginService";
import {
  employeeValidator,
  companyValidator,
  loginValidator,
  checkRole
} from "../lib/middleware";
import logger from "../config/logger";
import passport from "passport";

const router = express.Router();

router.get(
  "/protected", passport.authenticate("jwt", { session: false }),
  (_req, res, _next) => {
    res.status(200).json({
      success: true,
      msg: "This route is visible for all authenticated users!",
    });
  }
);

router.get(
  "/protected-company",
  passport.authenticate("jwt", { session: false }), checkRole(["company"]),
  (_req, res, _next) => {
    res.status(200).json({
      success: true,
      msg: "This route is for company users only!",
    });
  }
);

router.get(
  "/protected-employee",
  passport.authenticate("jwt", { session: false }), checkRole(["employee"]),
  (_req, res, _next) => {
    res.status(200).json({
      success: true,
      msg: "This route is for employee users only!",
    });
  }
);

router.post("/register-employee", employeeValidator, async (req, res, next) => {
  try {
    const user = await userService.addUser(req.body);
    res.status(200).json({ success: true, msg: user });
  } catch (e) {
    return next(e);
  }
});

router.post("/register-company", companyValidator, async (req, res, next) => {
  try {
    const user = await userService.addUser(req.body);
    res.status(200).json({ success: true, msg: user });
  } catch (e) {
    return next(e);
  }
});

// TODO: Unite logins into one route, only one line difference now
// Should login route only handle login and give all the other logic to userService (or loginService)
router.post("/login", loginValidator, async (req, res, next) => {
  try {
  const { email, password, role } = req.body;
  const tokenObject = await loginService.login(email, password, role);
  res.status(200).json({
    success: true,
    token: tokenObject.token,
    expires: tokenObject.expires
  });
  } catch(e) {
    logger.error(e);
    return next(e);
  }
});

export default router;
