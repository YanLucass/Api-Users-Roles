import { container } from "tsyringe";
import { Request, Response } from "express";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
//class transformer
import { instanceToInstance } from "class-transformer";

export class ShowUserProfileController {
   async handle(req: Request, res: Response): Promise<Response> {
      const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);
      const userId = req.user.id;
      //create user
      const user = await showUserProfileUseCase.execute({ userId });
      return res.status(200).json({
         message: "User:",
         user: instanceToInstance(user),
      });
   }
}
