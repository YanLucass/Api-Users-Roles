import { Request, Response } from "express";
import { CreateRoleUserCase } from "./CreateRoleUseCase";

export class CreateRoleController {
   //informar qual useCase vai usar
   constructor(private createRoleUseCase: CreateRoleUserCase) {}

   // metodo para criar usuario
   handle(req: Request, res: Response): Response {
      const { name } = req.body;

      const role = this.createRoleUseCase.execute({ namee });
      return res.status(200).json({ message: "Role created", role });
   }
}
