import { IEmployeeModel } from "interfaces/IEmployee";
import { ICompanyModel } from "interfaces/ICompany";
import Company from "../models/Company";
import { IAccountModel } from "../interfaces/IAccount";
import Account from "../models/Account";
import Employee from "../models/Employee";

const findAccountByEmail = async (email: string): Promise<IAccountModel> => {
  const account = await Account.findOne({ email: email }).orFail(() => {
    throw new Error(`Account with email ${email} was not found`);
  });
  return account;
};

const getAdditionalInformation = async (
  id: string
): Promise<IEmployeeModel | ICompanyModel> => {
  const userAccount = await Account.findOne({ _id: id }).orFail();
  switch (userAccount.role) {
    case "employee":
      return await Employee.findOne({ account: id })
        .populate("account", "_id email role")
        .populate("employees", "_id email role")
        .orFail();
    case "company":
      return Company.findOne({ account: id })
        .populate("account", "_id email role")
        .populate("employees", "_id email role")
        .orFail();
    default:
      throw new Error("Role not found");
  }
};

export default {
  findAccountByEmail,
  getAdditionalInformation,
};
