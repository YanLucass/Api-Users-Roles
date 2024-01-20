//usecase
import { Request, Response } from "express";
import { UpdateRoleUseCase } from "./UpdateRoleUseCase";

export class UpdateRoleController {
   constructor(private updateRoleUseCase: UpdateRoleUseCase) {}

   async handle(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;
      const name = req.body.name;
      const updateRole = await this.updateRoleUseCase.execute({ id, name });
      return res.status(200).json({ message: "Role atualizada:", updateRole });
   }
}
