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
      if (!user) throw new Error("Employee was not found from db");
      else return user;
    });
  };

export default { addCompany, addEmployee, findCompanyByEmail, findEmployeeByEmail };
