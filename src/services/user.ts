import { IUserModel } from "../interfaces/IUser";
import User from "../models/User";

const findUserByEmail = async (companyEmail: string): Promise<IUserModel> => {
  const user = await User.findOne({ email: companyEmail }).orFail();
  return user;
};

export default {
  findUserByEmail,
};
