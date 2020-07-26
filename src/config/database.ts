import mongoose = require("mongoose");
import config from "./index";

mongoose.connect(`${config.dbUrl}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connected");
});
