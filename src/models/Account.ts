import { Schema, model } from "mongoose";
import { IAccountModel } from "../interfaces/IAccount";

const documentName = "Account";

const AccountSchema = new Schema({
  email: { type: String, required: true, unique: true },
  role: String,
  requests: String,
  hash: {
    type: String,
    required: true,
  },
});

const Account = model<IAccountModel>(documentName, AccountSchema);
export default Account;
