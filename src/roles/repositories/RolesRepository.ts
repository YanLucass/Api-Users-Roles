import { Role } from "@roles/entities/Role";

// Qual tipo de informação vamos receber por parametro para criar uma Role?
type CreateRoleDTO = {
   name: string;
};

export class RolesRepository {
   private roles: Role[];

   // Para o pattern Singleton
   private static INSTANCE: RolesRepository;

   //definir role como array vazio assim que for instanciado
   private constructor() {
      this.roles = [];
   }

   //metodo para criar primeira instancia e garantir que seja unica
   public static getInstance(): RolesRepository {
      if (!this.INSTANCE) {
         this.INSTANCE = new RolesRepository();
      }
      return this.INSTANCE;
   }
   //metodo para "mandar" a role pro BD, no caso é um array.
   create({ name }: CreateRoleDTO): Role {
      const role = new Role();
      Object.assign(role, {
         name,
         created_at: new Date(),
      });

      this.roles.push(role);
      return role;
   }

   //metodo para retornar as roles
   findAll(): Role[] {
      return this.roles;
   }

   findByName(nameRole: string): Role | undefined {
      return this.roles.find(role => role.name === nameRole);
   }
}
