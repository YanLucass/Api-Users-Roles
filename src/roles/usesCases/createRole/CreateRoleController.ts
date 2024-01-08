import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { CreateRoleUserCase } from "./CreateRoleUseCase";

export class CreateRoleController {
   //informar qual useCase vai usar
   constructor(private createRoleUseCase: CreateRoleUserCase) {}

   // metodo para criar usuario
   handle(req: Request, res: Response): Response {
      const { name } = req.body;

      const role = this.createRoleUseCase.createRole({ name });
      return res.status(200).json({ message: "Role created", role });
   }
}
