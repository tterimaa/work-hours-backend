import { IUser, IUserModel } from "../interfaces/IUser";
import User from "../models/User";
import crypto from "crypto";

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
const genPassword = (password: crypto.BinaryLike) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

const addUser = (user: IUser) => {
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

const findUserByEmail = async (companyEmail: string): Promise<IUserModel> => {
  const user = await User.findOne({ email: companyEmail });
  if (user) return user;
  else throw new Error("User was not found from db");
};

export default {
  addUser,
  findUserByEmail,
};
