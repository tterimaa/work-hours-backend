import { Document } from "mongoose";
import { IRequestModel } from "./IRequest";

export interface IAccount {
  email: string;
  password: string;
  role: string;
  requests: IRequestModel[];
}

export interface IAccountModel extends IAccount, Document {
  hash: string;
}
