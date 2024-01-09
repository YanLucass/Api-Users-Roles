import { Role } from "@roles/entities/Role";
import { RolesRepository } from "@roles/repositories/RolesRepository";

export class ListRolesUseCase {
   constructor(private rolesRepository: RolesRepository) {}

   getAllRoles(): Role[] {
      return this.rolesRepository.findAll();
   }
}
