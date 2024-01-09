import { Request, Response } from "express";
import { ListRolesUseCase } from "./ListRolesUseCase";

export class ListRolesController {
   constructor(private listRolesUseCase: ListRolesUseCase) {}

   handle(req: Request, res: Response): Response {
      const roles = this.listRolesUseCase.getAllRoles();
      return res.json({ roles });
   }
}
