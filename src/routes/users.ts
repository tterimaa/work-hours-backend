import express from "express";
import passport from "passport";
import { issueJWT } from "../lib/utils";
import userService from "../services/userService";
import {
  employeeValidator,
  companyValidator,
  loginValidator,
} from "../lib/middleware";

const router = express.Router();

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (_req, res, _next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

router.post("/register-employee", employeeValidator, async (req, res, next) => {
  try {
    const user = await userService.addEmployee(req.body);
    res.status(200).json({ success: true, msg: user });
  } catch (e) {
    return next(e);
  }
});

router.post("/login-employee", loginValidator, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findEmployeeByEmail(email);
    if (userService.passwordIsValid(password, user)) {
      const tokenObject = issueJWT(user);
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expires: tokenObject.expires,
      });
    } else res.status(401).json({ success: false, msg: "Wrong password" }); //TODO: throw custom error here
  } catch (e) {
    return next(e);
  }
});

router.post("/register-company", companyValidator, async (req, res, next) => {
  try {
    const user = await userService.addCompany(req.body);
    res.status(200).json({ success: true, msg: user });
  } catch (e) {
    return next(e);
  }
});

// TODO: Unite logins into one route, only one line difference now
// Should login route only handle login and give all the other logic to userService (or loginService)
router.post("/login-company", loginValidator, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findCompanyByEmail(email);
    if (userService.passwordIsValid(password, user)) {
      const tokenObject = issueJWT(user);
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expires: tokenObject.expires,
      });
    } else res.status(401).json({ success: false, msg: "Wrong password" }); //TODO: throw custom error here
  } catch (e) {
    return next(e);
  }
});

export default router;
