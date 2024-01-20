import { Request, Response } from "express";
import { ShowRoleUseCase } from "./ShowRoleUseCase";
//UseCase

export class ShowRoleController {
   constructor(private ShowRoleUseCase: ShowRoleUseCase) {}

   async handle(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;
      const role = await this.ShowRoleUseCase.execute({ id });
      return res.status(200).json({ message: "Role:", role });
   }
}
