import { IUserModel } from "./IUser";
import { Document } from "mongoose";

export interface IHour {
  employee: IUserModel["_id"];
  start: Date;
  end: Date;
  // TODO: Method for calculating total, OR int total
}

export interface IHourModel extends IHour, Document {}
