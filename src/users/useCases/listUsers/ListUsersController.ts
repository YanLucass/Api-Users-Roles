import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
   async handle(req: Request, res: Response): Promise<Response> {
      //inject useCase
      const listUsersUseCase = container.resolve(ListUsersUseCase);

      const page = req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1;
      const limit = req.query.limit && Number(req.query.limit) > 0 ? Number(req.query.limit) : 3;

      const users = await listUsersUseCase.execute({ page, limit });
      return res.status(200).json(users);
   }
}
