import { container } from "tsyringe";
import { CreateLoginUseCase } from "./CreateLoginUseCase";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

export class CreateLoginController {
   async handle(req: Request, res: Response): Promise<Response> {
      const createLoginUseCase = container.resolve(CreateLoginUseCase);
      const { email, password } = req.body;
      //get user and token from service
      const { user, token } = await createLoginUseCase.execute({ email, password });
      console.log(user, token);
      return res.status(201).json(
         instanceToInstance({
            user,
            token,
         }),
      );
   }
}
