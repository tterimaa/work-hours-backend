import { Schema, model } from "mongoose";
import { UserIF } from "../types";

const UserSchema = new Schema({
  email: String,
  role: String,
  firstname: String,
  lastname: String,
  companyName: String,
  companies: [{ type: Schema.Types.ObjectId, ref: "User" }],
  employees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  hash: String,
  salt: String
});

const User = model<UserIF>("User", UserSchema);
export default User;
