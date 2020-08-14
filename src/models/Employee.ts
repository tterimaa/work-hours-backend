import { Schema, model } from "mongoose";
import { IEmployeeModel } from "../interfaces/IEmployee";

const documentName = "Employee";

const EmployeeSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  firstname: String,
  lastname: String,
  companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],
});

const Company = model<IEmployeeModel>(documentName, EmployeeSchema);
export default Company;
