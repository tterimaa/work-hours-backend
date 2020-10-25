import { Document } from "mongoose";
import { IAccountModel } from "./IAccount";

export type Status = 1 | 2 | 3;

export interface IRequest {
  status: Status;
  from: IAccountModel["_id"][];
  to: IAccountModel["_id"][];
}

export interface IRequestModel extends IRequest, Document {}
