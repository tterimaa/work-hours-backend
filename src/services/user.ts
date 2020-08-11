import { IUserModel } from "../interfaces/IUser";
import User from "../models/User";

const findUserByEmail = async (companyEmail: string): Promise<IUserModel> => {
  const user = await User.findOne({ email: companyEmail });
  if (user) return user;
  else throw new Error("User was not found from db");
};

export default {
  findUserByEmail,
};
