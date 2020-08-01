import { Router } from "express";
import user from "./routes/user";
import hour from "./routes/hour";

export default () => {
  const app = Router();
  user(app);
  hour(app);

  return app;
};
