import { CompanyUserInputDTO, EmployeeUserInputDTO, IUser } from "../types";
import Company from "../models/Company";
import Employee from "../models/Employee";
import { genPassword, validPassword } from "../lib/utils";

const addCompany = (user: CompanyUserInputDTO) => {
  const saltHash = genPassword(user.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newCompany = new Company({
    email: user.email,
    hash: hash,
    salt: salt,
  });

  return newCompany.save();
};

const addEmployee = (user: EmployeeUserInputDTO) => {
    const saltHash = genPassword(user.password);
  
    const salt = saltHash.salt;
    const hash = saltHash.hash;
  
    const newEmployee = new Employee({
      email: user.email,
      hash: hash,
      salt: salt,
    });
  
    return newEmployee.save();
  };

const findCompanyByEmail = (companyEmail: string) => {
  return Company.findOne({ email: companyEmail }).then((company) => {
    if (!company) throw new Error("Company was not found from db");
    else return company;
  });
};

const findEmployeeByEmail = (employeeEmail: string) => {
    return Employee.findOne({ email: employeeEmail }).then((user) => {
      if (!user) throw new Error("Company was not found from db");
      else return user;
    });
  };

const passwordIsValid = (password: string, user: IUser) => {
  return validPassword(password, user.hash, user.salt);
};

export default { addCompany, addEmployee, findCompanyByEmail, findEmployeeByEmail, passwordIsValid };
