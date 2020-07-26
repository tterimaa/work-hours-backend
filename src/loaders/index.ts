import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
import express from "express";
import passport from "passport";
import passportLoader from "./passport";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await mongooseLoader();
  Logger.info("Database connected");

  passportLoader(passport);
  Logger.info("Passport configured");

  expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
