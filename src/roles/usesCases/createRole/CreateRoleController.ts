import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRoleUserCase } from "./CreateRoleUseCase";

export class CreateRoleController {
   // metodo para criar usuario
   async handle(req: Request, res: Response): Promise<Response> {
      const createRoleUseCase = container.resolve(CreateRoleUserCase);
      const { name } = req.body;

      const role = await createRoleUseCase.execute({ name });
      return res.status(200).json({ message: "Role created", role });
   }
}
