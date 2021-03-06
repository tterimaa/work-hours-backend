import accountService from "./account";
import { IToken } from "../interfaces/IToken";
import { IAccountModel } from "../interfaces/IAccount";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import path from "path";

const pathToKey = path.join(__dirname, "../..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const TOKEN_EXPIRES = "1d";

const passwordIsValid = (password: string, account: IAccountModel) => {
  return bcrypt.compare(password, account.hash);
};

const issueJWT = (account: IAccountModel) => {
  const _id = account._id;

  const expiresIn = TOKEN_EXPIRES;

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

const login = async (email: string, password: string): Promise<IToken> => {
  const account = await accountService.findAccountByEmail(email);

  if (await passwordIsValid(password, account)) {
    return issueJWT(account);
  } else throw new Error("Wrong password");
};

export default { login };
