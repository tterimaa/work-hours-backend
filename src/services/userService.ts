import { NewCompanyUser, UserIF } from "../types";
import User from "../models/User";
import { genPassword, validPassword } from "../lib/utils";

const addCompanyUser = (user: NewCompanyUser) => {
  const saltHash = genPassword(user.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: user.email,
    hash: hash,
    salt: salt,
  });

  return newUser.save();
};

const findUserByEmail = (email: string) => {
  return User.findOne({ email: email }).then((user) => {
    if (!user) throw new Error("User was not found from db");
    else return user;
  });
};

const passwordIsValid = (password: string, user: UserIF) => {
  return validPassword(password, user.hash, user.salt);
};

export default { addCompanyUser, findUserByEmail, passwordIsValid };
