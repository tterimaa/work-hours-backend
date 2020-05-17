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

export type CompanyUserInputDTO = Omit<ICompanyUser, "_id" | "hash" | "salt">;

export type EmployeeUserInputDTO = Omit<IEmployeeUser, "_id" | "hash" | "salt">;

type Role = "company" | "employee";
