import { Request, Response } from "express";

import { DeleteRoleUseCase } from "./DeleteRoleUseCase";

export class DeleteRoleController {
   constructor(private DeleteRoleUseCase: DeleteRoleUseCase) {}

   async then(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;
      await this.DeleteRoleUseCase.execute({ id });
      return res.status(200).json({ message: "Role deleted" });
   }
}
