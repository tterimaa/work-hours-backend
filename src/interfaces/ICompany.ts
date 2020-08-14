import { Document } from "mongoose";
import { IAccountModel } from "./IAccount";

export interface ICompany {
  account: string;
  companyName: string;
  employees?: Array<IAccountModel["_id"]>;
}

export interface ICompanyModel extends ICompany, Document {}
