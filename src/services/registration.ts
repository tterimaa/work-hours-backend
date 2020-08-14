import { IAccount } from "../interfaces/IAccount";
import { ICompany } from "../interfaces/ICompany";
import Account from "../models/Account";
import bcrypt from "bcrypt";
import Company from "../models/Company";
import Employee from "../models/Employee";
import { IEmployee } from "interfaces/IEmployee";

const saltRounds = 12;

const genPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

const registerCompany = async (user: IAccount & ICompany) => {
  const hash = await genPassword(user.password);

  const newAccount = new Account({
    email: user.email,
    role: user.role,
    hash: hash,
  });

  const account = await newAccount.save();

  const newCompany = new Company({
    account: account._id,
    companyName: user.companyName,
    employees: user.employees,
  });

  const company = await newCompany.save();

  return { account, company };
};

const registerEmployee = async (user: IAccount & IEmployee) => {
  const hash = await genPassword(user.password);

  const newAccount = new Account({
    email: user.email,
    role: user.role,
    hash: hash,
  });

  const account = await newAccount.save();

  const newEmployee = new Employee({
    account: account._id,
    firstname: user.firstname,
    lastname: user.lastname,
    companies: user.companies,
  });

  const employee = await newEmployee.save();

  return { account, employee };
};

export default { registerCompany, registerEmployee };
