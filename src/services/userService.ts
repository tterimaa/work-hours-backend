import { CompanyUserDTO, EmployeeUserDTO } from "../types";
import Company from "../models/Company";
import Employee from "../models/Employee";
import { genPassword } from "../lib/utils";

const addCompany = (user: CompanyUserDTO) => {
  const saltHash = genPassword(user.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newCompany = new Company({
    email: user.email,
    role: user.role,
    companyName: user.companyName,
    hash: hash,
    salt: salt,
  });

  return newCompany.save();
};

const addEmployee = (user: EmployeeUserDTO) => {
  const saltHash = genPassword(user.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newEmployee = new Employee({
    email: user.email,
    role: user.role,
    firstname: user.firstname,
    lastname: user.lastname,
    hash: hash,
    salt: salt,
  });

  return newEmployee.save();
};

const findCompanyByEmail = async (companyEmail: string) => {
  const company = await Company.findOne({ email: companyEmail });
  if (company) return company;
  else throw new Error("Company was not found from db");
};

const findEmployeeByEmail = (employeeEmail: string) => {
  return Employee.findOne({ email: employeeEmail }).then((user) => {
    if (!user) throw new Error("Employee was not found from db");
    else return user;
  });
};

export default {
  addCompany,
  addEmployee,
  findCompanyByEmail,
  findEmployeeByEmail,
};
