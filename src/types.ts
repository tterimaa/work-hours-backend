export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: string;
  companyName?: string;
  employees?: Array<IEmployeeUser>;
  firstname?: string;
  lastname?: string;
  companies?: Array<ICompanyUser>;
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

export interface IToken {
  token: string;
  expires: string;
}

export type CompanyUserDTO = Omit<ICompanyUser, "_id" | "hash" | "salt">;

export type EmployeeUserDTO = Omit<IEmployeeUser, "_id" | "hash" | "salt">;

export type UserDTO = Omit<IUser, "_id" | "hash" | "salt">;
