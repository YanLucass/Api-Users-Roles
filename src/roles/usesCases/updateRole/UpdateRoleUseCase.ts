import { Role } from "@roles/entities/Role";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

//dto para metodo de atualizar role;
type UpdateRoleDTO = {
   id: string;
   name: string;
};

@injectable()
export class UpdateRoleUseCase {
   constructor(@inject("RolesRepository") private rolesRepository: IRolesRepository) {}

   async execute({ id, name }: UpdateRoleDTO): Promise<Role> {
      const role = await this.rolesRepository.findById(id);

      if (!name) {
         throw new AppError("name role is required", 422);
      }

      if (!role) {
         throw new AppError("Role not found", 404);
      }

      //verificar se o nome da role ja existe ou se é diferente do propio nome
      const roleWithSameName = await this.rolesRepository.findByName(name);
      console.log(roleWithSameName);

      if (roleWithSameName && role.name !== roleWithSameName.name) {
         throw new AppError("Role already in use");
      }

      role.name = name;
      return this.rolesRepository.save(role);
   }
}
