import mongoose from "mongoose";
import config from "../config/index";

export default async (): Promise<void> => {
  await mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
