import { Router } from "express";
import passport from "passport";
import { checkRole } from "../middlewares/auth";
import { hourValidator } from "../middlewares/validators";
import hourService from "../../services/hourService";
import { nextTick } from "process";

const route = Router();

export default (app: Router) => {
  app.use("/hours", route);

  route.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    checkRole(["employee"]),
    hourValidator,
    async (req, res, next) => {
      try {
        const hour = await hourService.add(req.body);
        res.status(200).json({
          success: true,
          msg: hour,
        });
      } catch (e) {
        return next(e);
      }
    }
  );

  route.get(
    "/get",
    passport.authenticate("jwt", { session: false }),
    checkRole(["employee"]),
    async (req, res, next) => {
      try {
        const hours = await hourService.getHours(req.body);
        res.status(200).json({
          success: true,
          msg: hours,
        });
      } catch (e) {
        return next(e);
      }
    }
  );
};
