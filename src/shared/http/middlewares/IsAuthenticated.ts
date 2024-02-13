import { AppError } from "@shared/errors/AppError";
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
      throw new AppError("Failed to verify acess token");
   }

   const token = authHeader.replace("Bearer ", ""); //remove bearer of token

   //Decoded token to check if is valid.
   try {
      //it will decode the token, if it cannot, it is because the token invalid.
      const decodedToken = verify(token, jwtConfig.jwt.secret as Secret);
      const { sub } = decodedToken as JwtPayload;
      req.user = { id: sub };
      //valid token, next.
      return next();
   } catch (error) {
      throw new AppError("Invalid authentication token", 401);
   }
};
