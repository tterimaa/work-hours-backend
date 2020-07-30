import { Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  role: string;
  companyName?: string;
  employees?: Array<IUserModel["_id"]>;
  firstname?: string;
  lastname?: string;
  companies?: Array<IUserModel["_id"]>;
}

export interface IUserModel extends IUser, Document {
  hash: string;
  salt: string;
}
