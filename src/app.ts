import express from "express";
import config from "./config/index";
import Logger from "./loaders/logger";

async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`Server listening on port ${config.port}`);
  });

  return app;
}

startServer();
