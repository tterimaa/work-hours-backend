import { Router } from "express";
import passport from "passport";
import { checkRole } from "../middlewares/auth";
import { hourValidator } from "../middlewares/validators";
import hourService from "../../services/hour";
import asyncHandler from "express-async-handler";

const route = Router();

export default (app: Router) => {
  app.use("/hours", route);

  route.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    checkRole(["employee"]),
    hourValidator,
    asyncHandler(async (req, res, _next) => {
      if (!req.user) throw new Error("Invalid user in request");
      const hour = await hourService.add(req.body, req.user);
      res.status(200).json({
        success: true,
        msg: hour,
      });
    })
  );

  route.get(
    "/get",
    passport.authenticate("jwt", { session: false }),
    checkRole(["employee"]),
    asyncHandler(async (req, res, _next) => {
      if (!req.user) throw new Error("Invalid user in request");
      const hours = await hourService.getHours(req.user);
      res.status(200).json({
        success: true,
        msg: hours,
      });
    })
  );
};
