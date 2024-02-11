import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
//class transformer
import { instanceToInstance } from "class-transformer";

export class CreateUserController {
   async handle(req: Request, res: Response): Promise<Response> {
      //get createUserUseCase instance
      const createUserUseCase = container.resolve(CreateUserUseCase);
      const { name, email, password, isAdmin, roleId } = req.body;
      //create user
      const user = await createUserUseCase.execute({ name, email, password, isAdmin, roleId });

      return res.status(201).json({
         message: "User created",
         user: instanceToInstance(user),
      });
   }
}
