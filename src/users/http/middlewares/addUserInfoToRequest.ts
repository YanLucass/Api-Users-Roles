import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";

// Defines the expected type for the properties of the JWT payload
type jwtPayloadProps = {
   sub: string;
};

// Middleware to add user information to the request based on the JWT token
export const addUserInfoToRequest = (req: Request, res: Response, next: NextFunction) => {
   // Check if the authorization header is not present
   const authHeader = req.headers.authorization;
   if (!authHeader) {
      return res.status(401).json({
         error: true,
         code: "token.invalid",
         message: "Access token not present",
      });
   }

   // Extract the token from the header
   const token = authHeader.replace("Bearer ", "");

   // Check if the token is not present
   if (!token) {
      return res.status(401).json({
         error: true,
         code: "token.invalid",
         message: "Access token not present",
      });
   }

   try {
      // Decode the token to obtain its payload
      const decodedToken = decode(token);

      // Extract the 'sub' property from the token payload
      const { sub } = decodedToken as jwtPayloadProps;

      // Add the user information to the request object
      req.user = { id: sub };

      // Call the next middleware in the chain
      return next();
   } catch (error) {
      // Handle the case where the token is invalid or decoding encounters an error
      return res.status(401).json({
         error: true,
         code: "token.invalid",
         message: "Invalid access token",
      });
   }
};
