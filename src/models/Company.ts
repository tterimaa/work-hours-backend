import { Schema, model } from "mongoose";
import { ICompanyModel } from "../interfaces/ICompany";

const documentName = "Company";

const CompanySchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  companyName: String,
  employees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Company = model<ICompanyModel>(documentName, CompanySchema);
export default Company;
