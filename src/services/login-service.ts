import userService from "./user-service";
import { IToken } from "../interfaces/IToken";
import { IUserModel } from "../interfaces/IUser";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import path from "path";

const pathToKey = path.join(__dirname, "../..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const TOKEN_EXPIRES = "1d";

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
const validPassword = (
  password: crypto.BinaryLike,
  hash: string,
  salt: crypto.BinaryLike
) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

const passwordIsValid = (password: string, user: IUserModel) => {
  return validPassword(password, user.hash, user.salt);
};

/**
 * @param {*} user - The user document object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
const issueJWT = (user: IUserModel) => {
  const _id = user._id;

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

const login = async (
  email: string,
  password: string,
  role: string
): Promise<IToken> => {
  const user = await userService.findUserByEmail(email);
  if (user.role !== role) throw new Error("Invalid role");

  if (passwordIsValid(password, user)) {
    return issueJWT(user);
  } else throw new Error("Wrong password");
};

export default { login };
