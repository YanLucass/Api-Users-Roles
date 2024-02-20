import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import jwtConfig from "@config/auth";

type JwtPayload = {
   sub: string;
};

export const IsAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
   //check if req authorization contains token
   const authHeader = req.headers.authorization;
   if (!authHeader) {
      return res.status(401).json({
         error: true,
         code: "token.invalid",
         message: "Access token not present",
      });
   }

   const token = authHeader.replace("Bearer ", ""); //remove bearer of token

   // Check if the token is not present
   if (!token) {
      return res.status(401).json({
         error: true,
         code: "token.invalid",
         message: "Access token not present",
      });
   }

   //Decoded token to check if is valid.
   try {
      //it will decode the token, if it cannot, it is because the token invalid /expired.
      const decodedToken = verify(token, jwtConfig.jwt.secret as Secret);
      const { sub } = decodedToken as JwtPayload;
      req.user = { id: sub };
      //valid token, next.
      return next();
   } catch (error) {
      return res.status(401).json({
         error: true,
         code: "token.expired", //used by the frontend to request new token
         message: "Access token not present",
      });
   }
};
