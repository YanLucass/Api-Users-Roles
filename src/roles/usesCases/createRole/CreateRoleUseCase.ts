// Definir quais prorpiedades a aplicação frontend pode mandar

import { Role } from "@roles/entities/Role";
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";

type CreateRoleDTO = {
   name: string;
};

export class CreateRoleUserCase {
   // criar uma instancia do repository assim que instaciar createRoleUserCase
   constructor(private rolesRepository: RolesRepository) {}

   //metodo para criar uma role.
   async execute({ name }: CreateRoleDTO): Promise<Role> {
      //verificar se a role já existe
      const roleAlreadyExists = await this.rolesRepository.findByName(name);
      if (roleAlreadyExists) {
         throw new AppError("Role already exists");
      }

      return this.rolesRepository.create({ name });
   }
}
