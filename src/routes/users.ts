import express from "express";
import passport from "passport";
import { issueJWT, toNewCompanyUserEntry, toNewEmployeeUserEntry } from "../lib/utils";
import userService from "../services/userService";

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

router.post("/register-employee", function (req, res, _next) {
  const validatedUser = toNewEmployeeUserEntry(req.body);
  userService
    .addEmployee(validatedUser)
    .then((user) => {
      res.status(200).json({ success: true, msg: user });
    })
    .catch((err) => res.json({ success: false, msg: err }));
});

router.post("/login-employee", (req, res, _next) => {
  const userInput = toNewEmployeeUserEntry(req.body); // Validation?
  userService.findEmployeeByEmail(userInput.email).then((user) => {
    if (userService.passwordIsValid(userInput.password, user)) {
      const tokenObject = issueJWT(user);
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expires: tokenObject.expires,
      });
    } else res.status(401).json({ success: false, msg: "Wrong password" });
  })
  .catch(err => res.json({ success: false, msg: err }));
});

router.post("/register-company", function (req, res, _next) {
  const validatedUser = toNewCompanyUserEntry(req.body);
  userService
    .addCompany(validatedUser)
    .then((user) => {
      res.status(200).json({ success: true, msg: user });
    })
    .catch((err) => res.json({ success: false, msg: err }));
});

router.post("/login-company", (req, res, _next) => {
  const userInput = toNewCompanyUserEntry(req.body); // Validation?
  userService.findCompanyByEmail(userInput.email).then((user) => {
    if (userService.passwordIsValid(userInput.password, user)) {
      const tokenObject = issueJWT(user);
      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expires: tokenObject.expires,
      });
    } else res.status(401).json({ success: false, msg: "Wrong password" });
  })
  .catch(err => res.json({ success: false, msg: err.toString() }));
});

export default router;
