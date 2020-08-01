import { IUserModel } from "./IUser";
import { Document } from "mongoose";

export interface IHour {
  employeeId: IUserModel["_id"];
  start: Date;
  end: Date;
  timeZoneOffset: number;
  // TODO: Method for calculating total, OR int total
}

export interface IHourModel extends IHour, Document {}

export interface IHourInput {
  employeeId: IUserModel["_id"];
  start: string;
  end: string;
  timeZoneOffset: number;
}
