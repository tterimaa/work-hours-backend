import { Schema, model } from "mongoose";
import { IEmployeeModel } from "../interfaces/IEmployee";

const documentName = "Employee";

const EmployeeSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  firstname: String,
  lastname: String,
  companies: [{ type: Schema.Types.ObjectId, ref: "Account" }],
});

const Employee = model<IEmployeeModel>(documentName, EmployeeSchema);
export default Employee;
