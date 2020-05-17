import { Schema, model, Document } from "mongoose";
import { ICompanyUser } from "../types";

const documentName = "Company";

const CompanySchema = new Schema({
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

const Company = model<ICompanyUser & Document>(documentName, CompanySchema);
export default Company;
