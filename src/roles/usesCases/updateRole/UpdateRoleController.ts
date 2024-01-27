//usecase
import { Request, Response } from "express";
import { UpdateRoleUseCase } from "./UpdateRoleUseCase";
import { container } from "tsyringe";

export class UpdateRoleController {
   async handle(req: Request, res: Response): Promise<Response> {
      const updateRoleUseCase = container.resolve(UpdateRoleUseCase);
      const { id } = req.params;
      const name = req.body.name;
      const updateRole = await updateRoleUseCase.execute({ id, name });
      return res.status(200).json({ message: "Role atualizada:", updateRole });
   }
}
