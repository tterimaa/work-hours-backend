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

router.post("/register-employee", employeeValidator, (req, res, _next) => {
  userService
    .addEmployee(req.body)
    .then((user) => {
      res.status(200).json({ success: true, msg: user });
    })
    .catch((err) => res.json({ success: false, msg: err }));
});

router.post("/login-employee", loginValidator, (req, res, _next) => {
  const { email, password } = req.body;
  userService
    .findEmployeeByEmail(email)
    .then((user) => {
      if (userService.passwordIsValid(password, user)) {
        const tokenObject = issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expires: tokenObject.expires,
        });
      } else res.status(401).json({ success: false, msg: "Wrong password" });
    })
    .catch((err) => res.json({ success: false, msg: err }));
});

router.post("/register-company", companyValidator, (req, res, _next) => {
  userService
    .addCompany(req.body)
    .then((user) => {
      res.status(200).json({ success: true, msg: user });
    })
    .catch((err) => res.json({ success: false, msg: err }));
});

router.post("/login-company", loginValidator, (req, res, _next) => {
  const { email, password } = req.body;
  userService
    .findCompanyByEmail(email)
    .then((user) => {
      if (userService.passwordIsValid(password, user)) {
        const tokenObject = issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expires: tokenObject.expires,
        });
      } else res.status(401).json({ success: false, msg: "Wrong password" });
    })
    .catch((err) => res.json({ success: false, msg: err.toString() }));
});

export default router;
