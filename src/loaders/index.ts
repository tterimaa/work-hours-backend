import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
import express from "express";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await mongooseLoader();
  Logger.info("Database connected");

  expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
