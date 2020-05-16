import express from "express";
import passport from "passport";
import { validPassword, issueJWT, toNewUserEntry } from "../lib/utils";
import User from "../models/User";
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

// Validate an existing user and issue a JWT
router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: "could not find user" });
        return;
      }

      const isValid = validPassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = issueJWT(user);

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/register-company", function (req, res, _next) {
  const validatedUser = toNewUserEntry(req.body);
  userService
    .addCompanyUser(validatedUser)
    .then((user) => {
      res.status(200).json({ success: true, msg: user });
    })
    .catch((err) => res.json({ success: false, msg: err }));
});

router.post("/login-company", (req, res, _next) => {
  const userInput = toNewUserEntry(req.body);
  userService.findUserByEmail(userInput.email).then((user) => {
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

export default router;
