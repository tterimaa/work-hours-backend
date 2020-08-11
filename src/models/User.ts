import { Schema, model } from "mongoose";
import { IUserModel } from "../interfaces/IUser";

const documentName = "User";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  role: String,
  firstname: String,
  lastname: String,
  companyName: String,
  companies: [{ type: Schema.Types.ObjectId, ref: "User" }],
  employees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  hash: {
    type: String,
    required: true,
  },
});

const User = model<IUserModel>(documentName, UserSchema);
export default User;
