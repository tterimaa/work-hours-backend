import { IAccountModel } from "./IAccount";
import { Document } from "mongoose";

export interface IHour {
  employeeId: IAccountModel["_id"];
  day: number;
  month: number;
  year: number;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
}

export interface IHourModel extends IHour, Document {}

export interface IHourInput {
  day: number;
  month: number;
  year: number;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
}
