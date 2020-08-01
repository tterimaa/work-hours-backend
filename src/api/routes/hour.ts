import { Router } from "express";
import passport from "passport";
import { checkRole } from "../middlewares/auth";
import { hourValidator } from "../middlewares/validators";

const route = Router();

export default (app: Router) => {
  app.use("/hours", route);

  route.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    checkRole(["employee"]),
    hourValidator,
    (_req, res, _next) => {
      console.log("Hello world");
      res.status(404).json({
        success: false,
        msg: "Endpoint in progress",
      });
    }
  );
};
