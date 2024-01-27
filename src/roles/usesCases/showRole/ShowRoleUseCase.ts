//repository
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

//visto que é so para leitura de dados usaremos params
type ShowRoleParams = {
   id: string;
};

@injectable()
export class ShowRoleUseCase {
   constructor(@inject("RolesRepository") private rolesRepository: IRolesRepository) {}

   async execute({ id }: ShowRoleParams) {
      const role = await this.rolesRepository.findById(id);
      if (!role) {
         throw new AppError("Role not found", 404);
      }
      return role;
   }
}
