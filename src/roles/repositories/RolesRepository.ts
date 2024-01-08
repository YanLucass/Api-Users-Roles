import { Role } from "@roles/entities/Role";

// Qual tipo de informação vamos receber por parametro para criar uma Role?
type CreateRoleDTO = {
   name: string;
};

export class RolesRepository {
   private roles: Role[];

   //definir role como array vazio assim que for instanciado
   constructor() {
      this.roles = [];
   }

   create({ name }: CreateRoleDTO) {
      const role = new Role();
      Object.assign(role, {
         name,
         created_at: new Date(),
      });

      this.roles.push(role);
      return role;
   }
}
