export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: Role;
  hash: string;
  salt: string;
}

export interface ICompanyUser extends IUser {
  companyName: string;
  employees?: Array<IEmployeeUser>;
}

export interface IEmployeeUser extends IUser {
  firstname: string;
  lastname: string;
  companies?: Array<ICompanyUser>;
}

export type CompanyUserDTO = Omit<ICompanyUser, "_id" | "hash" | "salt">;

export type EmployeeUserDTO = Omit<IEmployeeUser, "_id" | "hash" | "salt">;

type Role = "company" | "employee";
