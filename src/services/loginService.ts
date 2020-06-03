import userService from "./userService";
import { issueJWT } from "../lib/utils";
import { IToken } from "../types";
import { validPassword } from "../lib/utils";
import { IUser } from "../types";

const passwordIsValid = (password: string, user: IUser) => {
  return validPassword(password, user.hash, user.salt);
};

const login = async (
  email: string,
  password: string,
  role: string
): Promise<IToken> => {
  const user = await userService.findUserByEmail(email);
  if (user.role !== role)
    throw new Error("Invalid role");

  if (passwordIsValid(password, user)) {
    return issueJWT(user);
  } else throw new Error("Wrong password");
};

export default { login };
