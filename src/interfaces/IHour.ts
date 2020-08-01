import { IUserModel } from "./IUser";
import { Document } from "mongoose";

export interface IHour {
  employee: IUserModel["_id"];
  start: string | Date;
  end: string | Date;
  // TODO: Method for calculating total, OR int total
}

export interface IHourModel extends IHour, Document {
  start: Date;
  end: Date;
}
