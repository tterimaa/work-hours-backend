import { IAccountModel } from "../interfaces/IAccount";
import Account from "../models/Account";

const findAccountByEmail = async (email: string): Promise<IAccountModel> => {
  const account = await Account.findOne({ email: email }).orFail();
  return account;
};

export default {
  findAccountByEmail,
};
