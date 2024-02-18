import { container } from "tsyringe";
import { CreateLoginUseCase } from "./CreateLoginUseCase";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

export class CreateLoginController {
   async handle(req: Request, res: Response): Promise<Response> {
      const createLoginUseCase = container.resolve(CreateLoginUseCase);
      const { email, password } = req.body;
      //get user and token from service
      const { user, accessToken, refreshToken } = await createLoginUseCase.execute({
         email,
         password,
      });
      return res.status(200).json(
         instanceToInstance({
            user, //to remove password
            accessToken, //included in response because there is no @Exclude
            refreshToken,
         }),
      );
   }
}
