import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

//DTO to delete a role
type DeleteRoleDTO = {
   id: string;
};

@injectable()
export class DeleteRoleUseCase {
   constructor(@inject("RolesRepository") private rolesRepository: IRolesRepository) {}

   async execute({ id }: DeleteRoleDTO) {
      const role = await this.rolesRepository.findById(id);
      if (!role) {
         throw new AppError("Role not found or role", 404);
      }

      return this.rolesRepository.delete(role);
   }
}
