import { Document } from "mongoose";

export interface IAccount {
  email: string;
  password: string;
  role: string;
}

export interface IAccountModel extends IAccount, Document {
  hash: string;
}
