//repository
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";

//visto que é so para leitura de dados usaremos params
type ShowRoleParams = {
   id: string;
};

export class ShowRoleUseCase {
   constructor(private rolesRepository: RolesRepository) {}

   async execute({ id }: ShowRoleParams) {
      const role = await this.rolesRepository.findById(id);
      if (!role) {
         throw new AppError("Role not found", 404);
      }
      return role;
   }
}
