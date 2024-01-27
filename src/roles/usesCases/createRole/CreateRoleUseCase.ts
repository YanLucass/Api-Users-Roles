// Definir quais prorpiedades a aplicação frontend pode mandar

import { Role } from "@roles/entities/Role";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

type CreateRoleDTO = {
   name: string;
};

@injectable()
export class CreateRoleUserCase {
   // Recebe o a instancia do repositorio pela injeção.
   constructor(@inject("RolesRepository") private rolesRepository: IRolesRepository) {}

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
