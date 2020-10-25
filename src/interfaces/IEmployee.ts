import { Document } from "mongoose";
import { ICompanyModel } from "./ICompany";

export interface IEmployee {
  account: string;
  firstname?: string;
  lastname?: string;
  companies: Array<ICompanyModel["_id"]>;
}

export interface IEmployeeModel extends IEmployee, Document {}
