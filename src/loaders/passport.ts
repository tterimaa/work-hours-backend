import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import fs from "fs";
import path from "path";
import { PassportStatic } from "passport";
import Account from "../models/Account";

const pathToKey = path.join(__dirname, "../..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

export default (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, function (jwtPayload, done) {
      Account.findOne({ _id: jwtPayload.sub }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
