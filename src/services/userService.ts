import { UserDTO } from "../types";
import User from "../models/User";
import { genPassword } from "../lib/utils";

const addUser = (user: UserDTO) => {
  const saltHash = genPassword(user.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: user.email,
    role: user.role,
    firstname: user.firstname,
    lastname: user.lastname,
    companies: user.companies,
    companyName: user.companyName,
    employees: user.employees,
    hash: hash,
    salt: salt,
  });

  return newUser.save();
};

const findUserByEmail = async (companyEmail: string) => {
  const user = await User.findOne({ email: companyEmail });
  if (user) return user;
  else throw new Error("Company was not found from db");
};

export default {
  addUser,
  findUserByEmail
};
