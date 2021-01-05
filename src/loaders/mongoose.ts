import mongoose from "mongoose";
import config from "../config";

export default async (): Promise<void> => {
  await mongoose
    .connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((err) => {
      throw new Error(err);
    });
};
