import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const myEnv = dotenv.config();
if (myEnv.error) throw new Error("Could'nt find .env file");

export default {
  port: parseInt(`${process.env.PORT || 3000}`, 10),
  dbUrl: `${process.env.MONGODB_URI}`,
};
