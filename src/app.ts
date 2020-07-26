import express from "express";
import passport from "passport";
import configure from "./config/passport";
// import router from "./api/routes/index";
import config from "./config/index";
import Logger from "./loaders/logger";
// import morgan from "morgan";
// import { errorHandler } from "./api/middlewares/error";
// import { unknownEndpoint } from "./api/middlewares/unknown-endpoint";

// Create the Express application

async function startServer() {
  const app = express();

  // Pass the global passport object into the configuration function
  configure(passport);

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
