import mongoose = require("mongoose");

const devConnection = process.env.DB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

if (process.env.NODE_ENV === "production") {
  mongoose.connect(`${prodConnection}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });
} else if (process.env.NODE_ENV === "test") {
  console.log("Test connects to db defined in db-handler");
} else {
  mongoose.connect(`${devConnection}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });
}
