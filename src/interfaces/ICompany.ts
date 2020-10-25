import { IEmployeeModel } from "./IEmployee";
import { Document } from "mongoose";

export interface ICompany {
  account: string;
  companyName: string;
  employees: IEmployeeModel["_id"][];
}

export interface ICompanyModel extends ICompany, Document {}
