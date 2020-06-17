import { Schema, model, Document } from "mongoose";
import { IUser } from "../types";

const documentName = "User";

const UserSchema = new Schema({
  email: { type: String, required: true },
  role: String,
  firstname: String,
  lastname: String,
  companyName: String,
  companies: [{ type: Schema.Types.ObjectId, ref: "User" }],
  employees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  hash: String,
  salt: String,
});

const User = model<IUser & Document>(documentName, UserSchema);
export default User;
