import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserProfileUseCase } from "./UpdateUserProfileUseCase";
import { instanceToInstance } from "class-transformer";

export class UpdateUserProfileController {
   async handle(req: Request, res: Response): Promise<Response> {
      const updateUserProfile = container.resolve(UpdateUserProfileUseCase);
      const { name, email, password, oldPassword } = req.body;
      const user = await updateUserProfile.execute({
         userId: req.user.id, // We performed an override in Express to have access to the user object
         name,
         email,
         password,
         oldPassword,
      });

      return res.json(instanceToInstance(user));
   }
}
