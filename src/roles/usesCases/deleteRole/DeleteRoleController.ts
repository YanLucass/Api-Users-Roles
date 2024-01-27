import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";

export class DeleteRoleController {
   async handle(req: Request, res: Response): Promise<Response> {
      const deleteRoleUseCase = container.resolve(DeleteRoleUseCase);

      const { id } = req.params;
      await deleteRoleUseCase.execute({ id });
      return res.status(200).json({ message: "Role deleted" });
   }
}
