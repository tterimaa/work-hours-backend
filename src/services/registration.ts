import { IAccount } from "../interfaces/IAccount";
import { ICompany } from "../interfaces/ICompany";
import Account from "../models/Account";
import bcrypt from "bcrypt";
import Company from "../models/Company";
import Employee from "../models/Employee";
import { IEmployee } from "interfaces/IEmployee";

const saltRounds = 12;

type AccountInput = Omit<IAccount, "requests">;

type EmployeeInput = AccountInput & Omit<IEmployee, "account" | "companies">;

type CompanyInput = AccountInput & Omit<ICompany, "account" | "employees">;

const genPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

const registerAccount = async (account: AccountInput) => {
  const hash = await genPassword(account.password);

  return await new Account({
    email: account.email,
    role: account.role,
    hash: hash,
  }).save();
};

const registerCompany = async (companyInfo: CompanyInput) => {
  const account = await registerAccount({
    email: companyInfo.email,
    password: companyInfo.password,
    role: companyInfo.role,
  }).catch((err) => {
    throw new Error(err);
  });

  const company = await new Company({
    account: account._id,
    companyName: companyInfo.companyName,
    employees: [],
  }).save();

  return { account, company };
};

const registerEmployee = async (employeeInfo: EmployeeInput) => {
  const account = await registerAccount({
    email: employeeInfo.email,
    password: employeeInfo.password,
    role: employeeInfo.role,
  }).catch((err) => {
    throw new Error(err);
  });

  const employee = await new Employee({
    account: account._id,
    firstname: employeeInfo.firstname,
    lastname: employeeInfo.lastname,
    companies: [],
  }).save();

  return { account, employee };
};

export default { registerCompany, registerEmployee };
