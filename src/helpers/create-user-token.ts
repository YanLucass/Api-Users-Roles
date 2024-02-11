import { sign } from "jsonwebtoken";
import jwtConfig from "@config/auth";
import { User } from "@users/entities/User";
//create token middleware
export const createToken = (user: User): string => {
   const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id, //who created and use
      expiresIn: jwtConfig.jwt.expiresIn,
   });

   return token;
};
