import express from "express";
import cors from "cors";
import routes from "../api";
import passport from "passport";
import morgan from "morgan";
import { errorHandler } from "../api/middlewares/error";
import { unknownEndpoint } from "../api/middlewares/unknown-endpoint";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());

  app.use(routes());

  app.use(morgan("tiny"));

  app.use(unknownEndpoint);
  app.use(errorHandler);
};
