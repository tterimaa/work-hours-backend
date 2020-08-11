import { IUser } from "../interfaces/IUser";
import User from "../models/User";
import bcrypt from "bcrypt";

const saltRounds = 12;

const genPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

const registerUser = async (user: IUser) => {
  const hash = await genPassword(user.password);

  const newUser = new User({
    email: user.email,
    role: user.role,
    firstname: user.firstname,
    lastname: user.lastname,
    companies: user.companies,
    companyName: user.companyName,
    employees: user.employees,
    hash: hash,
  });

  return newUser.save();
};

export default { registerUser };
