import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";
import { instanceToInstance } from "class-transformer";

export class UpdateAvatarController {
   async handle(req: Request, res: Response): Promise<Response> {
      const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

      const user = await updateAvatarUseCase.execute({
         userId: req.user.id, // We performed an override in Express to have access to the user object
         avatarFileName: req.file.filename, // Comes from the file object, and we retrieve the filename
      });

      return res.json(instanceToInstance(user));
   }
}
