export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: string;
  companyName?: string;
  employees?: Array<IUser>;
  firstname?: string;
  lastname?: string;
  companies?: Array<IUser>;
  hash: string;
  salt: string;
}

export type UserDTO = Omit<IUser, "_id" | "hash" | "salt">;
