import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
   async handle(req: Request, res: Response): Promise<Response> {
      //get createUserUseCase instance
      const createUserUseCase = container.resolve(CreateUserUseCase);
      const { name, email, password, isAdmin, roleId } = req.body;
      //create user
      const user = await createUserUseCase.execute({ name, email, password, isAdmin, roleId });

      return res.status(201).json({ message: "new user created", user });
   }
}
