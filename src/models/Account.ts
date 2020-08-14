import { Schema, model } from "mongoose";
import { IAccountModel } from "../interfaces/IAccount";

const documentName = "Account";

const UserAccountSchema = new Schema({
  email: { type: String, required: true, unique: true },
  role: String,
  hash: {
    type: String,
    required: true,
  },
});

const Account = model<IAccountModel>(documentName, UserAccountSchema);
export default Account;
