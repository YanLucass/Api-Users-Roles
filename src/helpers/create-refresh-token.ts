import jwtConfig from "@config/auth";
import { User } from "@users/entities/User";
import { sign } from "jsonwebtoken";

type refreshTokenReturn = {
   expires: Date;
   refreshToken: string;
};
export const createRefreshToken = (user: User): refreshTokenReturn => {
   //expires column
   const expires = new Date(Date.now() + Number(jwtConfig.refreshToken.duration));

   //create refresh token
   const refreshToken = sign({}, jwtConfig.refreshToken.secret, {
      subject: user.id,
      expiresIn: jwtConfig.refreshToken.expiresIn,
   });

   return {
      expires,
      refreshToken,
   };
};
