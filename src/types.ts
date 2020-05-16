import { Document } from "mongoose";

export interface UserIF extends Document {
  email: string;
  role: Role;
  firstname?: string;
  lastname?: string;
  companyName?: string;
  companies?: Array<UserIF>;
  employees?: Array<UserIF>;
  hash: string;
  salt: string;
}

export type CompanyUser = Omit<UserIF, "firstname" | "lastname" | "companies">;

export type EmployeeUser = Omit<UserIF, "companyName" | "employees">;

export interface NewUser {
  email: string;
  password: string;
  role: Role;
  firstname?: string;
  lastname?: string;
  companyName?: string;
  companies?: Array<UserIF>;
  employees?: Array<UserIF>;
}

export type NewCompanyUser = Omit<NewUser, "firstname" | "lastname" | "companies">;

export type NewEmployeeUser = Omit<NewUser, "companyName" | "employees">;

type Role = "company" | "employee";
