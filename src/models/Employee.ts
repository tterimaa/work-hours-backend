import { Schema, model, Document } from "mongoose";
import { IEmployeeUser } from "../types";

const documentName = "Employee";

const EmployeeSchema = new Schema({
  email: String,
  role: String,
  firstname: String,
  lastname: String,
  companyName: String,
  companies: [{ type: Schema.Types.ObjectId, ref: "User" }],
  employees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  hash: String,
  salt: String
});

const Employee = model<IEmployeeUser & Document>(documentName, EmployeeSchema);
export default Employee;
