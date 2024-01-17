import { Request, Response } from "express";
import { CreateRoleUserCase } from "./CreateRoleUseCase";

export class CreateRoleController {
   //informar qual useCase vai usar
   constructor(private createRoleUseCase: CreateRoleUserCase) {}

   // metodo para criar usuario
   async handle(req: Request, res: Response): Promise<Response> {
      const { name } = req.body;

      const role = await this.createRoleUseCase.execute({ name });
      return res.status(200).json({ message: "Role created", role });
   }
}
