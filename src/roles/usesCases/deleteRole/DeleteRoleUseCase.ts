import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";

type DeleteRoleDTO = {
   id: string;
};

export class DeleteRoleUseCase {
   constructor(private rolesRepository: RolesRepository) {}

   async execute({ id }: DeleteRoleDTO) {
      const role = await this.rolesRepository.findById(id);
      if (!role) {
         throw new AppError("Role not found or role", 404);
      }

      return this.rolesRepository.delete(role);
   }
}
