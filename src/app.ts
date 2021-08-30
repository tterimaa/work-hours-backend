import express from "express";
import config from "./config/index";
import Logger from "./loaders/logger";

async function startServer() {
  const app = express();

  await require("./loaders")
    .default({ expressApp: app })
    .catch((err: Error) => {
      Logger.error(err);
      process.exit(1);
    });

  app.listen(config.port).on("error", (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`Server listening on port ${config.port}`);
  });
}

startServer();
