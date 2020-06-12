import express from "express";
import passport from "passport";
import configure from "./config/passport";
import router from "./routes/index";
import dotenv from "dotenv";
dotenv.config();
import "./config/database";
import morgan from "morgan";
import { errorHandler, unknownEndpoint } from "./lib/middleware";
import logger from "./config/logger";

// Create the Express application
const app = express();

// Pass the global passport object into the configuration function
configure(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));

// Imports all of the routes from ./routes/index.ts
app.use(router);

app.use(unknownEndpoint);

app.use(errorHandler);

app.listen(3000, () => logger.info(`Server listening on port 3000`));
