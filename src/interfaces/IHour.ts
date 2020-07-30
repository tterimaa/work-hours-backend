import { IUser } from "./IUser";

export interface IHour {
  _id: string;
  employee: IUser;
  start: Date;
  end: Date;
  // TODO: Method for calculating total, OR int total
}

export type UserDTO = Omit<IUser, "_id" | "hash" | "salt">;
