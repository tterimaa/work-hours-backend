import { Schema, model, Document } from "mongoose";
import { IEmployeeUser } from "../types";

const documentName = "Employee";

const EmployeeSchema = new Schema({
  email: { type: String, required: true },
  role: { type: String, enum: ["employee"], required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  companies: [{ type: Schema.Types.ObjectId, ref: "User" }],
  hash: String,
  salt: String,
});

const Employee = model<IEmployeeUser & Document>(documentName, EmployeeSchema);
export default Employee;
